#!/usr/bin/env node
/**
 * Fetches publications from ADS public library and writes to src/data/publications.json
 * Requires ADS_TOKEN environment variable
 * Run: ADS_TOKEN=xxx node scripts/fetch-ads.js
 */

import { writeFile } from 'fs/promises';

const LIBRARY_ID = 'PmZuzC2WT_iteZZLF1guPw';
const OUTPUT_PATH = './src/data/publications.json';

async function fetchLibrary(token) {
  const res = await fetch(
    `https://api.adsabs.harvard.edu/v1/biblib/libraries/${LIBRARY_ID}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`ADS library fetch failed: ${res.status}`);
  return res.json();
}

async function fetchSearch(bibcodes, token) {
  const q = bibcodes.map((b) => `bibcode:${b}`).join(' OR ');
  const res = await fetch(
    `https://api.adsabs.harvard.edu/v1/search/query?q=${encodeURIComponent(q)}&fl=bibcode,title,author,year,pub&rows=200`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`ADS search fetch failed: ${res.status}`);
  return res.json();
}

function transformDoc(doc) {
  return {
    bibcode: doc.bibcode,
    title: doc.title?.[0] || 'Untitled',
    author: doc.author || [],
    year: doc.year,
    journal: doc.pub || doc['pub_raw'],
  };
}

async function main() {
  const token = process.env.ADS_TOKEN;
  if (!token) {
    console.warn('ADS_TOKEN not set, writing empty publications');
    await writeFile(OUTPUT_PATH, '[]');
    return;
  }

  try {
    const lib = await fetchLibrary(token);
    const bibcodes = lib.documents || [];
    if (bibcodes.length === 0) {
      await writeFile(OUTPUT_PATH, '[]');
      return;
    }

    const search = await fetchSearch(bibcodes, token);
    const docs = (search.response?.docs || []).map(transformDoc);
    const sorted = docs.sort((a, b) => (b.year || '').localeCompare(a.year || ''));

    await writeFile(OUTPUT_PATH, JSON.stringify(sorted, null, 2));
    console.log(`Wrote ${sorted.length} publications to ${OUTPUT_PATH}`);
  } catch (err) {
    console.error('ADS fetch error:', err.message);
    process.exit(1);
  }
}

main();
