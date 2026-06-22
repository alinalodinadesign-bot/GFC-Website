/**
 * Fetches editable event data from a published Google Sheets CSV.
 * Set EVENT_SHEET_CSV_URL in your environment variables.
 *
 * Sheet columns (row 1 = headers, row 2 = values):
 *   eyebrow | badge | title | place | date | cat_01 | cat_02 | cat_03 | cat_04 | cat_05
 *
 * Returns parsed data object, or null on error (fallback to data.js will apply).
 */

function parseCSVRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * locale: 'en' | 'ru'
 * Sheet row 2 = EN, row 3 = RU. Falls back to EN if RU row is missing.
 */
export async function fetchEventData(locale = 'en') {
  const url = process.env.EVENT_SHEET_CSV_URL;
  if (!url) return null;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;

    const text = await res.text();
    const lines = text.split('\n').filter(l => l.trim() !== '');
    if (lines.length < 2) return null;

    const headers = parseCSVRow(lines[0]);
    const rowIdx = locale === 'ru' && lines.length >= 3 ? 2 : 1;
    const values  = parseCSVRow(lines[rowIdx]);

    const data = {};
    headers.forEach((h, i) => {
      data[h] = values[i] ?? '';
    });

    return data;
  } catch (err) {
    console.error('[event-data] fetch failed:', err);
    return null;
  }
}
