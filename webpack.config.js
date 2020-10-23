// webpack.config.js
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const pages = ["", "gpgpu-flocking"];

const htmlPlugins = populateHtmlPlugins(pages);
// const entries = generateEntries(pages);

module.exports = {
  context: __dirname,
  entry: {
    home: "./src/index.js",
    ["gpgpu-flocking"]: "./src/gpgpu-flocking/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: (pathData) => {
      return pathData.chunk.name === "home" ? "[name].js" : "[name]/[name].js";
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ["raw-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
  plugins: htmlPlugins,
};

function generateHtmlPlugin(page) {
  return new HtmlWebPackPlugin({
    title: page ? page : "home",
    chunks: [page ? page : "home"],
    filename: path.resolve("dist", page, "index.html"),
    template: path.resolve(__dirname, "src", page, "index.html"),
  });
}

function populateHtmlPlugins(pages) {
  res = [];
  pages.forEach((page) => {
    res.push(generateHtmlPlugin(page));
  });
  return res;
}

function generateEntries(pages) {
  const entries = {};
  pages.map(
    (page) =>
      (entries[page ? page : "home"] = path.resolve("./src", pages, "index.js"))
  );
  console.log(entries);
  return entries;
}
