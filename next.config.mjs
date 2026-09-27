import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },

    // Includes rewrites for PostHog
    async rewrites() {
        return [
            {
                source: "/m3tr1c5/static/:path*",
                destination: "https://eu-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/m3tr1c5/:path*",
                destination: "https://eu.i.posthog.com/:path*",
            },
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,

    transpilePackages: ["next-mdx-remote"],
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net",
            },
        ],
    },
};

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    options: {
        rehypePlugins: ["rehype-highlight"],
    },
});
export default withMDX(nextConfig);
