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
