<script>
	import { count, time, elapsed, countFake, customCount } from '../../store/stores';

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

<div style="background-color: skyblue;">
	<h1>The count is {$customCount}</h1>
	<button on:click={customCount.increment}>+</button>
	<button on:click={customCount.decrement}>-</button>
	<button on:click={customCount.reset}>reset</button>
</div>


<input type="range" max="100" min="0" bind:value={$count} />
<button on:click={() => ($count += 10)}> Add exclamation mark! </button>
