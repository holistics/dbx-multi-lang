#!/usr/bin/env node
/**
 * Build script: Merge all YAML locale files into single JSON file
 * Usage: node scripts/build-locales.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const LOCALES_DIR = 'locales';
const DIST_DIR = 'dist';

function buildLocale(locale) {
  const localePath = path.join(LOCALES_DIR, locale);
  const files = fs.readdirSync(localePath).filter(f => f.endsWith('.yaml'));
  const merged = {};

  for (const file of files) {
    const content = yaml.load(fs.readFileSync(path.join(localePath, file), 'utf8'));
    const filename = path.basename(file, '.yaml');

    // If file already has root key matching filename, extract inner content
    // This handles cases where file has structure { ai: { title: ... } }
    // and we want just { title: ... } in the merged result
    if (content[filename]) {
      merged[filename] = content[filename];
    } else {
      merged[filename] = content;
    }
  }

  // Ensure dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR);
  }

  // Write pretty-printed JSON
  const jsonPath = path.join(DIST_DIR, `${locale}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2));
  console.log(`✓ Built: ${jsonPath} (${files.length} files)`);
}

console.log('Building locale files...\n');

// Build all locales
const locales = fs.readdirSync(LOCALES_DIR).filter(
  f => fs.statSync(path.join(LOCALES_DIR, f)).isDirectory()
);

for (const locale of locales) {
  buildLocale(locale);
}

console.log('\nDone!');
