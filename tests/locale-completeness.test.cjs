/**
 * Verifies that every non-English locale:
 *   1. Has the same number of YAML files as the English reference locale.
 *   2. Has the same number of leaf key-value pairs in each file as the corresponding English file.
 */

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const LOCALES_DIR = path.join(__dirname, '..', 'locales');
const REFERENCE_LOCALE = 'en';

function getLocales() {
  return fs.readdirSync(LOCALES_DIR).filter(
    f => fs.statSync(path.join(LOCALES_DIR, f)).isDirectory()
  );
}

function getYamlFiles(locale) {
  return fs.readdirSync(path.join(LOCALES_DIR, locale))
    .filter(f => f.endsWith('.yaml'))
    .sort();
}

function countLeafKeys(obj) {
  if (obj === null || obj === undefined) return 1;
  if (typeof obj !== 'object' || Array.isArray(obj)) return 1;
  return Object.values(obj).reduce((sum, v) => sum + countLeafKeys(v), 0);
}

function loadYaml(locale, file) {
  return yaml.load(fs.readFileSync(path.join(LOCALES_DIR, locale, file), 'utf8'));
}

const locales = getLocales();
const referenceFiles = getYamlFiles(REFERENCE_LOCALE);

describe('Locale completeness', () => {
  for (const locale of locales) {
    if (locale === REFERENCE_LOCALE) continue;

    describe(locale, () => {
      test('has the same number of files as en', () => {
        const files = getYamlFiles(locale);
        assert.equal(
          files.length,
          referenceFiles.length,
          `Expected ${referenceFiles.length} files, got ${files.length} (missing: ${referenceFiles.filter(f => !files.includes(f)).join(', ')})`
        );
      });

      for (const file of referenceFiles) {
        test(`${file} has the same number of key-value pairs as en`, () => {
          const refCount = countLeafKeys(loadYaml(REFERENCE_LOCALE, file));
          const locCount = countLeafKeys(loadYaml(locale, file));
          assert.equal(
            locCount,
            refCount,
            `${locale}/${file}: expected ${refCount} key-value pairs, got ${locCount}`
          );
        });
      }
    });
  }
});
