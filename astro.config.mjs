import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const repository = process.env.GITHUB_REPOSITORY ?? "";
const repositoryName = repository.split("/")[1];
const isUserPage = repositoryName?.endsWith(".github.io");
const base = process.env.CI && repositoryName && !isUserPage ? `/${repositoryName}` : "/";
const owner = process.env.GITHUB_REPOSITORY_OWNER;

export default defineConfig({
  site: process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : "http://localhost:4321"),
  base,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
