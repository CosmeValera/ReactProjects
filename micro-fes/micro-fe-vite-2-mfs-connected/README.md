# Microfrontends with VITE

## 🚀 Getting Started
1. Create `Vite` project and install Module Federation plugin:
```bash
npm create vite@latest
npm add @originjs/vite-plugin-federation -D 
npm add @vitejs/plugin-react -D 
npm i
```

1. Execute project:
```bash
npm run dev
```

1. However if you want to connect two microfrontends (e.g. host and remote), when using `Vite` you will need to use build and preview, here's how:
```bash
npm run build && npm run preview
```
When building and previewing we will have our remoteEntry page in the url: `localhost:\<port\>:assets/remoteEntry.js`. But if we just execute it we won't have it.
![](readme_img/remote_entry.png)

### Problem with VITE (No Hot Reload)

The problem also relies in that VITE doesn't use Webpack. It uses Module Federation that is a principle for sharing code between microfrontends on runtime. Webpack has their version, and Vite has another version of Module Federation. But the VITE version does not allow hot reload.

The problem with building and previewing is that it doesn't have hot reloading. Therefore, we will have to rebuild and reserve every time we make a change. And also running and serving cannot be happening at the same time.
