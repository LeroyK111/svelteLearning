<script>
	import Board from './Board.svelte';
	import { getWinningLine } from './utils.js';

	let squares = Array(9).fill('');
	let next = 'x';

	$: winningLine = getWinningLine(squares);
</script>

<div class="container">
	<!-- 在条件渲染多个元素时，通常需要一个容器元素，但有时不希望引入额外的 DOM 节点， -->
	<!-- {#if isVisible}
		<svelte:fragment>
			<p>This is the first paragraph</p>
			<p>This is the second paragraph</p>
		</svelte:fragment>
	{/if} -->
	<Board size={3}>
		<!-- 动态插槽内容
在使用插槽时，有时需要插入多个元素作为一个插槽内容， -->
		<svelte:fragment slot="game">
			{#each squares as square, i}
				<button
					class="square"
					class:winning={winningLine?.includes(i)}
					disabled={square}
					on:click={() => {
						squares[i] = next;
						next = next === 'x' ? 'o' : 'x';
					}}
				>
					{square}
				</button>
			{/each}
		</svelte:fragment>

		<div slot="controls">
			<button
				on:click={() => {
					squares = Array(9).fill('');
					next = 'x';
				}}
			>
				Reset
			</button>
		</div>
	</Board>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		align-items: center;
		justify-content: center;
		height: 100%;
		margin: 0 auto;
	}

	.square,
	.square:disabled {
		background: white;
		border-radius: 0;
		color: #222;
		opacity: 1;
		font-size: 2em;
		padding: 0;
	}

	.winning {
		font-weight: bold;
	}

	.container:has(.winning) .square:not(.winning) {
		color: #ccc;
	}
</style>
