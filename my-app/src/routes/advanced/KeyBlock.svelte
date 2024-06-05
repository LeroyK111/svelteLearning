<script lang="ts">
	import { onMount } from 'svelte';

	function typewriter(node: any, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t: number) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

	const messages = [
		'reticulating splines...',
		'generating witty dialog...',
		'swapping time and space...',
		'640K ought to be enough for anybody',
		'checking the gravitational constant in your locale...',
		'keep calm and npm install',
		'counting backwards from Infinity',
		"I'm sorry Dave, I can't do that.",
		'adjusting flux capacitor...',
		'constructing additional pylons...',
		'rm -rf /'
	];

	let i = -1;

	onMount(() => {

		const interval = setInterval(() => {
			i += 1;
			i %= messages.length;
		}, 2500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<h1>loading...</h1>

<!-- 可以看到这里没有过度 -->
<p in:typewriter={{ speed: 10 }}>
	{messages[i] || ''}
</p>

<!-- 这里我们使用 #key K帧过渡 -->
{#key i}
	<p in:typewriter={{ speed: 10 }}>
		{messages[i] || ''}
	</p>
{/key}


