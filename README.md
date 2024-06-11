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

### 官方插件

官方推荐依赖：https://www.sveltesociety.dev/packages
- SPA应用的路由器
	- Svelte Routing
	- routify
- SPA应用全局状态管理
	- 原生的，非常推荐。
	- @tanstack/svelte-query

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

#### 组件响应式+page.svelte
```html
<script lang="ts">

  // 需要大写

  import Nested from '../components/Nested.svelte';

  

  let name = 'hello world';

  let src = '/src/assets/mylog.png';

  

  // 支持插入 原生js

  let string = `<strong>粗体</strong>`;

  // string = "<a href='www.baidu.com'>点我跳转</a>";

  

  // 响应式绑定

  let count = 0;

  function increment(e: any) {

    console.log(e);

    count++;

    console.log(e.target, count);

  }

  

  // 计算属性

  $: doubled = count * 2;

  // 高级监听器，但不是函数式的，而是函数体本身，

  $: console.log(`自动监听？ ${doubled}`);

  // 这里只会执行一次.

  $: {

    console.log("1");

    console.log("2");

  }

  // 写判断都可以。。。

  $: if (count > 10){

    alert(`${count}`)

    count = 0

  }

  

  

</script>

  

<!-- 模板语法{} -->

<h1>{name}</h1>

<!-- 支持jsx类似的语法 -->

<div>{name.toUpperCase()}</div>

<!-- 大括号支持属性值 -->

<img {src} alt="A man dances." />

<!-- 支持简写 -->

<img {src} alt="A man dances." />

<!-- @html关键字支持引入html原始语法，容易造成xss攻击 -->

<p>{@html string}</p>

  

<!-- 响应式 -->

<button on:click={increment}>

  Clicked {count}

  {count === 1 ? 'time' : 'times'}

</button>

  

<p>计算值 {doubled}</p>

  

<!-- 组件引入 -->

<Nested></Nested>

  
  

<style>

  h1 {

    color: red;

  }

</style>
```
#### 子组件Nested.svelte
```html
<script>
	$: console.log(`组件初始化时，自动执行，参数变化时，自动执行`);

	// 引入
	let nums = [0, 1, 2, 3];
	const obj = { foo: { bar: 0 } };
	const foo = obj.foo;
	function addNumber() {
		// nums push反而会失去响应式
		// nums.push(nums.length + 1);
		// 更常用的方法， pop 、 shift 和 unshift splice 。都是如此
		// nums = [...nums, nums.length++];
		// 数组需要索引赋值，也可以引起响应式的改变
		nums[nums.length] = nums.length;
		// 对象则可以自动响应
		obj.foo.bar = nums.length;
	}
</script>

<p>这是一个嵌入的组件</p>
<p>
	{nums.join(' + ') +
		`=${nums.reduce((previousValue, currentValue) => previousValue + currentValue), 0}`}
</p>
<p>对象赋值的修改:{obj.foo.bar}:{foo.bar}</p>
<button on:click={addNumber}> 点我 </button>

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

```
#### 子组件传参props
父组件
```html
<script>
	// @ts-nocheck
	import Props from '../../components/Props.svelte';

	const pkg = {
		website: 'https://svelte.dev'
	};

	setTimeout(() => {
		pkg.website = 'https://www.google.com';
	}, 2000);

	let count = 0;
	function increment() {
		count += 1;
	}
</script>

<h1>开始子组件传参</h1>
<!-- <Props answer={42}></Props> -->
<!-- <Props></Props> -->
<!-- 批量传参 -->
<Props {...pkg}></Props>
```
子组件
```html
<script>
  // 这里接参数，居然用export，暴露语法
	// export let answer;
  // 如果组件传参涉及到
	export let answer = "默认值";
	export let website;
</script>

<p>The answer is {answer}</p>
<p>{website}</p>

```
#### 模板逻辑语法
`太像jsx语法了 😀`
##### #if语法
```jsx
<!-- 太像jsx语法，不过非常模板化 -->
{#if count > 3}
	<p>{count} 单IF</p>
{/if}

{#if count > 2}
	<p>{count} if else</p>
{:else}
	<p>{count} 非常可怕</p>
{/if}


{#if count > 10}
	<p>{count} is greater than 10</p>
{:else if count < 5}
	<p>{count} is less than 5</p>
{:else}
	<p>{count} is between 5 and 10</p>
{/if}
```
##### #each语法
```jsx
  <!-- 迭代器：#each array as value, index, array-->
  <!-- 这里涉及到无障碍属性，一般都是结合css判断的 -->
  {#each colors as color, i}
		<button
			aria-current={selected === color}
      aria-label={color}
			style="background: {color}"
			on:click={() => selected = color}
		>{i + 1}</button>
	{/each}
```
`加入索引key，优化动态dom`
```jsx
<!-- 这里失去了绑定，原有的dom继续存在，这里就发生了错位 -->
<!-- 一旦你想要更新things，就会发生dom渲染的错位 -->
{#each things as thing}
	<Thing name={thing.name} />
{/each}
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}
```
##### #await异步语法
```jsx
<script>
	import { getRandomNumber } from '../../hooks/utils.ts';

	let promise = getRandomNumber();

	function handleClick() {
		promise = getRandomNumber();
	}




</script>

<button on:click={handleClick}>
	generate random number
</button>


<!-- 如果是异步函数，则无法显示 -->
{#if promise}
	{promise}
{:else}
	<p>waiting...</p>
{/if}

<!-- promise then catch 都可以生效, 除了finally-->
<!-- 这里我们使用异步语法，就可以获取异步函数了 -->
{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<!-- 简写写法 -->
{#await promise then number}
	<p>The number is {number}</p>
{/await}

```
#### DOM事件
##### on:pointermove 鼠标移动
```jsx
<script lang="ts">
	let m = { x: 0, y: 0 };

	function handleMove(event: PointerEvent ) {
    console.log(event);
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>


<h1>全部的事件捕获</h1>

<div style="margin-top: 100px;" on:pointermove={handleMove}>
	The pointer is at {m.x} x {m.y}
</div>

<!-- 内联处理事件 -->
<div
	on:pointermove={(e) => {
		m = { x: e.clientX, y: e.clientY };
	}}
>
	The pointer is at {m.x} x {m.y}
</div>

<style>
	div {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 1rem;
	}
</style>
```
##### |事件修饰符
```jsx
<!-- 事件修饰符 -->

<button on:click|once={() => alert('clicked')}> Click me </button>

<button on:click|preventDefault={() => alert('clicked')}> Click me </button>

<button on:click|stopPropagation={() => alert('clicked')}> Click me </button>

<button on:click|passive={() => alert('clicked')}> Click me </button>

<button on:click|nonpassive={() => alert('clicked')}> Click me </button>

<button on:click|capture={() => alert('clicked')}> Click me </button>

<button on:click|self={() => alert('clicked')}> Click me </button>

<button on:click|trusted={() => alert('clicked')}> Click me </button>

<button on:click|trusted|once={() => alert('clicked')}> Click me </button>
```
##### 组件事件传递
父组件
```jsx
<!-- 老方法，事件传递 -->
<!-- <Inner on:message={handleMessage} /> -->
<Inner handleChange={handleChange} greeting={handleLoaded} on:message={handleMessage}/>
```
子组件
```jsx
<script>
	import Grandsons from "./Grandsons.svelte"
	// 这是v4版本的父子组件事件传递
	// import { createEventDispatcher } from 'svelte';
	// const dispatch = createEventDispatcher();
	// function sayHello() {
	// 	dispatch('message', {
	// 		text: 'Hello!'
	// 	});
	// }
	// 使用最好的v5版本的父子组件事件传递
	// !声明式语法也可以
	// export let greeting;
  // 二者选其一， 否则会报错
	let { handleChange, greeting } = $props();
</script>

<button on:click={() => handleChange(111)}> Click to say hello </button>
<button on:click={greeting}> Click to say hello </button>
<Grandsons on:message ></Grandsons>
```
孙组件
```jsx
<script>
  // 使用老api可以实现跨层级传递事件
import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>

<button on:click={sayHello}> Click to say hello </button>

```

