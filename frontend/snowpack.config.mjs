/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: ["@snowpack/plugin-postcss"],
  routes: [
    {
      match: "routes",
      src: ".*",
      dest: "/index.html",
    },
  ],
  optimize: {
    treeshake: true,
  },
  packageOptions: {},
  devOptions: {
    port: 3000,
    hostname: "localhost",
    tailwindConfig: "./tailwind.config.js",
  },
  buildOptions: {
    out: "build",
    baseUrl: "/",
    clean: true,
  },
};
