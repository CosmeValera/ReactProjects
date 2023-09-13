## Add Standard Lintern:
1. Type in the terminal:
```
npm install standard -D
```
2. Add in the package.json:
```
"eslintConfig": {
"extends": "./node_modules/standard/eslintrc.json"
}
```
3. To run the lintern, type in the terminal:
```
npm run lint
```

## Deploy in Netlify
To deploy our project we are going to build it first and then drop the /dist files in netlify. Here's how:
1. Build the project:
```
npm run build
```
2. Open the following URL:

https://app.netlify.com/drop/

3. Drop the dist folder inside the web:

![](images/netlify-drop.png)

Enjoy your deployed app!! 😀