#### 数据绑定bind

```vue

<script>
  import Markdown  from "../../components/Markdown.svelte"

	let name = 'word';

	let a = 1;
	let b = 2;

	let yes = false;

	let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	];
	const handleChange = (e) => {
		console.log(e.currentTarget);
	};
	let selected = 2;



	// 多选框
	let scoops = 1;
	let flavours = ['cookies and cream'];
	$: console.log(flavours);

	$: console.log(scoops);
</script>

<h1>数据绑定</h1>

<!-- 字符串绑定 -->
<input type="text" bind:value={name} />
<p>{name}</p>

<!-- 数字输入框 -->
<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>
<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>

<!-- 复选框 -->
<div>
	<label>
		<input type="checkbox" bind:checked={yes} />
		Yes! Send me regular email spam
	</label>
	{#if yes}
		<p>选中了</p>
	{:else}
		<p>未选中</p>
	{/if}
</div>

<!-- 多选框 -->
<div>
	<select bind:value={selected} on:change={handleChange}>
		{#each questions as question}
			<option value={question.id}>
				{question.text}
			</option>
		{/each}
	</select>
</div>

<!-- 单选框 -->
<div>
	{#each [1, 2, 3] as number}
		<label>
			<!-- 使用 -->
			<input type="radio" name="scoops" value={number} bind:group={scoops} />
			{number}
			{number === 1 ? 'scoop' : 'scoops'}
		</label>
	{/each}
</div>

<!-- 多选框 -->
<div>
	{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
		<label>
			<input type="checkbox" name="flavours" value={flavour} bind:group={flavours} />
			{flavour}
		</label>
	{/each}
</div>
<!-- 多选框 -->
<div>
  <select multiple bind:value={flavours}>
    {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
      <option>{flavour}</option>
    {/each}
  </select>
</div>



<Markdown></Markdown>
```
简写方式
```vue
<script>

import { marked } from 'marked';
	let value = `Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`;
</script>



<div class="grid">
	input
  <!-- 简写方式，可以快速绑定value -->
	<textarea bind:value></textarea>

	output
	<div>{@html marked(value)}</div>
</div>


<style>
	.grid {
		display: grid;
		grid-template-columns: 5em 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1em;
		height: 100%;
	}

	textarea {
		flex: 1;
		resize: none;
	}
</style>
```

