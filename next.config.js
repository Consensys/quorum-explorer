/** @type {import('next').NextConfig} */
module.exports = {
  basePath: process.env.QE_BASEPATH ? process.env.QE_BASEPATH : "",
  reactStrictMode: true,
  
  async redirects() {

    if (this.basePath === ""){
      return [
        {
          source: "/",
          destination: "/nodes",
          basePath: false,
          permanent: false
        }
      ];
    } else {
      return [
        {
          source: "/",
          destination: this.basePath + "/nodes",
          basePath: false,
          permanent: false
        },
        {
          source: "/api/:path*",
          destination: this.basePath + "/api/:path*",
          basePath: false,
          permanent: false
        },
      ];
    }

    
  }
};
