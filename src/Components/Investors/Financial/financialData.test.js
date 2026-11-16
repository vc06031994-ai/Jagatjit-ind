import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categoryKey, getDocumentDate, getFinancialCategories, loadFinancialReports, mapFinancialEntry } from './financialData.js';
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


test('document dates display in readable day-month-year format', () => {
  assert.deepEqual(getDocumentDate('2025-06-30'), { dateTime: '2025-06-30', label: '30 Jun 2025' });
  assert.deepEqual(getDocumentDate('2024-02-29'), { dateTime: '2024-02-29', label: '29 Feb 2024' });
});

test('timestamps keep the authored date across timezone boundaries', () => {
  assert.equal(getDocumentDate('2025-06-30T23:30:00-05:00').dateTime, '2025-06-30');
  assert.equal(getDocumentDate('2025-07-01T00:30:00+05:30').label, '01 Jul 2025');
});

test('missing, ambiguous or impossible dates are not guessed', () => {
  for (const value of [null, undefined, '', 'not a date', '30/06/2025', '2025-02-29', '2025-02-30', '2025-13-01']) {
    assert.equal(getDocumentDate(value), null);
  }
});

test('document date remains distinct from reporting quarter and creation date', () => {
  const mapped = mapFinancialEntry({
    sys: { id: 'quarterly-report', createdAt: '2025-09-01T00:00:00Z' },
    fields: { fileName: 'Quarterly Results - June 2025', categoryName: 'Quarterly Results', fileDate: '2025-08-10' },
  });
  const groups = groupFinancialReports([mapped]);
  assert.equal(groups.quarterly[0].year, '2025-26');
  assert.equal(groups.quarterly[0].quarters[0][0].id, 'quarterly-report');
  assert.equal(getDocumentDate(mapped.file_date).label, '10 Aug 2025');
  assert.equal(getDocumentDate(mapFinancialEntry({ sys: { createdAt: '2025-09-01' }, fields: {} }).file_date), null);
});