#### 生命周期lifecycle


###### onMount DOM挂载
```vue
<canvas
	width={32}
	height={32}
></canvas>

<style>
	canvas {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #666;
		mask: url(../../assets/svelte-logo-mask.svg) 50% 50% no-repeat;
		mask-size: 60vmin;
		-webkit-mask: url(../../assets/svelte-logo-mask.svg) 50% 50% no-repeat;
		-webkit-mask-size: 60vmin;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import { paint } from '../../hooks/gradient';

	onMount(() => {
		const canvas = document.querySelector('canvas');
		const context = canvas?.getContext('2d');

    // canvas 动画创建
		let frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);
			paint(context, t);
		});

    // 记得销毁动画
		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>
```

##### 废弃 beforeUpdate afterUpdate
```vue
 <script>
	// import { afterUpdate, beforeUpdate } from "svelte";

	// beforeUpdate(() => {
	// 	console.log("dom更新前");
	// });

	// afterUpdate(() => {
	// 	console.log("dom更新后");
	// });
</script>
```
##### 现在推荐$effect
```vue
<script>
  $effect(() => {
		console.log('Domg更新之后');
  })
  $effect.pre(()=>{
    console.log("dom更新前");
  })
  // $effect.active()
</script>

<h1>测试dom更新前和dom更新后{$effect.active()}</h1>
<div></div>
```
##### tick dom更新的颗粒
```vue
<script lang="ts">
	import { tick } from 'svelte';

	let items: string[] | [] = [];
	let inputElement: HTMLInputElement;

	async function addItem() {
		items = [...items, `Item ${items.length + 1}`];
		// await tick(); 等待dom更新后，再做其他操作
		await tick();
    // 每次有新dom生成，则自动聚焦与input输入栏
		inputElement.focus();
	}
</script>

<input bind:this={inputElement} placeholder="Type something..." />
<button on:click={addItem}>Add Item</button>
<ul>
	{#each items as item}
		<li>{item}</li>
	{/each}
</ul>
```
##### onDestroy组件卸载
```vue
<script lang="ts">
  import { onDestroy } from 'svelte'

	import Use1 from './use1.svelte';
	import Use2 from './use2.svelte';

	import { count } from '../../store/stores';

	let count_value: number;

  // 订阅全局对象
	const unsubscribe = count.subscribe((value: number) => {
		count_value = value;
	});
  

  // 组件卸载时，自动取消订阅
  onDestroy(unsubscribe)
  
</script>

<h1>全局状态商店测试</h1>

<div style="background-color: pink; height: 500px; width: 500px">
	this count is {count_value}
</div>

<Use1></Use1>
<Use2></Use2>

```

