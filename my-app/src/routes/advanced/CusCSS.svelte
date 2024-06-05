<script lang="ts">
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	let visible = true;

	function spin(node: HTMLElement, { delay, duration }: any) {
    // 获取传参
		console.log(node, duration);

		return {
			delay,
			duration,
			css: (t: number) => {
				// eased 会跟随duration 进行变换
				const eased = elasticOut(t);
				// 返回的css属性
				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 * (1 - t))}%,
						${Math.min(50, 500 * (1 - t))}%
					);`;
			}
		};
	}
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<!-- in:spin={{ duration: 8000 }} 还可以传参 -->
	<div class="centered" in:spin={{ delay: 0, duration: 8000 }} out:fade>
		<span>transitions!</span>
	</div>
{/if}

<style>
	.centered {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	span {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 4em;
	}
</style>
