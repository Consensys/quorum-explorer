/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  experimental: { esmExternals: true },
  basePath: process.env.NEXT_PUBLIC_QE_BASEPATH,
  reactStrictMode: true,
  async redirects() {
    if (this.basePath === "") {
      return [
        {
          source: "/",
          destination: "/nodes",
          basePath: false,
          permanent: false,
        },
      ];
    } else {
      return [
        {
          source: "/",
          destination: this.basePath + "/nodes",
          basePath: false,
          permanent: false,
        },
        {
          source: "/api/:path*",
          destination: this.basePath + "/api/:path*",
          basePath: false,
          permanent: false,
        },
        {
          source: this.basePath,
          destination: this.basePath + "/nodes",
          basePath: false,
          permanent: false,
        },
      ];
    }
  },
});
