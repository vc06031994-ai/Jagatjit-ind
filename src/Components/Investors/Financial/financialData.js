export function plainText(value) {
  if (typeof value === 'string') return value;
  if (!value) return '';
  if (value.nodeType === 'text') return value.value || '';
  return (value.content || []).map(plainText).join('');
}

export const categoryKey = (value) => value.trim().replace(/\s+/g, ' ').toLowerCase();

export function mapFinancialEntry(item) {
  const fields = item.fields || {};
  const rawCategories = Array.isArray(fields.categoryName) ? fields.categoryName : [fields.categoryName];
  const categories = rawCategories.filter((value) => typeof value === 'string' && value.trim())
    .map((value) => value.trim().replace(/\s+/g, ' '));
  const file = fields.fileUrl;
  const fileUrl = typeof file === 'string' ? file : file?.fields?.file?.url;
  return {
    id: item.sys?.id,
    file_name: plainText(fields.fileName).trim() || 'Untitled document',
    categories: categories.length ? categories : ['Uncategorised'],
    category_name: categories.join(' '),
    file_description: plainText(fields.fileDescription),
    file_date: fields.fileDate || null,
    file_url: fileUrl?.startsWith('//') ? `https:${fileUrl}` : fileUrl || null,
    html_content: plainText(fields.htmlfield),
    created_at: item.sys?.createdAt || null,
  };
}

export function getFinancialCategories(reports) {
  const options = new Map();
  reports.forEach((report) => report.categories.forEach((label) => {
    const key = categoryKey(label);
    if (!options.has(key)) options.set(key, { key, label });
  }));
  return [...options.values()].sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));
}

// Fetch every page before displaying results: a failed later page must not
// silently present a partial archive as the full set of financial documents.
export async function loadFinancialReports(getEntries) {
  const entries = [];
  const ids = new Set();
  let total;
  do {
    const response = await getEntries({
      content_type: 'financialPage',
      limit: 100,
      skip: entries.length,
      order: 'sys.createdAt,sys.id',
    });
    if (!Array.isArray(response.items) || !Number.isInteger(response.total) || response.total < 0) {
      throw new Error('Invalid financial documents response.');
    }
    if (total !== undefined && response.total !== total) {
      throw new Error('Financial archive changed while loading. Please retry.');
    }
    total = response.total;
    if (!response.items.length && entries.length < total) {
      throw new Error('Financial documents response is incomplete.');
    }
    for (const entry of response.items) {
      if (entry.sys?.id) {
        if (ids.has(entry.sys.id)) throw new Error('Overlapping financial documents pages. Please retry.');
        ids.add(entry.sys.id);
      }
      entries.push(entry);
    }
  } while (entries.length < total);
  if (entries.length !== total) throw new Error('Financial documents response is incomplete.');
  return entries.map(mapFinancialEntry);
}
