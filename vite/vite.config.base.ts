import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export const baseViteConfig = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			tsconfigPaths(),
			viteStaticCopy({
				targets: [
					{
						src: 'src/sw.js',
						dest: './',
					},
					{
						src: 'src/assets/screenshots/',
						dest: './assets',
					},
					{
						src: 'src/assets/favicon/',
						dest: './assets',
					},
					{
						src: './robots.txt',
						dest: './',
					},
				],
			}),
			svgr({
				svgrOptions: {
					plugins: ['@svgr/plugin-jsx'],
					jsxRuntimeImport: {
						namespace: 'jsx',
						source: 'ddd-react/jsx-runtime',
					},
					jsxRuntime: 'automatic',
				},
				esbuildOptions: {
					jsx: 'transform',
					jsxFactory: 'jsx.jsx',
					jsxFragment: 'Fragment',
					jsxDev: false,
				},
			}),
			VitePWA({
				registerType: 'autoUpdate',
				injectRegister: 'auto',

				// Минимальный обязательный манифест
				manifest: {
					name: 'App',
					short_name: 'App',
					start_url: '.',
					display: 'standalone',
					theme_color: '#ffffff',
					background_color: '#ffffff',
					icons: [],
				},
				// Включить в dev режиме
				devOptions: {
					enabled: true,
				},
				workbox: {
					globPatterns: ['**/*.{js,css,html}'],
					cleanupOutdatedCaches: true,
					skipWaiting: true,
					clientsClaim: true,
					runtimeCaching: [
						{
							urlPattern: /^https:\/\/ddfilms.online\/api\/.*/i,
							handler: 'NetworkFirst',
							options: {
								cacheName: 'api-cache',
								expiration: {
									maxEntries: 100,
									maxAgeSeconds: 5 * 60, // 5 минут
								},
								networkTimeoutSeconds: 10, // Таймаут сети
							},
						},
					],
				},
			}),
		],
		resolve: {
			alias: {
				'@': '/src',
			},
		},
		esbuild: {
			jsx: 'transform',
			jsxFactory: 'jsx',
			jsxFragment: 'Fragment',
			jsxInject: "import {jsx, Fragment} from 'ddd-react/jsx-runtime'",
			jsxDev: false,
		},
		server: {
			host: 'localhost',
			port: 3000,
			proxy: {
				'/api': {
					target: env.VITE_PRODUCTION_API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
		base: env.VITE_CDN_ADDRESS || '/',
	};
});
