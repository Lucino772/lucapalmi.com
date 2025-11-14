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
