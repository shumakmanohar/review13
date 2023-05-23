/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["mongoose"],
	},
	images: {
		domains: ["media.sproutsocial.com", "lh3.googleusercontent.com"],
	},
};

module.exports = nextConfig;
