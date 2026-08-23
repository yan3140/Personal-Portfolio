# Portfolio 01

一个面向学生开发者的单页作品集，使用 Astro、TypeScript 和 Tailwind CSS 构建，可通过 GitHub Actions 发布到 GitHub Pages。

## 修改个人内容

主要内容集中在 [`src/data/portfolio.ts`](src/data/portfolio.ts)：

- `site`：页面标题和搜索描述；
- `profile`：姓名、定位、介绍、邮箱、GitHub 和简历；
- `focus`：首屏能力摘要；
- `projects`：三个项目及其亮点；
- `capabilities`：能力分组；
- `journey`：当前学习路径。

当前只根据共享工作区中的真实资料填写了 YanBlog。项目二和项目三为明确占位内容，需要在发布前替换。

## 动效参考

首屏粒子动效研究了 [`qwqovoewe/-portfolio`](https://github.com/qwqovoewe/-portfolio) 的公开实现思路，包括离屏 Canvas 文字采样、粒子聚合与消散、鼠标排斥和背景技术词。项目卡使用开源库 [Atropos](https://atroposjs.com/)。

参考仓库目前未包含许可证，因此本项目没有直接复制其组件源码；现有粒子系统按照相同机制独立重写，并额外实现了点击双层波纹与当前页面的主题适配。

## 本地运行

```bash
npm install
npm run dev
```

检查和构建：

```bash
npm run check
npm run build
npm run preview
```

## GitHub Pages 发布

1. 在当前目录初始化 Git 仓库并提交代码；
2. 创建 GitHub 仓库，将默认分支设为 `main`；
3. 推送到 GitHub；
4. 打开仓库 `Settings > Pages`；
5. 将 Source 设为 `GitHub Actions`；
6. 等待 `Deploy to GitHub Pages` workflow 完成。

`astro.config.mjs` 会在 GitHub Actions 中自动识别项目仓库名，并为项目主页设置 `base` 路径。若仓库名是 `username.github.io`，则使用根路径。

## 内容资料

- [实现方案](docs/portfolio-implementation-plan.md)
- [完整资料采集](docs/content-intake-template.md)
- [学生项目通用模板](docs/student-project-intake-template.md)
