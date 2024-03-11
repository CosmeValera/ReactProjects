## 📦 Webpack

### 🟠 Main ideas
- Entry point
- Loaders
- Plugins

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
1. `webpack.config.js`:
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

### 📎 HTML
To see the code manually in our `build` folder, add a file `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <script src="./main.js"></script>
</body>
</html>
```

And with this command we can see the page in the web:
```bash
npx servor build
```

### 🖍️ CSS Loader

We will need a loader for the css, to be able to add an import for `.css` files directly to the `.js` file:

We will add this CSS loader: 
```js
ruleForStyles = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}
```
In this case we have 2: 'style-loader', 'css-loader'. Webpack reads the loaders from left to the right. In this case it starts with the style-loader and then the css-loader. The style-loader understands the css, and the css-loader understands the imports like url() and so on inside the css, that's why we need both.

Also we need to install them:
```bash
npm i style-loader css-loader --save-dev
```

### 🧩 Plugins
Let's install the `html-webpack-plugin`:
```bash
npm install html-webpack-plugin --save-dev
```
`webpack.config.js`:
```js
plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' })
],
```
Now we put the index.html in `src` instead of in `build`. And now with this configuration an index.html will be created in `build`.