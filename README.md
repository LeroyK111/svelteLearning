# svelte 框架学习笔记

为什么要使用svelte，很简单，就是因为虚拟dom的颗粒度太差了。

**Svelte** 纯前端框架 和 **SvelteKit** 全栈框架

官方地址：https://svelte.dev/
脚手架地址：https://kit.svelte.dev/

| **特性**          | **Svelte**                | **SvelteKit**                 |
| --------------- | ------------------------- | ----------------------------- |
| **类型**          | 前端框架                      | 应用程序框架                        |
| **用途**          | 构建单个组件或小型前端应用             | 构建完整的全栈应用                     |
| **编译**          | 将组件编译成高效的原生 JavaScript 代码 | 使用 Vite 构建工具进行开发和编译           |
| **路由**          | 不提供内置路由功能                 | 内置文件系统路由                      |
| **数据获取**        | 需要手动实现数据获取逻辑              | 内置数据获取功能（load 函数）             |
| **服务器端渲染（SSR）** | 不直接支持                     | 内置服务器端渲染支持                    |
| **静态网站生成（SSG）** | 不直接支持                     | 支持静态网站生成                      |
| **客户端渲染（CSR）**  | 默认客户端渲染                   | 支持客户端渲染                       |
| **文件结构**        | 没有强制的文件结构                 | 约定文件结构（pages、routes 等文件夹）     |
| **SEO 友好**      | 需要手动配置                    | 内置 SEO 支持                     |
| **开发体验**        | 轻量、简洁的开发体验                | 提供丰富的开发工具和调试支持                |
| **状态管理**        | 使用 Svelte 内置的状态管理         | 可以使用 Svelte 内置的状态管理或其他库       |
| **API**         | 主要是前端组件 API               | 提供前端组件 API 和后端 API（Endpoints） |
## 开始使用

### vscode专用插件

- Svelte for VS Code
- Svelte Intellisense

### 使用 vite 构建 svelte 前端应用
```md
- 只能构建 svelte 前端应用
- 通过vite插件可以实现全栈应用（但何必呢？）
```
### ☆使用官方脚手架 svelteKit
```md
- 构建纯前端应用
- 构建全栈应用
```

这里我以svelteKit构建应用，进行学习.

```sh
$ npm create svelte@latest my-app

◆  Which Svelte app template?
│  ○ SvelteKit demo app 学习使用
│  ○ Skeleton project 生产项目
│  ● Library project 组件编写
◆  Add type checking with TypeScript?
│  ● Yes, using TypeScript syntax 使用typescript
│  ○ Yes, using JavaScript with JSDoc comments 使用jsdoc
│  ○ No
◆  Select additional options (use arrow keys/space bar)
│  ◻ Add ESLint for code linting 代码纠错
│  ◻ Add Prettier for code formatting 代码格式化
│  ◻ Add Playwright for browser testing 浏览器兼容性检测
│  ◻ Add Vitest for unit testing 单元测试工具
│  ◻ Try the Svelte 5 preview (unstable!) 使用svelte5新版本
step:
  1: cd my-app
  2: npm install
  4: npm run dev -- --open
```
### 目录结构
![](Pasted%20image%2020240531142326.png)
```
├─.svelte-kit
│  ├─generated
│  │  ├─client
│  │  │  └─nodes
│  │  └─server
│  └─types
│      └─src
│          └─routes
├─src
│  ├─lib
│  └─routes
├─static 静态资源
└─tests 用于浏览器测试的 Playwright，则测试将位于此目录中。
|-svelte.config.js 此文件包含您的 Svelte 和 SvelteKit 配置。 
```
- `lib` 包含您的库代码（实用程序和组件），可以通过 `$lib` 别名导入，也可以打包以供分发 `svelte-package`， `server` 包含仅限服务器的库代码。可以使用 `$lib/server` 别名导入它。SvelteKit 将阻止您在客户端代码中导入这些内容。
- `params` 包含应用所需的任何参数匹配器
- `routes` 包含应用程序的路由。您还可以在此处共置仅在单个路由中使用的其他组件
- `app.html` 是页面模板 — 包含以下占位符的 HTML 文档：
	- `%sveltekit.head%` - `<link>` 以及 `<script>` 应用程序所需的元素，以及任何 `<svelte:head>` 内容
	- `%sveltekit.body%` — 呈现页面的标记。这应该存在于一个 `<div>` 或其他元素内部，而不是直接存在于 `<body>` 内部，以防止浏览器扩展注入元素导致的错误，然后被水合过程破坏。如果不是这种情况，SvelteKit 将在开发中警告您
	- `%sveltekit.nonce%` — 用于手动包含的链接和脚本的 CSP 随机数（如果使用）
	- `%sveltekit.env.[NAME]%` - 这将在渲染时替换为 `[NAME]` 环境变量，该变量必须以 `publicPrefix` （通常 `PUBLIC_` ） 开头。如果不匹配，它将回退到 `''` 。
- `error.html` 是当其他所有内容都失败时呈现的页面。它可以包含以下占位符：
	- `%sveltekit.status%` — HTTP 状态
	- `%sveltekit.error.message%` — 错误消息
- `hooks.client.js` 包含客户端挂钩
- `hooks.server.js` 包含服务器挂钩
- `service-worker.js` 包含 Service Worker

其他文件及目录都是常见文件和目录。不做多余解释

### 组件编辑




### 全栈框架使用
