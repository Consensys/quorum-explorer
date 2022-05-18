/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  publicRuntimeConfig: {
    DISABLE_AUTH: process.env.DISABLE_AUTH,
    QE_BASEPATH: process.env.QE_BASEPATH,
  },
  experimental: { esmExternals: true },
  basePath: process.env.QE_BASEPATH,
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
