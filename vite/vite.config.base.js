import handlebarsPlugin from "@yoichiro/vite-plugin-handlebars"
import path from "path"
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [handlebarsPlugin()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			host: 'localhost',
			port: 5173,
			proxy: {
				'/api': {
					target: env.VITE_PRODUCTION_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		}
	}
})
