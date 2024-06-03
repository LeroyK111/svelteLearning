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


<button on:click={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
<!-- 太像jsx语法 -->
{#if count > 3}
	<p>{count} is greater than 10</p>
{/if}
