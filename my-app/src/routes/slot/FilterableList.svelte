<script>
	export let data;
	export let field;

	let search = '';

	$: regex = search ? new RegExp(search, 'i') : null;
	// 过滤器
	$: matches = (item) => (regex ? regex.test(item[field]) : true);
</script>

<div class="list">
	<label>
		<!-- 过滤器 -->
		Filter: <input bind:value={search} />
	</label>

	<!-- 判断$$slots.header 是否存在，来决定插槽是否渲染。。。 -->
	{#if $$slots.header}
		<div class="header">
			<slot name="header"></slot>
		</div>
	{/if}

	<div class="content">
		{#each data.filter(matches) as item}
			<!-- 这里是插槽本身接收到了item参数，子传递给父，超越vue 和 react -->
			<slot {item} />
		{/each}
	</div>
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header {
		border-top: 1px solid var(--bg-2);
		padding: 0.2em 0;
	}

	.content {
		flex: 1;
		overflow: auto;
		padding-top: 0.5em;
		border-top: 1px solid var(--bg-2);
	}
</style>