#### 自带store商店
##### writable用法
```ts
/**
 * @author Leroy
 * 全局商店
 */
import { writable } from 'svelte/store';


/**
 * writable: 可写对象
 * 
*/


// 通过暴露语法暴露商店的对象
export const count = writable(0);
```
订阅subscribe
```vue
<script>
	import { count } from '../../store/stores';

	let s = 0;
	count.subscribe((value) => {
		s = value;
	});

	const hanleSub = () => {
		count.update((v) => v - 1);
	};
	const hanleAdd = () => {
		count.update((v) => v + 1);
	};




</script>

<button on:click={hanleAdd}>加一</button>
<button on:click={hanleSub}>减一</button>
<button on:click={() => count.set(0)}>重置为0</button>
<p>子组件观察框:{s}</p>

```
简写订阅
```vue
<script>
	import { count } from '../../store/stores';

  // 这个写法已经不流行
	// let s = 0;
	// count.subscribe((value) => {
	// 	s = value;
	// });

	const hanleSub = () => {
		count.update((v) => v - 1);
	};
	const hanleAdd = () => {
		count.update((v) => v + 1);
	};


  

</script>

<button on:click={hanleAdd}>加一</button>
<button on:click={hanleSub}>减一</button>
<button on:click={() => count.set(0)}>重置为0</button>
<!-- 直接$ 订阅即可, 还减少了内存泄漏 -->
<p>子组件观察框:{$count}</p>

```

##### readable用法
```ts
// 只读对象，参数意义：第一个参数是存储的初始值，第二个函数本质是获取了writable()之后的对象，将set, update方法映射出来
export const time = readable(new Date(), (set, update) => {
	// 设置循环函数
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	// 记得取消副作用
	return () => clearInterval(interval);
});
```

##### derived派生方法
```ts
// 派生对象
const start: any = new Date();
export const elapsed = derived(time, ($time: any) => {
  // 如果不使用set，update等功能，则可以直接返回值
	return Math.round(($time - start) / 1000);
});

// 测试派生对象的初始值
export const countFake = derived(
	count,
	($a, set) => {
		// 这里会监听count的变换，持续执行
		setTimeout(() => set($a * 2), 3000);
	},
	2000
);

```

用法
```vue
<script>
	import { time, elapsed, countFake } from '../../store/stores';

	// 日期格式化
	const formatter = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});
</script>



<h1>The time is {formatter.format($time)}</h1>
<p>
	This page has been open for
	{$elapsed}
	{$elapsed === 1 ? 'second' : 'seconds'}
</p>

<p>
  {$countFake}
</p>

```

##### custom自定义商店
```ts
// 自定义商店
function createCount() {
  /**
   * 这里的可玩性就非常高了
   * 
  */
	const { subscribe, set, update } = writable(99);

	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
}
export const customCount = createCount();
```

```vue
<div style="background-color: skyblue;">
	<h1>The count is {$customCount}</h1>
	<button on:click={customCount.increment}>+</button>
	<button on:click={customCount.decrement}>-</button>
	<button on:click={customCount.reset}>reset</button>
</div>
```

##### store对象bing
这是一种简易用法，可以快速实现dom和store保持同步.
```vue
<script>
import { count } from '../../store/stores';
</script>
<input type="range" max="100" min="0" bind:value={$count} />
<button on:click={() => ($count += 10)}> Add exclamation mark! </button>
```
stores.ts
```ts
import { derived, readable, writable } from 'svelte/store';

/**
 * writable: 可写对象
 * readable: 只读对象
 * derived；派生都西昂
 * ()=>{}: 自定义对象
 */


// 通过暴露语法暴露商店的对象
export const count = writable(0);
```
#### ★进阶组件编辑

