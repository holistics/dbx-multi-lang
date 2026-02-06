#!/usr/bin/env node
/**
 * Restructure YAML files to have root key matching filename
 * Usage: node scripts/restructure-yaml.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const LOCALES_DIR = 'locales';

function restructureLocale(locale) {
  const localePath = path.join(LOCALES_DIR, locale);
  const files = fs.readdirSync(localePath).filter(f => f.endsWith('.yaml'));

  for (const file of files) {
    const filename = path.basename(file, '.yaml');
    const filePath = path.join(localePath, file);

    // Read existing content
    const content = yaml.load(fs.readFileSync(filePath, 'utf8'));

    // Check if already wrapped in root key
    if (content[filename]) {
      console.log(`✓ ${locale}/${file} already has root key "${filename}"`);
      continue;
    }

    // Wrap content in root key matching filename
    const restructured = {
      [filename]: content
    };

    // Write back with pretty formatting
    const yamlStr = yaml.dump(restructured, {
      indent: 2,
      lineWidth: -1,
      noRefs: true
    });
    fs.writeFileSync(filePath, yamlStr);
    console.log(`✓ ${locale}/${file} wrapped in "${filename}:"`);
  }
}

console.log('Restructuring YAML files...\n');
restructureLocale('en');
restructureLocale('vi');
console.log('\nDone!');
