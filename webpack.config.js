const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = function (env, argv) {
    return {

        mode: "development",

        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
                filename: "index.html",
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: "babel-loader"
                }
            ]
        }
    }
}