##### Motion 运动对象
做动画专用, 内置多种动作算法.

###### tweened
```vue
<script lang="ts">
	// import { writable } from 'svelte/store';
	// const progress = writable(0);

	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Spring from './Spring.svelte';

	// tweened 创建了一个高级的运动对象
	const progress = tweened(0, {
		duration: 5000,
		easing: cubicOut
	});
</script>

<h1>进阶用法</h1>
<!-- <progress value={$progress}></progress>
<button on:click={() => progress.set(0)}> 0% </button>
<button on:click={() => progress.set(0.25)}> 25% </button>
<button on:click={() => progress.set(0.5)}> 50% </button>
<button on:click={() => progress.set(0.75)}> 75% </button>
<button on:click={() => progress.set(1)}> 100% </button> -->

<Spring></Spring>


<!-- <style>
	progress {
		display: block;
		width: 100%;
	}
</style> -->

```
###### spring
```vue
<script>
	// import { writable } from 'svelte/store';

	// let coords = writable({ x: 50, y: 50 });
	// let size = writable(10);
	import { spring } from 'svelte/motion';
  // 使用这个就可以设置阻尼器了
	let coords = spring(
		{ x: 50, y: 50 },
		{
      // 僵直系数
			stiffness: 0.1,
      // 阻尼
			damping: 0.25
		}
	);
  let size = spring(10);
</script>

<svg
	on:mousemove={(e) => {
		coords.set({ x: e.clientX, y: e.clientY });
	}}
	on:mousedown={() => size.set(30)}
	on:mouseup={() => size.set(10)}
	role="presentation"
>
	<circle cx={$coords.x} cy={$coords.y} r={$size} />
</svg>

<!--  -->
<div class="controls">
	<label>
		<h3>stiffness ({coords.stiffness})</h3>
		<input bind:value={coords.stiffness} type="range" min="0.01" max="1" step="0.01" />
	</label>

	<label>
		<h3>damping ({coords.damping})</h3>
		<input bind:value={coords.damping} type="range" min="0.01" max="1" step="0.01" />
	</label>
</div>

<style>
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	circle {
		fill: #ff3e00;
	}

	.controls {
		position: absolute;
		top: 1em;
		right: 1em;
		width: 200px;
		user-select: none;
	}

	.controls input {
		width: 100%;
	}
</style>

```

##### Transitions 缓动 & animate 动画
为真实dom快捷添加缓动和动画，用法挺多。
自己学习去吧。

`svelteLearning\my-app\src\routes\advanced\+page.svelte`

```vue
<script lang="ts">
	// import { writable } from 'svelte/store';
	// const progress = writable(0);

	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Spring from './Spring.svelte';
	import Fade from './Fade.svelte';
	import CusCss from './CusCSS.svelte';
	import CusJS from './CusJS.svelte';
	import Trans from './Trans.svelte';
	import Global from './Global.svelte';
	import KeyBlock from './KeyBlock.svelte';
	import Deferred from './Deferred.svelte';

	// tweened 创建了一个高级的运动对象
	const progress = tweened(0, {
		duration: 5000,
		easing: cubicOut
	});
</script>

<h1>进阶用法</h1>
<!-- <progress value={$progress}></progress>
<button on:click={() => progress.set(0)}> 0% </button>
<button on:click={() => progress.set(0.25)}> 25% </button>
<button on:click={() => progress.set(0.5)}> 50% </button>
<button on:click={() => progress.set(0.75)}> 75% </button>
<button on:click={() => progress.set(1)}> 100% </button> -->

<!-- <Spring></Spring> -->

<!-- transition -->
<!-- <Fade></Fade> -->
<!-- <CusCss></CusCss> -->
<!-- <CusJS></CusJS> -->
<!-- <Trans></Trans> -->
<!-- <Global></Global> -->
<!-- <KeyBlock></KeyBlock> -->
<!-- 平滑过渡 -->
<Deferred></Deferred>




<!-- <style>
	progress {
		display: block;
		width: 100%;
	}
</style> -->

```

##### Actions 
我






### 全栈框架使用
