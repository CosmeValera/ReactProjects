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

## Files
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
- `app/lib/`: Libraries
- `app/ui/`: UI components
- `app/layout`: Routes
- `app/page.tsx`: An example page. Usually we will have a `/pages/` folder that will contain out Next.js pages.