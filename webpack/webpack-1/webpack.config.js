const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

ruleForStyles = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}

ruleForJavaScript = {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic' //classic
                }
            ]
        ]
    }
}

const rules = [ruleForJavaScript, ruleForStyles]

module.exports = (env, argv) => {
    const {mode} = argv
    const isProduction = mode === 'production'

    return {
        output: {
            filename: isProduction
            ? '[name].[contenthash].js'
            : 'main.js',
            path: path.resolve(__dirname, 'build')
        },
        plugins: [
            new HtmlWebpackPlugin({ template: 'src/index.html' })
        ],
        module: { rules },
        devServer: {
            open: true, // abrir el navegador al arrancar
            port: 4345,
            client: {
                overlay: false, // mostrar los errores de compilacion en el navegador
            },
            // compress: true 
        },
        devtool: 'source-map'
    }
}