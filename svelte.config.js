import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isMobileBuild = process.env.MOBILE_BUILD === 'true';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'@/*': './src/lib/*'
		},
		adapter: isMobileBuild
			? adapterStatic({
					pages: 'build',
					assets: 'build',
					fallback: 'index.html',
					precompress: false
				})
			: adapterNode()
	}
};

export default config;
