import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import globals from 'globals'

/**
 * A minimal, genuinely useful safety net, not ceremony.
 *
 * Five phases of logic (form validation, focus traps, tone alternation,
 * scroll-linked motion) had zero automated coverage before this. This does
 * not replace testing it in a real browser, it catches the mistakes that
 * make that testing pointless: a hook called conditionally, a missing
 * dependency that stales a closure, a form control with no accessible name,
 * an unused variable masking a typo.
 *
 * Deliberately not a heavy test framework. `npm run lint` only.
 */
export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // This project passes props straight through to native elements
      // constantly (icons, spreads onto <a>/<button>). PropTypes would be
      // pure ceremony on a site with no shared component library consumers.
      'react/prop-types': 'off',
      // This is a copy-heavy marketing site. "doesn't", "isn't", "you're"
      // are everywhere in real sentences, and an unescaped apostrophe in JSX
      // text is not a bug, browsers render it correctly. This rule would be
      // pure noise here, not a real React mistake.
      'react/no-unescaped-entities': 'off',
      // Flags every `setState` call that runs synchronously inside an
      // effect, including the pattern this project relies on deliberately:
      // state starts at a safe SSR default (see docs/GOTCHAS.md, the
      // prerender pass has no `window`) and syncs to the real value once
      // mounted, in an effect, exactly once. That is not a bug to fix, it is
      // how the site stays correct under `vite-react-ssg`. Left off rather
      // than silenced file by file.
      'react-hooks/set-state-in-effect': 'off',

      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    // Build tooling and scripts run under plain Node, not the browser.
    files: ['scripts/**/*.mjs', 'vite.config.js', 'postcss.config.js', 'tailwind.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.vite-react-ssg-temp/**'],
  },
]
