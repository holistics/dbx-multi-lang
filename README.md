# @holistics/dbx-multi-lang

Multi-language (i18n) support for DBDiagram.

## Structure

```
dbx-multi-lang/
├── locales/
│   ├── en/           # English translations
│   ├── vi/           # Vietnamese translations
│   ├── uz/           # Uzbek translations
│   └── metadata.yaml  # Language metadata
├── scripts/
│   └── build-locales.cjs  # Merge YAML to JSON
├── dist/             # Built output
└── src/
    └── index.js      # Exports
```

## Adding a New Locale

1. **Create locale folder** by cloning English:
   ```bash
   cp -r locales/en locales/ja
   ```

2. **Add language metadata** in `locales/metadata.yaml`:
   ```yaml
   ja:
     name: Japanese
     nativeName: 日本語
     flag: 🇯🇵
     hello: こんにちは
   ```

3. **Translate YAML files** in `locales/ja/` (keep key structure)

4. **Update `src/index.js`**:
   ```js
   import jaMessages from '../dist/ja.json' with { type: 'json' };

   export const messages = {
     en: enMessages,
     vi: viMessages,
     ja: jaMessages,  // Add this
   };
   ```

5. **Build the package**:
   ```bash
   yarn build
   ```

## Key Format

Translation keys follow: `section.subsection.key`

Example: `t('common.buttons.save')` or `t('ai.tokenUsage.usageText')`

## Exports

```js
import {
  SUPPORT_LOCALES,    // ['en', 'vi', ...]
  DEFAULT_LOCALE,     // 'en'
  LOCALE_STORAGE_KEY, // 'dbdiagram-locale'
  languageMetadata,   // { en: {...}, vi: {...} }
  messages,           // { en: {...}, vi: {...} }
} from '@holistics/dbx-multi-lang';
```

## Development

```bash
yarn build              # Build locales + Vite bundle
yarn build:locales      # Build locales only (JSON merge)
```
