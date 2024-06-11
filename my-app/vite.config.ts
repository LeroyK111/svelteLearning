import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import pugPlugin from 'vite-plugin-pug';


export default defineConfig({
	plugins: [sveltekit(), pugPlugin()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		host: '0.0.0.0'
	}
});
