/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["api.gallereee.site", "api.stage.gallereee.site", "localhost"],
	},
	webpack(config) {
		const originalEntry = config.entry;

		config.entry = async () => {
			const entries = await originalEntry();

			if (
				entries["main.js"] &&
				!entries["main.js"].includes("./polyfills.js")
			) {
				entries["main.js"].unshift("./polyfills.js");
			}
			return entries;
		};

		return config;
	},
};

const withTM = require("next-transpile-modules")([
	"abort-controller",
	"@bd-dm/ui",
	"nanoid",
	"event-target-shim",
]);

module.exports = withTM(nextConfig);
