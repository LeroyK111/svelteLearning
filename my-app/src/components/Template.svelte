<script>
	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = colors[0];

  import Thing from './Thing.svelte'
	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	];
  function handleClick() {
		things = things.slice(1);
    console.log(things);
	}
</script>

<h1 style="color: {selected}">Pick a colour</h1>
<div>
  <!-- 迭代器：#each array as value, index, array-->
  <!-- 这里涉及到无障碍属性，一般都是结合css判断的 -->
  {#each colors as color, i}
		<button
			aria-current={selected === color}
      aria-label={color}
			style="background: {color}"
			on:click={() => selected = color}
		>{i + 1}</button>
	{/each}
</div>


<button style="width: 100px;heigth: 100px; border-radius: 0%;" on:click={handleClick}>
	Remove first thing
</button>

<!-- 这里失去了绑定，原有的dom继续存在，这里就发生了错位 -->
{#each things as thing}
	<Thing name={thing.name} />
{/each}
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}


<style>
		h1 {
		transition: color 0.2s;
	}

	div {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		max-width: 400px;
	}

  button {
    /* 宽高比 */
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: translate(-2px,-2px);
		filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
		transition: all 0.1s;
	}

	button[aria-current="true"] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
	}
</style>
