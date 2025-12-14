import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react' // Import the plugin

import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react, // Add the react plugin here
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      ...react.configs.recommended.rules, // Manually add recommended rules from react plugin
      'no-unused-vars': 'off', // Temporarily disable
      'react/prop-types': 'off', // Disable prop-types rule as we are using modern React
      'react/react-in-jsx-scope': 'off', // Disable for React 17+
    },
  },
])
