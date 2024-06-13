<script lang="ts" context="module">
	// 模块
	console.log('抽象模块');
	const test = () => {
		console.log('测试子script');
	};
	export { test };
</script>

<script lang="ts">
	/**
	 * 同一文件 svelte 下：模块也会被执行，并且也可以被其他script中函数调用。
	 * 不同svelte下，跨文件调用script模块中函数，则需要export 暴露
	 */
	test();
	let name = 'nihao';
</script>

<!-- 支持pub等模块语法，但vite下不支持 -->
<template lang="pug">
  h1 #{name} 111
</template>

<h1>{name}</h1>

<style lang="scss">
	/* style 只支持一个style标签，默认定义域就是当前文件。除非你加:global */
</style>
