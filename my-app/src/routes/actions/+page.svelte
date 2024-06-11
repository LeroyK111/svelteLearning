<script context="module">
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
</script>



<div class="container">
	<!-- 画布大小 -->
	<Canvas color={selected} {size} />

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
