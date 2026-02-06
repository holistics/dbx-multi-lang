#!/usr/bin/env node
/**
 * Fix double-nested YAML files (e.g., ai.ai instead of ai)
 * Usage: node scripts/fix-double-nesting.cjs
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const LOCALES_DIR = 'locales';

function fixLocale(locale) {
  const localePath = path.join(LOCALES_DIR, locale);
  const files = fs.readdirSync(localePath).filter(f => f.endsWith('.yaml'));

  for (const file of files) {
    const filename = path.basename(file, '.yaml');
    const filePath = path.join(localePath, file);

    const content = yaml.load(fs.readFileSync(filePath, 'utf8'));

    // Check for double nesting: content[filename][filename]
    if (content[filename] && content[filename][filename]) {
      // Unwrap: { ai: { ai: { ... } } } -> { ai: { ... } }
      content[filename] = content[filename][filename];
      fs.writeFileSync(filePath, yaml.dump(content, { indent: 2, lineWidth: -1, noRefs: true }));
      console.log(`✓ ${locale}/${file} unwrapped double nesting`);
    } else {
      console.log(`✓ ${locale}/${file} no changes needed`);
    }
  }
}

console.log('Fixing double-nested YAML files...\n');
fixLocale('en');
fixLocale('vi');
console.log('\nDone!');
