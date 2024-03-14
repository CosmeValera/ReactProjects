# Next.js
The React Framework.

We will be followin this [YT Video](https://www.youtube.com/watch?v=jMy4pVZMyLM&ab_channel=midulive), that follows the [docu](https://nextjs.org/learn/dashboard-app/getting-started).

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
```scss
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
<import styles from './ui/home.module.css';
```
  3. Use it like this:
```html
<div className={styles.shape}></div>
```