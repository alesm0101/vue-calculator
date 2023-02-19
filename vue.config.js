const { defineConfig } = require("@vue/cli-service");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: ["./src/styles/main.scss"],
    });
}

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  },
});
