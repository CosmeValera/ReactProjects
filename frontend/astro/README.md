<!-- https://midu.dev/curso/astro-cms-headless/00-introduccion/01-conceptos-ssg -->

# 🧑‍🚀 Astro

## Why Astro?
Not every tool fits every job. The frontend world has a few main categories: SPAs (React, Vue, Angular) for highly interactive apps, SSGs (Astro, Zola, Hugo, Vitepress) for fast static sites, meta-frameworks (Next, Nuxt) that cover both.

Astro lives in the SSG category, but with more range. It lets you write components in any framework you already know, and only ships JavaScript when a page actually needs it. Great fit when your content is mostly static, but you don't want to be limited by your tooling.

## A bit of theory about SSGs
SSGs (Static Site Generators) like Hugo or Zola build your site at compile time, producing plain HTML files, no server, no DB. Astro is an SSG at its core, but goes further: it lets you mix and match UI frameworks, use server-side rendering (SSR) when needed. Think of it as an SSG with superpowers.

Astro hydrates components only when needed ("islands architecture"), giving you blazing fast sites with great Core Web Vitals, while still letting you use React, Vue, Svelte, etc

## Getting Started
Create a new Astro app using this command:
```sh
npm create astro@latest
```