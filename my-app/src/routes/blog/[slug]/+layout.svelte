<script>
	export let data;
	// 布局文件就只能依靠layout.server.ts 接收后段参数
	console.log("我不能接收", data);
</script>

<div class="layout">
	<main>
		<slot />
	</main>
</div>

<style>
	@media (min-width: 640px) {
		.layout {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr 16em;
		}
	}
</style>
