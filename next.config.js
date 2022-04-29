/** @type {import('next').NextConfig} */
module.exports = {
  basePath: process.env.NEXT_PUBLIC_QE_BASEPATH
    ? process.env.NEXT_PUBLIC_QE_BASEPATH
    : "",
  reactStrictMode: true,
  env: {
    QE_BACKEND_URL: process.env.NEXT_PUBLIC_QE_BACKEND_URL,
    QE_CONFIG_PATH: process.env.QE_CONFIG_PATH,
  },
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
};
