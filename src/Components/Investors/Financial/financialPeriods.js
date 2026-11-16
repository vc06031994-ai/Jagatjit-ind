// Indian financial year: April–March. Never infer a reporting quarter
// from an upload/publication date; leave unclassified documents visible instead.
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const fiscalLabel = (year) => `${year}-${String(year + 1).slice(-2)}`;

export function getReportPeriod(report) {
  const title = report.file_name || '';
  const text = `${title} ${report.file_description || ''}`;
  const fiscal = title.match(/\b(20\d{2})\s*[-–/]\s*(20\d{2}|\d{2})\b/)
    || text.match(/\bFY\s*(20\d{2})\s*[-–/]\s*(20\d{2}|\d{2})\b/i);
  const validFiscal = fiscal && Number(fiscal[2].slice(-2)) === (Number(fiscal[1]) + 1) % 100;
  const quarterMatch = text.match(/\bQ([1-4])\b/i);
  const quarterly = Boolean(quarterMatch) || /quarter|financial results|shareholding|governance/i.test(`${report.category_name || ''} ${title}`);
  // Month + year in the title describes the reporting period, not upload date.
  const monthDate = title.match(/\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?[\s,/-]+(?:\d{1,2}[\s,/-]+)?(20\d{2})\b/i);
  const numericDate = title.match(/\b(0?[1-9]|[12]\d|3[01])[./-](0?[1-9]|1[0-2])[./-](20\d{2})\b/);
  const month = monthDate ? MONTHS.indexOf(monthDate[1].slice(0, 3).toLowerCase()) : numericDate ? Number(numericDate[2]) - 1 : -1;
  const periodYear = monthDate ? Number(monthDate[2]) : numericDate ? Number(numericDate[3]) : null;
  const quarter = quarterMatch ? Number(quarterMatch[1]) : month >= 0 ? Math.floor(((month + 9) % 12) / 3) + 1 : null;
  const start = validFiscal ? Number(fiscal[1]) : periodYear ? periodYear - (month < 3 ? 1 : 0) : null;

  if (quarterly && quarter && start !== null) {
    return { year: fiscalLabel(start), sortYear: start, quarter };
  }
  if (validFiscal && !quarterly) {
    return { year: fiscalLabel(Number(fiscal[1])), sortYear: Number(fiscal[1]), quarter: null };
  }
  const year = Number((title.match(/\b(20\d{2})\b/) || [])[1]);
  const date = report.file_date ? new Date(report.file_date) : null;
  const fallback = year || (date && !Number.isNaN(date.getTime()) ? date.getUTCFullYear() : null);
  return { year: fallback ? String(fallback) : 'Other', sortYear: fallback || 0, quarter: null };
}

export function groupFinancialReports(reports) {
  const quarterly = new Map();
  const documents = new Map();
  reports.forEach((report) => {
    const period = getReportPeriod(report);
    const target = period.quarter ? quarterly : documents;
    if (!target.has(period.year)) {
      target.set(period.year, { ...period, items: [], quarters: [[], [], [], []] });
    }
    const group = target.get(period.year);
    group.items.push(report);
    if (period.quarter) group.quarters[period.quarter - 1].push(report);
  });
  const sorted = (groups) => [...groups.values()].sort((a, b) => b.sortYear - a.sortYear);
  return { quarterly: sorted(quarterly), documents: sorted(documents) };
}
