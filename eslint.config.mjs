import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import compatPlugin from 'eslint-plugin-compat'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: { js, compat: compatPlugin },
		extends: ['js/recommended', eslintConfigPrettier],
		languageOptions: {
			globals: {
				...globals.browser,
				Handlebars: 'readonly',
			},
		},
		rules: {
			'no-unused-vars': 'error',
			'no-undef': 'off',
			curly: 'error',
			'compat/compat': 'error',
			'no-console': 'error',
			'no-multiple-empty-lines': 'error',
		},
		ignores: [
			'node_modules/',
			".template-lintrc.js",
			".lintstagedrc.js",
			"vite.config.js",
		],
	},
])
