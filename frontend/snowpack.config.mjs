/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: ["@snowpack/plugin-postcss", "@snowpack/plugin-webpack"],
  routes: [
    {
      match: "routes",
      src: ".*",
      dest: "/index.html",
    },
  ],
  env: {
    // BACKEND_URL: "http://localhost:8000/graphql",
    // BACKEND_URL: "http://192.168.1.3:8000/graphql",
    BACKEND_URL: "https://divvy-hw-demo/graphql",
  },
  optimize: {
    treeshake: true,
  },
  packageOptions: {},
  devOptions: {
    port: 3000,
    hostname: "localhost",
    tailwindConfig: "./tailwind.config.js",
  },
  testOptions: {
    files: ["src/**/*.@(spec|test).*"],
  },
  buildOptions: {
    out: "build",
    baseUrl: "/",
    clean: true,
  },
};
