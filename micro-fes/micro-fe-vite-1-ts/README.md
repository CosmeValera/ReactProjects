### 🚫 Go to Micro-Fe-Project to read the readme. 🚫
### 🚫 Go to Micro-Fe-Project to read the readme. 🚫

--- 
**Micro-Fe-Project's readme (Date 10/20/2023):**

# Microfrontends with VITE

## 🚀 Getting Started
1. Create `Vite` project and install Module Federation plugin:
```bash
npm create vite@latest
npm add @originjs/vite-plugin-federation -D 
npm i
```

2. Execute project:
```bash
npm run dev
```

3. However if you want to connect two microfrontends (e.g. host and remote), when using `Vite` you will need to use build and preview, here's how:
```bash
npm run build && npm run preview
```
When building and previewing we will have our remoteEntry page in the url: `localhost:\<port\>:assets/remoteEntry.js`. But if we just execute it we won't have it.
![](readme_img/remote_entry.png)

The problem with building and previewing is that it doesn't have hot reloading. Therefore, we will have to rebuild and reserve every time we make a change. And also running and serving cannot be happening at the same time.
