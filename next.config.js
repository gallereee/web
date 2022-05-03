/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["api.gallereee.site", "api.stage.gallereee.site", "localhost"],
	},
};

module.exports = nextConfig;
