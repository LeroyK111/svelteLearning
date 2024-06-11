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

#### Actions 
自定义事件。
##### use的用法
```vue
<script context="module" lang="ts">
	/**
	 * @author Leroy
	 * 同一个模块中使用多个script标签
	 */
	console.log(111);
	const test = (msg: number | string = 222) => {
		console.log(msg);
	};

	// 如果其他svelte想要调用则需要单独暴露
	export { test };
</script>

<script lang="ts">
	/**
	 * @author Leroy
	 * 使用canvas画布，构建图层
	 */
	import Canvas from './Canvas.svelte';
	import { trapFocus } from './actions';

	// 画笔颜色种类
	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];
	// 默认选中red
	let selected = colors[0];
	// 画笔粗细
	let size = 10;
	// 菜单展示
	let showMenu = true;

	// js分块
	test();

	// 获取 canvas 组件级别的对象，然后调用暴露的方法 
	let canvas: any;

</script>



<div class="container">
	<!-- 画布大小 -->
	<Canvas bind:this={canvas} color={selected} {size} />

	<!-- 菜单dom -->
	{#if showMenu}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- 遮罩层, 事件绑定的定义域 -->
		<div
			class="modal-background"
			on:click|self={() => (showMenu = false)}
			on:keydown={(e) => {
				if (e.key === 'Escape') showMenu = false;
			}}
		>
			<!-- 在 Svelte 中，use: 指令用于将一个动作（action）应用到一个元素上。动作是一种用于封装与 DOM 元素交互逻辑的机制，可以在元素被创建时执行某些操作，并在元素被移除时进行清理。它们通常用于处理需要直接操作 DOM 的场景，例如设置焦点、创建图表、注册事件等。 -->
			<div class="menu" use:trapFocus>
				<div class="colors">
					{#each colors as color}
						<button
							class="color"
							aria-label={color}
							aria-current={selected === color}
							style="--color: {color}"
							on:click={() => {
								selected = color;
							}}
						></button>
					{/each}
				</div>

				<label>
					small
					<input type="range" bind:value={size} min="1" max="50" />
					large
				</label>
			</div>
		</div>
	{/if}

	<!-- 菜单按钮 -->
	<div class="controls">
		<button class="show-menu" on:click={() => (showMenu = !showMenu)}>
			{showMenu ? 'close' : 'menu'}
		</button>
		<button class="show-menu" on:click={() => canvas.clear()}>
			clear
		</button>
	</div>
</div>

<style lang="scss">
	.container {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		.controls {
			position: absolute;
			left: 0;
			top: 0;
			padding: 1em;
		}
	}

	.show-menu {
		width: 5em;
		height: 3em;
		background-color: skyblue;
		border: none;
		color: #fff;
		font-weight: bold;
	}

	.modal-background {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(20px);
	}

	.menu {
		position: relative;
		background: var(--bg-2);
		width: calc(100% - 2em);
		max-width: 28em;
		padding: 1em 1em 0.5em 1em;
		border-radius: 1em;
		box-sizing: border-box;
		user-select: none;
	}

	.colors {
		display: grid;
		align-items: center;
		grid-template-columns: repeat(9, 1fr);
		grid-gap: 0.5em;
	}

	.color {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: none;
		filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
		transition: all 0.1s;
	}

	.color[aria-current='true'] {
		transform: translate(1px, 1px);
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2);
	}

	.menu label {
		display: flex;
		width: 100%;
		margin: 1em 0 0 0;
	}

	.menu input {
		flex: 1;
	}
</style>

```
```vue

<script lang="ts">
	import { onMount } from 'svelte';
	import { test } from './+page.svelte';

	test('外来模块用法');

	// 接受参数
	export let color;
	export let size;

	let canvas: HTMLCanvasElement;
	let context: any;
	let previous: any;

	function get_coords(e) {
		// 获取鼠标的绝对坐标
		const { clientX, clientY } = e;
		// console.log('鼠标绝对坐标系', Math.trunc(clientX), Math.trunc(clientY));

		// 画板的绝对坐标
		const { left, top } = canvas.getBoundingClientRect();
		// 求出鼠标在画板上的相对坐标系
		const x = clientX - left;
		const y = clientY - top;
		return { x, y };
	}

	export function clear() {
		// 清除画布
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	onMount(() => {
		// 获取dom的2d对象
		context = canvas.getContext('2d');
		function resize() {
			// 直接设置canvas大小为整个视口界面
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		// 监听视口变换，canvas直接跟随变换
		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas
	bind:this={canvas}
	on:pointerdown={(e) => {
		console.log('鼠标点击');

		// 鼠标点下事件
		const coords = get_coords(e);
		// 填充颜色
		context.fillStyle = color;
		// 开始绘制
		context.beginPath();
		// 绘制圆心
		context.arc(coords.x, coords.y, size / 2, 0, 2 * Math.PI);
		// 填充
		context.fill();

		// 记录一下颜色
		previous = coords;
	}}
	on:pointerleave={() => {
		// 鼠标离开
		previous = null;
		console.log('鼠标离开');
	}}
	on:pointermove={(e) => {
		// 鼠标移动事件
		const coords = get_coords(e);
		console.log(e.buttons);

		if (e.buttons === 1) {
			// 移动并且 鼠标左键点下
			// 阻止事件传递
			e.preventDefault();
			// 画笔开始作画
			// 绘制线条颜色
			context.strokeStyle = color;
			// 线条粗细
			context.lineWidth = size;
			// 线条末端为圆形
			context.lineCap = 'round';
			// 开始一条新路径
			context.beginPath();
			// 将绘制的起点移动到坐标
			context.moveTo(previous.x, previous.y);
			// 从当前点绘制一条直线到坐标
			context.lineTo(coords.x, coords.y);
			// 根据当前的描边样式绘制路径
			context.stroke();
		}
		previous = coords;
	}}
></canvas>

<!-- 鼠标指引表示 -->
{#if previous}
	<div
		class="preview"
		style="--color: {color}; --size: {size}px; --x: {previous.x}px; --y: {previous.y}px"
	></div>
{/if}

<style>
	canvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.preview {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		height: var(--size);
		transform: translate(-50%, -50%);
		background: var(--color);
		border-radius: 50%;
		opacity: 0.5;
		pointer-events: none;
	}
</style>

```
```ts
/**
 * @author Leroy
 * 借助use：绑定到dom上
 */

export function trapFocus(node: HTMLDivElement) {
	// 是一个只读属性，它返回当前文档中获得焦点的元素
	const previous = document.activeElement as HTMLElement;

	console.log('use: 绑定的dom节点', node);

	function focusable(): [HTMLElement] {
		/**
		 * 这个函数 focusable 用于获取指定节点（node）中所有可以获得焦点的元素，并返回它们的数组。
		 *
		 *
		 */
		return Array.from(
			// 炸掉所有符合button标签, href属性等内容的dom元素
			node.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);
	}

	function handleKeydown(event: { key: string; shiftKey: any; preventDefault: () => void }) {
		/**
		 * 按下tab后的选择
		 *
		 */

		if (event.key !== 'Tab') return;
		// 当前被选中的dom元素
		const current = document.activeElement;
		// 获取菜单中的所有元素
		const elements = focusable();
		console.log(elements);
		// 获取首尾两个元素
		const first = elements.at(0) as HTMLElement;
		const last = elements.at(-1) as HTMLElement;

		console.log(event.shiftKey);
		
		// 让 tab 的聚焦循环起来
		if (event.shiftKey && current === first) {
			last.focus();
			event.preventDefault();
		}

		if (!event.shiftKey && current === last) {
			first.focus();
			event.preventDefault();
		}
	}

	// 默认聚焦第一个选型
	focusable()[0]?.focus();

	// 给整个菜单node绑定一个键盘事件
	node.addEventListener('keydown', handleKeydown);

	return {
		// 事件销毁
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
			previous.focus();
		}
	};
}

```


