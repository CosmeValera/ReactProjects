## 📦 Webpack

### 🚀 Getting Started

```bash
npm run build
```
Execute webpack and create a packed file inside `dist` (or `build` or what you have in your `webpack.config.js` as output option).


```bash
node build/main.js
```
Execute the packed file.

### 🔫 Loaders
1. 
`webpack.config.js`:
```js
module: {
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react']
            }
        }
    ]
}
```
With this, when packing if webpack finds a file that **ends** in **.js**, then it will use babel to load it. This is useful because we need this to be able to make it understand React. And by default it is not understood.

2. 
```bash
npm install --save-dev @babel/core babel-loader @babel/preset-react
```
