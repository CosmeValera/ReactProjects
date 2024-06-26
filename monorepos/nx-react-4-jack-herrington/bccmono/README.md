# NX

## Start the application

`yarn start`

## Build for production

`yarn build`

## Create component

`nx g @nrwl/react:lib mycomps`

## Create a shared component

`nx g @nrwl/react:component carousel --directory mycomps/src/lib/carousel`

## Storybook
### Install Storybook
`yarn add --dev @nrwl/storybook`
### Storybook configuration
`nx g @nx/react:storybook-configuration --directory mycomps/src/lib/carousel`
### Run Storybook
`nx run mycomps:storybook`

---
---
---
---
---
 👇 DEFAULT 👇
-
---
## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