##### update的副作用用法
update 回调：当 action 的参数发生变化时，Svelte 会调用 update 回调。你可以在这里更新工具提示的属性。
destroy 回调：当组件销毁时，Svelte 会调用 destroy 回调，用于清理工具提示。
```vue
<script lang="ts">
	import tippy, { type MultipleTargets, type Props } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/material.css';

	let content = 'Hello!';

	function tooltip(node: MultipleTargets | HTMLButtonElement, options: Partial<Props> | undefined) {
    console.log('传递的参数', options);

    // 浮动事件
		const tooltip = tippy(node, options);

		return {
      // update 回调
			update(options: any) {
				tooltip.setProps(options);
			},
			destroy() {
				tooltip.destroy();
			}
		};
	}
</script>

<input bind:value={content} />

<button use:tooltip={{ content, theme: 'material' }}> Hover me </button>
```

#### 高级绑定
`svelteLearning/my-app/src/routes/advBing/+page.svelte`
##### dom对象绑定
```vue
<script>
	let html = '<p>Write some text!</p>';
</script>

<!-- 直接绑定dom，取出字符串 -->
<div bind:innerHTML={html} contenteditable></div>

<pre>{html}</pre>

<style>
  /* 索引 */
	[contenteditable] {
		padding: 0.5em;
		border: 1px solid #eee;
		border-radius: 4px;
	}
</style>
```
##### #each绑定
```vue
<script>
	let todos = [
		{ done: false, text: 'finish Svelte tutorial' },
		{ done: false, text: 'build an app' },
		{ done: false, text: 'world domination' }
	];

	function add() {
    // 加入新参数
		todos = todos.concat({
			done: false,
			text: ''
		});
	}

	function clear() {
    // 过滤被选中的
		todos = todos.filter((t) => !t.done);
	}

  // 计算器
	$: remaining = todos.filter((t) => !t.done).length;
</script>

<div class="centered">
	<h1>todos</h1>

	<ul class="todos">
		{#each todos as todo}
			<li class:done={todo.done}>
        <!-- 直接绑定两个事件 -->
				<input type="checkbox" bind:checked={todo.done} />
				<input type="text" placeholder="What needs to be done?" bind:value={todo.text} />
			</li>
		{/each}
	</ul>

	<p>{remaining} remaining</p>

	<button on:click={add}> Add new </button>

	<button on:click={clear}> Clear completed </button>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	.done {
		opacity: 0.4;
	}

	li {
		display: flex;
	}

	input[type='text'] {
		flex: 1;
		padding: 0.5em;
		margin: -0.2em 0;
		border: none;
	}
</style>
```
##### media 媒体绑定
```vue
<script>
	import AudioPlayer from './AudioPlayer.svelte';
	export const tracks = [
		{
			// https://musopen.org/music/9862-the-blue-danube-op-314/
			src: 'https://learn.svelte.dev/assets/media/music/strauss.mp3',
			title: 'The Blue Danube Waltz',
			artist: 'Johann Strauss'
		},

		{
			// https://musopen.org/music/43775-the-planets-op-32/
			src: 'https://learn.svelte.dev/assets/media/music/holst.mp3',
			title: 'Mars, the Bringer of War',
			artist: 'Gustav Holst'
		},

		{
			// https://musopen.org/music/8010-3-gymnopedies/
			src: 'https://learn.svelte.dev/assets/media/music/satie.mp3',
			title: 'Gymnopédie no. 1',
			artist: 'Erik Satie'
		},

		{
			// https://musopen.org/music/43683-requiem-in-d-minor-k-626/
			src: 'https://learn.svelte.dev/assets/media/music/mozart.mp3',
			title: 'Requiem in D minor, K. 626 - III. Sequence - Lacrymosa',
			artist: 'Wolfgang Amadeus Mozart'
		}
	];


</script>

<div class="centered">
	{#each tracks as track}
		<AudioPlayer {...track} />
	{/each}
</div>

<style>
	.centered {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		gap: 0.5em;
		max-width: 40em;
		margin: 0 auto;
	}
</style>
```
##### 元素事件直接绑定
```vue
<script lang="ts">
	let w: number;
	let h: number;
	let size = 42;
	let text = 'edit this text';
</script>

<label>
	<input type="range" bind:value={size} min="10" max="100" />
	font size ({size}px)
</label>

<!-- 自己获取dom元素大小，然后修改w和h的值 -->
<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px" contenteditable>{text}</span>
	<span class="size">{w} x {h} px</span>
</div>

<style>
	div {
		position: relative;
		display: inline-block;
		padding: 0.5rem;
		background: hsla(15, 100%, 50%, 0.1);
		border: 1px solid hsl(15, 100%, 50%);
	}

	.size {
		position: absolute;
		right: -1px;
		bottom: -1.4em;
		line-height: 1;
		background: hsl(15, 100%, 50%);
		color: white;
		padding: 0.2em 0.5em;
		white-space: pre;
	}
</style>
```
##### 组件传参绑定

