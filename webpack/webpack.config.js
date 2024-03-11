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

module.exports = {
    //entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build')
    },
    module: { rules }
}