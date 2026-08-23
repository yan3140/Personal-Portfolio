# Lingxiao Pang - Personal Portfolio

庞凌啸的个人开发者作品集，用于展示个人信息、项目经历、成长时间线、技术栈与联系方式。

## 在线访问

- Portfolio: <https://yan3140.github.io/Personal-Portfolio/>
- Repository: <https://github.com/yan3140/Personal-Portfolio>

## 项目内容

目前展示三个实际项目：

- **知屿 Knode**：围绕知识版本、混合检索、可靠索引与引用问答构建的知识管理平台。
- **OpsPilot**：融合可靠告警事件链路、检索增强与 AI 诊断的运维诊断系统。
- **新疆南繁智慧育种平台**：基于 RuoYi 二次开发的育种业务管理平台。

每个项目均包含独立详情页，展示项目背景、个人工作、技术亮点、系统链路与技术栈。

## 页面功能

- 粒子化姓名与鼠标交互首屏
- 项目手风琴展示与项目详情页
- 纵向成长经历时间线
- 技术栈循环展示
- 深色与浅色主题切换及本地持久化
- 章节 Dock 导航与右侧滚动位置指示
- GitHub、邮箱复制和简历入口

## 动效组件

页面使用并适配了 [React Bits](https://reactbits.dev/) 动效组件，包括：

- Gradient Waves
- Accordion Gallery
- Split Flap Text
- Dock
- Logo Loop

组件颜色、尺寸、交互节奏和主题状态均根据当前作品集界面进行了调整。

## 技术栈

- Astro 7
- React 19
- TypeScript
- React Bits
- Motion
- GSAP
- Lenis
- OGL
- Lucide Icons
- CSS

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址为 <http://localhost:4321>。

## 检查与构建

```bash
npm run check
npm run build
npm run preview
```

生产文件生成在 `dist/` 目录。

## 内容维护

主要资料集中在 [`src/data/portfolio.ts`](src/data/portfolio.ts)：

- `profile`：个人信息与联系方式
- `education`：教育经历
- `focus`：个人方向摘要
- `projects`：项目列表
- `technologyGroups`：技术栈分组
- `journey`：成长时间线

项目详情内容位于 [`src/data/projectDetails.ts`](src/data/projectDetails.ts)。

## GitHub Pages

项目通过 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 自动部署到 GitHub Pages。

推送到 `main` 分支后，GitHub Actions 会自动完成安装、构建和发布：

```bash
git add .
git commit -m "Update portfolio"
git push
```

`astro.config.mjs` 会在 GitHub Actions 环境中自动识别仓库名，并为项目站点配置 `/Personal-Portfolio/` 基础路径。

## 文档

- [实现方案](docs/portfolio-implementation-plan.md)
- [个人资料采集模板](docs/content-intake-template.md)
- [学生项目资料模板](docs/student-project-intake-template.md)