数据的双向绑定+事件的双向绑定

```vue
<script lang="ts">
	import AdvancedBindings from '../../components/AdvancedBindings.svelte';
	import AdvancedEach from '../../components/AdvancedEach.svelte';
	import AdvancedMdia from '../../components/AdvancedMdia.svelte';
	import AdvancedDim from '../../components/AdvancedDim.svelte';
  import Keypad from './Keypad.svelte';


	let pin: any;
	$: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin';

  $: {
		console.log("pin值被改变了:", pin);
	}

	function handleSubmit() {
		alert(`submitted ${pin}`);
    
	}
</script>

<!-- html绑定 -->
<AdvancedBindings></AdvancedBindings>
<!-- 循环绑定 -->
<AdvancedEach></AdvancedEach>
<!-- 这个牛逼，媒体绑定 -->
<AdvancedMdia></AdvancedMdia>
<!-- 测量包装元素 -->
<AdvancedDim></AdvancedDim>
<!-- 组件传参绑定 -->
<h1 style="opacity: {pin ? 1 : 0.4}">
	{view}
</h1>
<!-- 非常不推荐这么做，不使用on:submit，使用$props -->
<Keypad bind:value={pin} on:submit={handleSubmit} />

```

#### css样式

##### 简写写法
```vue
<script>
	let flipped = false;
</script>

<div class="container">
	Flip the card
	<!-- 		class:flipped={flipped} 此指令的意思是“只要 flipped 真实，就添加 flipped 类”。 -->
	<!-- 同名简写方式  -->
	<button class="card" class:flipped on:click={() => (flipped = !flipped)}>
		<div class="front">
			<span class="symbol">♠</span>
		</div>
		<div class="back">
			<div class="pattern"></div>
		</div>
	</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		height: 100%;
		align-items: center;
		justify-content: center;
		perspective: 100vh;
	}

	.card {
		position: relative;
		aspect-ratio: 2.5 / 3.5;
		font-size: min(1vh, 0.25rem);
		height: 80em;
		background: var(--bg-1);
		border-radius: 2em;
		transform: rotateY(180deg);
		transition: transform 0.4s;
		transform-style: preserve-3d;
		padding: 0;
		user-select: none;
		cursor: pointer;
	}

	.card.flipped {
		transform: rotateY(0);
	}

	.front,
	.back {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		border: 1px solid var(--fg-2);
		box-sizing: border-box;
		padding: 2em;
	}

	.front {
		background:
			url(../../assets/svelte-logo.svg) no-repeat 5em 5em,
			url(../../assets/svelte-logo.svg) no-repeat calc(100% - 5em) calc(100% - 5em);
		background-size:
			8em 8em,
			8em 8em;
	}

	.back {
		transform: rotateY(180deg);
	}

	.symbol {
		font-size: 30em;
		color: var(--fg-1);
	}

	.pattern {
		width: 100%;
		height: 100%;
		background-color: var(--bg-2);
		/* pattern from https://projects.verou.me/css3patterns/#marrakesh */
		background-image: radial-gradient(var(--bg-3) 0.9em, transparent 1em),
			repeating-radial-gradient(
				var(--bg-3) 0,
				var(--bg-3) 0.4em,
				transparent 0.5em,
				transparent 2em,
				var(--bg-3) 2.1em,
				var(--bg-3) 2.5em,
				transparent 2.6em,
				transparent 5em
			);
		background-size:
			3em 3em,
			9em 9em;
		background-position: 0 0;
		border-radius: 1em;
	}
</style>
```

##### 混合写法
```vue

<!-- 写法一 -->
<button
	class="card"
	style="transform: {flipped ? 'rotateY(0)' : ''}; --bg-1: palegoldenrod; --bg-2: black; --bg-3: goldenrod"
	on:click={() => flipped = !flipped}
>

<!-- 写法二 -->
<button
	class="card"
	style:transform={flipped ? 'rotateY(0)' : ''}
	style:--bg-1="palegoldenrod"
	style:--bg-2="black"
	style:--bg-3="goldenrod"
	on:click={() => flipped = !flipped}
>

<!-- 支持style 和 class 混合写法 -->

```

##### 穿透写法
```vue
<script>
	import Son from './Son.svelte';
</script>

<!-- 支持style 穿透 -->
<div class="boxes">
	<Son --color="red" />
	<Son --color="green" />
	<Son --color="blue" />
</div>

```

```vue
<div class="box"></div>

<style>
	.box {
		width: 5em;
		height: 5em;
		border-radius: 0.5em;
		margin: 0 0 1em 0;
		background-color: var(--color, #ddd);
	}
</style>
```


#### 插槽slot




### kit全栈框架使用
