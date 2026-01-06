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
	}
})
