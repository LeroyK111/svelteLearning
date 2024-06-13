<script lang="ts">
	// import Card from './Card.svelte';

	import FilterableList from './FilterableList.svelte';
	import { colors } from './colors.js';

	

</script>

<!-- <main> -->
<!-- <Card> -->
<!-- 插槽传递 -->
<!-- <span>Patrick BATEMAN</span>
		<span>Vice President</span>
	</Card>
</main> -->


<!-- <Card>
	<span>Patrick BATEMAN 测试</span>
	<span>Vice President 测试</span>

	<span slot="telephone">telephone具名</span>
	<span slot="company">
		company具名
		<small>Mergers and Aquisitions</small>
	</span>
	<span slot="address">address具名</span
	>
</Card> -->

<!-- 如果不传递任何插槽，则我们可以为Card组件添加默认值 -->
<!-- <Card /> -->


<!-- 使用以下 let: 可以接收到插槽传递回传的内容 -->
<FilterableList
	data={colors}
	field="name"
	let:item={row}
>
	<!-- <header slot="header" class="row" style="border: 1px solid black;">
		<span class="color"></span>
		<span class="name">name</span>
		<span class="hex">hex</span>
		<span class="rgb">rgb</span>
		<span class="hsl">hsl</span>
	</header> -->
	


	<div class="row">
		<span class="color" style="background-color: {row.hex}"></span>
		<span class="name">{row.name}</span>
		<span class="hex">{row.hex}</span>
		<span class="rgb">{row.rgb}</span>
		<span class="hsl">{row.hsl}</span>
	</div>
</FilterableList>




<!-- <style>
	main {
		display: grid;
		place-items: center;
		height: 100%;
		background: url(../../assets/svelte-logo.svg);
	}
</style> -->



<style>
	.row {
		display: grid;
		align-items: center;
		grid-template-columns: 2em 4fr 3fr;
		gap: 1em;
		padding: 0.1em;
		background: var(--bg-1);
		border-radius: 0.2em;
	}

	header {
		font-weight: bold;
	}

	.row:not(header):hover {
		background: var(--bg-2);
	}

	.color {
		aspect-ratio: 1;
		height: 100%;
		border-radius: 0.1em;
	}

	.rgb, .hsl {
		display: none;
	}

	@media (min-width: 40rem) {
		.row {
			grid-template-columns: 2em 4fr 3fr 3fr;
		}

		.rgb {
			display: block;
		}
	}

	@media (min-width: 60rem) {
		.row {
			grid-template-columns: 2em 4fr 3fr 3fr 3fr;
		}

		.hsl {
			display: block;
		}
	}
</style>