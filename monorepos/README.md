# Monorepo
All code for multiple projects is stored in a single repository.
Options for monorepos are: NX, and Turborepo.

## Create project

### NX
```bash
npx create-nx-workspace@latest nxapp
```

### Turborepo
```bash
npx create-turbo@latest turboapp
```

## 🚀 Getting started (NX)
### Install all dependencies:
```bash
npm i
```
<small>Common dependencies will be installed in the root `node_modules`</small>

### List apps:
```bash
npx nx show projects
```

### Run ALL apps:
```bash
npm run start
```
or
```bash
npx nx run-many -t start
```

### Run ONE app:
```bash
npx nx run sccf-tc-spacon-mf:start
```
<small>Change sccf-tc-spacon-mf* with the app you want to start!</small>


### Test ONE app:
```bash
npx nx run sccf-tc-spacon-mf:test
```
<small>Change sccf-tc-spacon-mf* with the app you want to test!</small>


## Monorepo vs Polyrepo

| Feature               | Monorepos                                     | Polyrepos                                      |
|-----------------------|-----------------------------------------------|------------------------------------------------|
| **Definition**        | ![blue](https://via.placeholder.com/15/ADD8E6/000000?text=+) Single repository for multiple projects       | ![blue](https://via.placeholder.com/15/ADD8E6/000000?text=+) Separate repositories for each project         |
| **Dependency Management** | ![green](https://via.placeholder.com/15/00FF00/000000?text=+) Simplified, centralized                       | ![red](https://via.placeholder.com/15/FF0000/000000?text=+) More complex, harder to manage                 |
| **Code Sharing**      | ![green](https://via.placeholder.com/15/00FF00/000000?text=+) Easy and promotes reuse                       | ![red](https://via.placeholder.com/15/FF0000/000000?text=+) Difficult, often leads to duplication          |
| **CI/CD**             | ![green](https://via.placeholder.com/15/00FF00/000000?text=+) Unified, centralized                          | ![red](https://via.placeholder.com/15/FF0000/000000?text=+) Tailored, separate pipelines                   |
| **Code Navigation**   | ![green](https://via.placeholder.com/15/00FF00/000000?text=+) All in one place                              | ![red](https://via.placeholder.com/15/FF0000/000000?text=+) More complex, across multiple repos            |
| **Scalability**       | ![red](https://via.placeholder.com/15/FF0000/000000?text=+) Can become slow and complex                   | ![green](https://via.placeholder.com/15/00FF00/000000?text=+) Easier to scale with smaller repos             |
| **Permissions**       | ![red](https://via.placeholder.com/15/FF0000/000000?text=+) Harder to manage                              | ![green](https://via.placeholder.com/15/00FF00/000000?text=+) Easier, per repository                         |
| **Build Overhead**    | ![red](https://via.placeholder.com/15/FF0000/000000?text=+) Higher, can trigger broad rebuilds            | ![green](https://via.placeholder.com/15/00FF00/000000?text=+) Lower, changes affect only the specific repo   |
| **Performance**       | ![red](https://via.placeholder.com/15/FF0000/000000?text=+) Slower, single repo                           | ![green](https://via.placeholder.com/15/00FF00/000000?text=+) Smaller, faster repos                          |


