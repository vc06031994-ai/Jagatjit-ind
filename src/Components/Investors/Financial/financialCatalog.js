import { categoryKey } from './financialData.js';

const MGT_CATEGORY = /^(?:form\s+)?mgt[\s-]*(\d+[a-z]?)$/i;
const MGT_DOCUMENT = /\bmgt[\s-]*(\d+[a-z]?)\b/i;

// Display-only organisation. The original Contentful records are unchanged.
// Historically MGT filings were published under Annual Report; expose them
// separately like the reference, without losing any document or category.
export function getReportCategories(report) {
  const filing = report.file_name?.match(MGT_DOCUMENT);
  const categories = report.categories?.length ? report.categories : ['Uncategorised'];
  const labels = categories.map((label) => {
    const mgt = label.match(MGT_CATEGORY);
    if (mgt) return `MGT-${mgt[1].toUpperCase()}`;
    if (filing && /^annual\s+reports?$/i.test(label.trim())) return `MGT-${filing[1].toUpperCase()}`;
    return label;
  });
  return [...new Set(labels)];
}

// An icon and display order, never a fixed list of allowed categories.
// New CMS categories automatically receive a card and a generic document icon.
const CATEGORY_STYLES = [
  [/regulation\s*46|disclosure/i, 'disclosure'],
  [/governance/i, 'governance'],
  [/share\s*holding/i, 'shareholding'],
  [/secretarial|compliance/i, 'compliance'],
  [/financial.*results|quarterly/i, 'results'],
  [/related\s+part/i, 'related'],
  [/annual\s+report/i, 'annual'],
  [/^mgt-9$/i, 'filing'],
  [/^mgt-/i, 'filing'],
  [/physical\s+shareholder/i, 'shareholders'],
  [/subsidiary/i, 'subsidiary'],
  [/board|committee|composition/i, 'board'],
  [/agm|egm|notice|postal/i, 'meeting'],
  [/announcement|intimation/i, 'announcement'],
  [/polic|code|charter/i, 'policies'],
  [/deposit|credit/i, 'deposit'],
  [/contact|grievance|odr/i, 'contact'],
];

export function getCategoryStyle(label) {
  const index = CATEGORY_STYLES.findIndex(([pattern]) => pattern.test(label));
  return index === -1 ? { icon: 'documents', order: 100 } : { icon: CATEGORY_STYLES[index][1], order: index };
}

export function buildFinancialCatalog(reports) {
  const catalog = new Map();
  reports.forEach((report) => {
    const seen = new Set();
    getReportCategories(report).forEach((label) => {
      const key = categoryKey(label);
      if (seen.has(key)) return;
      seen.add(key);
      if (!catalog.has(key)) {
        catalog.set(key, { key, label: key === 'uncategorised' ? 'Other Documents' : label, reports: [], ...getCategoryStyle(label) });
      }
      catalog.get(key).reports.push(report);
    });
  });
  return [...catalog.values()].sort((a, b) => a.order - b.order || a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));
}

export function resolveFinancialView(catalog, reports, { category = '', all = false } = {}) {
  if (!category && !all) return { type: 'directory', label: 'Investors', reports: [] };
  if (!category && all) return { type: 'documents', label: 'All Documents', reports };
  const match = catalog.find((item) => item.key === categoryKey(category));
  return match ? { type: 'documents', label: match.label, reports: match.reports }
    : { type: 'not-found', label: 'Category not found', reports: [] };
}
