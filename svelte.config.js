import adapter from "@sveltejs/adapter-static";

const config = {
	kit: {
		adapter : adapter({
			pages: '',
			assets: '',
			precompress: true,
			fallback: ''
		}),
		paths: {
			base: ''
		},
		trailingSlash: "ignore"
	}
};

export default config;