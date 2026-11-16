import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categoryKey, getFinancialCategories, loadFinancialReports, mapFinancialEntry } from './financialData.js';
import { groupFinancialReports } from './financialPeriods.js';

const entry = (index) => ({ sys: { id: `id-${index}`, createdAt: '2025-09-01' }, fields: { fileName: `Document ${index}`, categoryName: 'Annual Report' } });

test('every page is loaded in a stable order; all 253 entries survive grouping', async () => {
  const source = Array.from({ length: 253 }, (_, index) => entry(index));
  const requests = [];
  const reports = await loadFinancialReports(async (query) => {
    requests.push(query);
    return { total: source.length, items: source.slice(query.skip, query.skip + query.limit) };
  });
  assert.deepEqual(requests.map((query) => query.skip), [0, 100, 200]);
  assert.ok(requests.every((query) => query.order === 'sys.createdAt,sys.id'));
  const grouped = Object.values(groupFinancialReports(reports)).flat().flatMap((group) => group.items);
  assert.equal(grouped.length, 253);
  assert.equal(new Set(grouped.map((report) => report.id)).size, 253);
});

test('a failure on a later page does not resolve with incomplete data', async () => {
  await assert.rejects(loadFinancialReports(async ({ skip }) => {
    if (skip) throw new Error('Network error');
    return { total: 150, items: Array.from({ length: 100 }, (_, index) => entry(index)) };
  }), /Network error/);
});

test('empty pages, overlapping pages and changing totals fail safely', async () => {
  await assert.rejects(loadFinancialReports(async () => ({ total: 1, items: [] })), /incomplete/);
  await assert.rejects(loadFinancialReports(async () => ({ total: 2, items: [entry(1)] })), /Overlapping/);
  await assert.rejects(loadFinancialReports(async ({ skip }) => ({ total: skip ? 3 : 2, items: [entry(skip)] })), /changed/);
});

test('empty archives are valid', async () => {
  assert.deepEqual(await loadFinancialReports(async () => ({ total: 0, items: [] })), []);
});

test('categories normalise whitespace/case; multiple categories and uncategorised entries remain accessible', () => {
  const reports = [
    mapFinancialEntry(entry(0)),
    mapFinancialEntry({ fields: { categoryName: ' annual   report ' } }),
    mapFinancialEntry({ fields: { categoryName: ['Policies', 'Annual Report'] } }),
    mapFinancialEntry({ fields: {} }),
  ];
  assert.equal(getFinancialCategories(reports).length, 3);
  assert.equal(reports.filter((report) => report.categories.some((category) => categoryKey(category) === 'annual report')).length, 3);
  assert.deepEqual(reports.at(-1).categories, ['Uncategorised']);
});

test('asset, direct and HTML-only documents are preserved, including missing files', () => {
  assert.equal(mapFinancialEntry({ fields: { fileUrl: { fields: { file: { url: '//assets.ctfassets.net/report.pdf' } } } } }).file_url, 'https://assets.ctfassets.net/report.pdf');
  assert.equal(mapFinancialEntry({ fields: { fileUrl: 'https://example.org/report.pdf' } }).file_url, 'https://example.org/report.pdf');
  assert.equal(mapFinancialEntry({ fields: { htmlfield: '<h1>Notice</h1>' } }).html_content, '<h1>Notice</h1>');
  assert.equal(mapFinancialEntry({ fields: { htmlfield: { content: [{ nodeType: 'text', value: '<p>Notice</p>' }] } } }).html_content, '<p>Notice</p>');
  assert.equal(mapFinancialEntry({ fields: {} }).file_url, null);
});
