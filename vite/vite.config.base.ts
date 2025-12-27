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

				includeAssets: ['assets/favicon-86x86.png'],
				outDir: 'dist/assets',
				manifestFilename: 'assets/prod/manifest.webmanifest',
				manifest: {
					name: 'DDFilms - Онлайн кинотеатр',
					short_name: 'DDFilms',
					description: 'Смотрите фильмы и сериалы онлайн',
					theme_color: '#1976d2',
					background_color: '#ffffff',
					display: 'standalone',
					start_url: env.VITE_PRODUCTION_URL,
					scope: env.VITE_PRODUCTION_URL,
					icons: [
						{
							src: `${env.VITE_CDN_ADDRESS}/assets/favicon/apple-touch-icon.png`,
							sizes: '180x180',
							type: 'image/png',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/assets/favicon/favicon-144x144.png`,
							sizes: '144x144',
							type: 'image/png',
						},
					],
					screenshots: [
						{
							src: '/assets/screenshots/screenshot-narrow.png',
							type: 'image/png',
							sizes: '538x819',
							form_factor: 'narrow',
						},
						{
							src: '/assets/screenshots/screenshot-wide.png',
							type: 'image/png',
							sizes: '1899x1027',
							form_factor: 'wide',
						},
					],
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
							urlPattern: ({ request }) =>
								request.destination === 'document' ||
								request.destination === 'script' ||
								request.destination === 'style',
							handler: 'CacheFirst',
							options: {
								cacheName: 'static-resources',
								expiration: {
									maxEntries: 50,
									maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
								},
							},
						},
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
