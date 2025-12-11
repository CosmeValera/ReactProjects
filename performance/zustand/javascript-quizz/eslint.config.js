import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  // Rules for JS and TS files (including this config file)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'semi': 'off', // 0 or 1 semicolon
      // "semi": ["error", "never"], // this is for only 0 semicolon
      // "semi": ["error", "always"], // this is for only 1 semicolon
      'no-extra-semi': 'error', // Disallow 2 or more semicolons
      'quotes': ['error', 'single'], // Single quotes
      'no-unused-vars': 'warn', // Warn unused vars
    }
  },
])