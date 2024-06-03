<script>
	// @ts-nocheck
	import Props from '../../components/Props.svelte';
	import Template from '../../components/Template.svelte';
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

<Template></Template>
