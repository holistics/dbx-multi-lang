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

function getLeafKeyPaths(obj, prefix = '') {
  if (obj === null || obj === undefined || typeof obj !== 'object' || Array.isArray(obj)) {
    return prefix ? [prefix] : [];
  }
  return Object.entries(obj).flatMap(([k, v]) => {
    const newPrefix = prefix ? `${prefix}.${k}` : k;
    return getLeafKeyPaths(v, newPrefix);
  });
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
        test(`${file} has the same keys as en`, () => {
          const refKeys = new Set(getLeafKeyPaths(loadYaml(REFERENCE_LOCALE, file)));
          const locKeys = new Set(getLeafKeyPaths(loadYaml(locale, file)));

          const missing = [...refKeys].filter(k => !locKeys.has(k));
          const extra = [...locKeys].filter(k => !refKeys.has(k));

          assert.ok(
            missing.length === 0 && extra.length === 0,
            `${locale}/${file} keys mismatch:\n` +
            (missing.length ? `  Missing: ${missing.join(', ')}\n` : '') +
            (extra.length ? `  Extra: ${extra.join(', ')}` : '')
          );
        });
      }
    });
  }
});
