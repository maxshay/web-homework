/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  extends: "@snowpack/app-scripts-react",
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
    BACKEND_URL: "http://localhost:8000/graphql",
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
