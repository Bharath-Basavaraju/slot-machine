module.exports = {
    //devtool: "inline-sourcemap",
    entry: './src/index.js',
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'slot_machine.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /.scss$/,
                loader: 'style-loader!css-loader?modules&sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded&sourceMap'
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    }
};