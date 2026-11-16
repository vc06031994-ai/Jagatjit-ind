import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getReportPeriod, groupFinancialReports } from './financialPeriods.js';

const report = (file_name, extra = {}) => ({ file_name, category_name: 'Quarterly Results', ...extra });

test('Indian fiscal quarters use reporting period, not publication date', () => {
  for (const [month, quarter] of [['June', 1], ['September', 2], ['December', 3]]) {
    assert.deepEqual(getReportPeriod(report(`Results - ${month} 2024`, { file_date: '2026-09-04' })), { year: '2024-25', sortYear: 2024, quarter });
  }
  assert.deepEqual(getReportPeriod(report('Results - March 2025')), { year: '2024-25', sortYear: 2024, quarter: 4 });
});

test('explicit quarter and financial year are supported', () => {
  assert.equal(getReportPeriod(report('Financial Results Q4 FY 2024-25')).quarter, 4);
  assert.equal(getReportPeriod(report('Financial Results Q1 2025-2026')).year, '2025-26');
  assert.equal(getReportPeriod(report('Corporate Governance 30.06.2024')).quarter, 1);
});

test('annual reports and MGT filings are not forced into quarterly cells', () => {
  assert.deepEqual(getReportPeriod(report('Annual Report 2024-25', { category_name: 'Annual Reports', file_date: '2025-09-01' })), { year: '2024-25', sortYear: 2024, quarter: null });
  assert.equal(getReportPeriod(report('Form MGT 7 (2025)', { category_name: 'Annual Reports' })).quarter, null);
});

test('missing and ambiguous periods remain visible without guessing a quarter', () => {
  assert.equal(getReportPeriod(report('Quarterly Results', { file_date: '2025-07-10' })).quarter, null);
  assert.equal(getReportPeriod(report('Quarterly Results')).year, 'Other');
  assert.equal(getReportPeriod(report('Q2 results')).quarter, null);
});

test('grouping preserves multiple reports, empty quarters, and newest-first order', () => {
  const reports = [report('Results - June 2024'), report('Revised Results - June 2024'), report('Results - March 2026'), report('Annual Report 2024-25', { category_name: 'Annual Reports' }), report('Undated')];
  const groups = groupFinancialReports(reports);
  assert.equal(groups.quarterly[0].year, '2025-26');
  assert.equal(groups.quarterly[1].quarters[0].length, 2);
  assert.equal(groups.quarterly[1].quarters[1].length, 0);
  assert.equal(groups.documents.at(-1).year, 'Other');
  assert.equal(Object.values(groups).flat().reduce((count, group) => count + group.items.length, 0), reports.length);
});


test('annual reports and MGT returns are separated without changing source categories', () => {
  const reports = [
    report('Annual Report 2025-26', { category_name: 'Annual Report' }),
    report('Form MGT 7 (2025)', { category_name: 'Annual Report' }),
    report('Annual Report 2024-25', { category_name: 'Annual Report' }),
    report('MGT 9 (2022)', { category_name: 'Annual Report' }),
  ];
  const groups = groupFinancialReports(reports);
  assert.deepEqual(groups.annual.map((group) => group.year), ['2025-26', '2024-25']);
  assert.deepEqual(groups.filings.map((group) => group.year), ['2025', '2022']);
  assert.equal(Object.values(groups).flat().reduce((count, group) => count + group.items.length, 0), reports.length);
});

test('calendar and financial periods sort by end year with FY first on ties', () => {
  const groups = groupFinancialReports([
    report('Notice 2022', { category_name: 'Notices' }),
    report('Notice 2022-23', { category_name: 'Notices' }),
    report('Notice 2023', { category_name: 'Notices' }),
    report('Notice 2021-22', { category_name: 'Notices' }),
  ]);
  assert.deepEqual(groups.documents.map((group) => group.year), ['2022-23', '2023', '2021-22', '2022']);
});

test('numeric dates, ISO dates, named dates, ordinals and FY descriptions work', () => {
  for (const name of ['Results - 31.03.2025', 'Results - 2025-03-31', 'Results - 31st March 2025', 'Results - March 31, 2025']) {
    assert.equal(getReportPeriod(report(name)).year, '2024-25');
    assert.equal(getReportPeriod(report(name)).quarter, 4);
  }
  assert.equal(getReportPeriod(report('First Quarter Results FY 2024-25')).quarter, 1);
  assert.equal(getReportPeriod(report('Q2 Results', { file_description: 'FY 2024-25' })).year, '2024-25');
});

test('conflicting quarters stay visible in other documents, not a wrong cell', () => {
  const groups = groupFinancialReports([report('Q1 Results December 2024')]);
  assert.equal(groups.quarterly.length, 0);
  assert.equal(groups.documents[0].items.length, 1);
});
