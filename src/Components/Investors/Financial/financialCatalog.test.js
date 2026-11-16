import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildFinancialCatalog, getCategoryStyle, getReportCategories, resolveFinancialView } from './financialCatalog.js';

const report = (id, file_name, categories = ['Annual Report']) => ({ id, file_name, categories });

test('the default view is an investor directory, not a long list of reports', () => {
  const reports = [report('annual', 'Annual Report 2024-25')];
  const catalog = buildFinancialCatalog(reports);
  assert.equal(resolveFinancialView(catalog, reports).type, 'directory');
  assert.deepEqual(resolveFinancialView(catalog, reports).reports, []);
  assert.equal(catalog[0].reports[0].id, 'annual');
});

test('annual reports and MGT-7/MGT-9 have separate cards without editing source records', () => {
  const reports = [report('annual', 'Annual Report 2024-25'), report('mgt7', 'Form MGT 7 (2025)'), report('mgt9', 'MGT 9 (2022)')];
  const catalog = buildFinancialCatalog(reports);
  assert.deepEqual(catalog.map((item) => item.label).sort(), ['Annual Report', 'MGT-7', 'MGT-9']);
  assert.deepEqual(catalog.find((item) => item.key === 'annual report').reports.map((item) => item.id), ['annual']);
  assert.equal(resolveFinancialView(catalog, reports, { category: 'mgt-7' }).reports[0].id, 'mgt7');
  assert.deepEqual(reports[1].categories, ['Annual Report']);
});

test('new, uncategorised and multiple-category records remain accessible', () => {
  const reports = [report('new', 'New filing', ['New CMS Category']), report('none', 'Unassigned filing', []), report('multi', 'Policy', ['Policies', 'Investor Charter'])];
  const catalog = buildFinancialCatalog(reports);
  assert.ok(catalog.some((item) => item.label === 'New CMS Category' && item.icon === 'documents'));
  assert.ok(catalog.some((item) => item.label === 'Other Documents'));
  assert.deepEqual(new Set(catalog.flatMap((item) => item.reports.map((item) => item.id))), new Set(reports.map((item) => item.id)));
  assert.equal(resolveFinancialView(catalog, reports, { all: true }).reports.length, 3);
});

test('duplicate labels and overlapping MGT labels do not duplicate records inside a card', () => {
  const catalog = buildFinancialCatalog([
    report('filing', 'MGT-7A for 2025', ['Annual Report', 'MGT 7A']),
    report('policy', 'Policy', ['Policies', ' policies ']),
  ]);
  assert.deepEqual(getReportCategories(report('filing', 'MGT-7A for 2025')), ['MGT-7A']);
  assert.equal(catalog.find((item) => item.key === 'mgt-7a').reports.length, 1);
  assert.equal(catalog.find((item) => item.key === 'policies').reports.length, 1);
});

test('category links resolve after refresh and unknown links never silently show all reports', () => {
  const reports = [report('annual', 'Annual Report 2024-25')];
  const catalog = buildFinancialCatalog(reports);
  assert.equal(resolveFinancialView(catalog, reports, { category: ' ANNUAL   REPORT ' }).reports.length, 1);
  assert.equal(resolveFinancialView(catalog, reports, { category: 'does-not-exist' }).type, 'not-found');
  assert.equal(resolveFinancialView(catalog, reports, { category: 'does-not-exist', all: true }).reports.length, 0);
  assert.equal(getCategoryStyle('A future category').icon, 'documents');
});
