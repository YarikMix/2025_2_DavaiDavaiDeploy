import { defineConfig, mergeConfig } from 'vite';
import { baseViteConfig } from './vite.config.base';

const devViteConfig = {
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		assetsDir: 'assets/stage',
		sourcemap: true,
		rollupOptions: {
			input: 'index.html',
		},
	},
};

export default defineConfig((env) =>
	mergeConfig(
		devViteConfig, baseViteConfig(env),
	),
);
