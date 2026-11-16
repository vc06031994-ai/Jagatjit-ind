// Indian financial year: April–March. Publication/upload dates are never
// used to infer a reporting quarter. Ambiguous documents stay in the archive.
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const YEAR = '(?:19|20)\\d{2}';
const fiscalLabel = (year) => `${year}-${String(year + 1).slice(-2)}`;

function fiscalYear(text) {
  const matches = text.matchAll(new RegExp(`\\b(${YEAR})\\s*[-–—/]\\s*(${YEAR}|\\d{2})\\b`, 'g'));
  for (const match of matches) {
    if (Number(match[2].slice(-2)) === (Number(match[1]) + 1) % 100) return Number(match[1]);
  }
  return null;
}

function reportingDate(text) {
  const named = text.match(/\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?[\s,/-]+(?:\d{1,2}(?:st|nd|rd|th)?[\s,/-]+)?((?:19|20)\d{2})\b/i);
  if (named) return { month: MONTHS.indexOf(named[1].slice(0, 3).toLowerCase()), year: Number(named[2]) };
  const numeric = text.match(/\b(0?[1-9]|[12]\d|3[01])[./-](0?[1-9]|1[0-2])[./-]((?:19|20)\d{2})\b/);
  const iso = text.match(/\b((?:19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/);
  if (!numeric && !iso) return null;
  const year = Number(numeric ? numeric[3] : iso[1]);
  const month = Number(numeric ? numeric[2] : iso[2]) - 1;
  const day = Number(numeric ? numeric[1] : iso[3]);
  const date = new Date(Date.UTC(year, month, day));
  return date.getUTCMonth() === month && date.getUTCDate() === day ? { month, year } : null;
}

function explicitQuarter(text) {
  const match = text.match(/\bQ\s*([1-4])\b/i) || text.match(/\bquarter\s*[-:]?\s*([1-4])\b/i);
  if (match) return Number(match[1]);
  const ordinal = text.match(/\b(first|second|third|fourth|1st|2nd|3rd|4th)\s+quarter\b/i);
  if (!ordinal) return null;
  return { first: 1, second: 2, third: 3, fourth: 4, '1st': 1, '2nd': 2, '3rd': 3, '4th': 4 }[ordinal[1].toLowerCase()];
}

export function getReportKind(report) {
  const title = report.file_name || '';
  if (/\bMGT[\s-]*\d*[a-z]?\b/i.test(title) || /annual\s+returns?/i.test(`${title} ${report.category_name || ''}`)) return 'filings';
  if (/annual\s+reports?/i.test(title)) return 'annual';
  if (/quarter|financial results|share\s*holding|governance/i.test(`${title} ${report.category_name || ''}`) || explicitQuarter(title)) return 'quarterly';
  if (/annual\s+reports?/i.test(report.category_name || '')) return 'annual';
  return 'documents';
}

export function getReportPeriod(report) {
  const title = report.file_name || '';
  const description = report.file_description || '';
  const kind = getReportKind(report);
  const fiscal = fiscalYear(title) ?? (/\b(?:FY|financial year)\b/i.test(description) ? fiscalYear(description) : null);
  // Only a clearly described reporting period may be taken from a description.
  const describedPeriod = description.match(/quarter\s+(?:ended|ending)\b[^.;]*(?:\.[^.;]*)?/i)?.[0] || '';
  const period = reportingDate(title) || reportingDate(describedPeriod);
  const statedQuarter = explicitQuarter(title) || explicitQuarter(description);
  const datedQuarter = period ? Math.floor(((period.month + 9) % 12) / 3) + 1 : null;
  const quarter = statedQuarter || datedQuarter;
  const start = fiscal ?? (period ? period.year - (period.month < 3 ? 1 : 0) : null);
  const consistent = !statedQuarter || !datedQuarter || statedQuarter === datedQuarter;
  if (kind === 'quarterly' && quarter && start !== null && consistent) {
    return { year: fiscalLabel(start), sortYear: start, quarter };
  }
  if (fiscal !== null) return { year: fiscalLabel(fiscal), sortYear: fiscal, quarter: null };
  const namedYear = Number((title.match(/\b((?:19|20)\d{2})\b/) || [])[1]);
  const date = report.file_date ? new Date(report.file_date) : null;
  const year = namedYear || (date && !Number.isNaN(date.getTime()) ? date.getUTCFullYear() : null);
  return { year: year ? String(year) : 'Other', sortYear: year || 0, quarter: null };
}

const timestamp = (value) => Date.parse(value) || 0;
const byDocumentDate = (a, b) => timestamp(b.file_date || b.created_at) - timestamp(a.file_date || a.created_at)
  || (a.file_name || '').localeCompare(b.file_name || '');

export function groupFinancialReports(reports) {
  const sections = { annual: new Map(), filings: new Map(), quarterly: new Map(), documents: new Map() };
  reports.forEach((report) => {
    const period = getReportPeriod(report);
    const kind = getReportKind(report);
    const section = period.quarter ? 'quarterly' : kind === 'quarterly' ? 'documents' : kind;
    const groups = sections[section];
    if (!groups.has(period.year)) groups.set(period.year, { ...period, items: [], quarters: [[], [], [], []] });
    const group = groups.get(period.year);
    group.items.push(report);
    if (period.quarter) group.quarters[period.quarter - 1].push(report);
  });
  return Object.fromEntries(Object.entries(sections).map(([key, groups]) => [key,
    [...groups.values()].sort((a, b) => {
      // Compare period end year, then prefer FY over calendar year on a tie.
      const aFiscal = a.year.includes('-');
      const bFiscal = b.year.includes('-');
      return (b.sortYear + Number(bFiscal)) - (a.sortYear + Number(aFiscal))
        || Number(bFiscal) - Number(aFiscal);
    }).map((group) => ({ ...group, items: group.items.sort(byDocumentDate), quarters: group.quarters.map((items) => items.sort(byDocumentDate)) })),
  ]));
}
