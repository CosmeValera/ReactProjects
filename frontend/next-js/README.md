# Next.js
The React Framework.

We will be following this [YT Video](https://www.youtube.com/watch?v=jMy4pVZMyLM&ab_channel=midulive), that follows the [docu](https://nextjs.org/learn/dashboard-app/getting-started).

## 🚀 Getting Started
### Initialize a Next.js App
1. Raw:
```bash
npx create-next-app@latest
```
2. Template:
```bash
npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```

### Execute it
1. **Normal**
```bash
npm run dev
```
2. **Turbo** (Faster, but experimental)
```bash
npm run dev --turbo
```

## 📄 Files
### Configuration files
- `tsconfig.json`
- `prettier.config.js`
- `postcss.config.js`
- `tailwind.config.js`
- `next.config.js`
- `.eslintrc.json`
- `.nvmrc`

### Mocked Database
- `scripts/seed.js`

### Images
- `public/`

### Main App (`/app`)
- `app/lib/`: Fetching, tools...
- `app/ui/`: UI components
- `app/layout`: Routes
- `app/page.tsx`: An example page. Usually we will have a `/pages/` folder that will contain our Next.js pages.

## 🖌️ CSS
### General:
  - `nextjs-dashboard\app\ui\global.css`
### Tailwind:
```html
<body className='bg-gray-300'>
```
### CSS Modules:
  1. Create a file ending with `.module.css`. For instance:
```css
/* home.module.css */
.shape {
    height: 0;
    width: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 30px solid black;
}
```
  2. Import it:
```tsx
import styles from './ui/home.module.css';
```
  3. Use it like this:
```html
<div className={styles.shape}></div>
```
### Styled Components:
1. Install Styled Components package:
```bash
npm install styled-components
```
2. Import `styled` from `styled-components`:
```tsx
import styled from 'styled-components';
```
3. Create a styled component by calling styled and passing the HTML element name or a component:
```tsx
const StyledButton = styled.button`
  /* CSS styles */
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
```  
4. Use the styled component like any other React component:
```tsx
const App = () => {
  return (
    <div>
      <StyledButton>Click Me</StyledButton>
    </div>
  );
};
```

### CSS Modules vs Styled Components:
Both are similar in offering scoped css for your React components.

**Differences:** 

- **CSS Modules** might be preferable if you prefer to keep your styles separate from your components and want to use regular CSS syntax. It's a good fit for teams familiar with traditional CSS workflows.

- **Styled Components** might be a better choice if you want to keep styles tightly coupled with your components, prefer writing CSS in JavaScript, or need advanced features like dynamic styling based on props. But you will need to install a new dependency.

### CSS Modules in a React App:
Unlike Next.js, React does not inherently offer built-in support for CSS Modules out of the box. Therefore, we'll need to implement the following steps:
- Same steps as in `CSS Modules` section up there.
- Add configuration in your `webpack.config.js`:
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // Enable CSS Modules
              localIdentName: '[name]__[local]--[hash:base64:5]', // Custom naming convention for CSS Modules
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};

```
## Next.js components
Next.js has some components to enhance web performance.

### Image
```ts
import Image from 'next/image';
```
```ts
<Image src="/hero-desktop.png" width={1000} height={760} alt="Screenshots of the dashboard"/>
```
The `Image` component in Next.js offers superior image optimization compared to the standard `img` tag. Additionally, the `Image` component allows developers to specify the width and height attributes directly within the component, helping to prevent layout shifts by reserving space for the image before it's fully loaded.

### Link
```ts
import Link from 'next/link';
```
```html
<Link href="/login" className="flex ..."> 
    <span>Log in</span>
</Link>
```
Using this `Link` component introduces code splitting, which enhances performance. Code splitting means that when you click on a navigation button, Next.js only loads the necessary files for that particular page or component. This results in faster navigation and reduced initial load times for your application, making the user experience smoother and more efficient.