<script>
  import Markdown  from "../../components/Markdown.svelte"

	let name = 'word';

	let a = 1;
	let b = 2;

	let yes = false;

	let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	];
	const handleChange = (e) => {
		console.log(e.currentTarget);
	};
	let selected = 2;



	// 多选框
	let scoops = 1;
	let flavours = ['cookies and cream'];
	$: console.log(flavours);

	$: console.log(scoops);
</script>

<h1>数据绑定</h1>

<!-- 字符串绑定 -->
<input type="text" bind:value={name} />
<p>{name}</p>

<!-- 数字输入框 -->
<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>
<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>

<!-- 复选框 -->
<div>
	<label>
		<input type="checkbox" bind:checked={yes} />
		Yes! Send me regular email spam
	</label>
	{#if yes}
		<p>选中了</p>
	{:else}
		<p>未选中</p>
	{/if}
</div>

<!-- 多选框 -->
<div>
	<select bind:value={selected} on:change={handleChange}>
		{#each questions as question}
			<option value={question.id}>
				{question.text}
			</option>
		{/each}
	</select>
</div>

<!-- 单选框 -->
<div>
	{#each [1, 2, 3] as number}
		<label>
			<!-- 使用 -->
			<input type="radio" name="scoops" value={number} bind:group={scoops} />
			{number}
			{number === 1 ? 'scoop' : 'scoops'}
		</label>
	{/each}
</div>

<!-- 多选框 -->
<div>
	{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
		<label>
			<input type="checkbox" name="flavours" value={flavour} bind:group={flavours} />
			{flavour}
		</label>
	{/each}
</div>
<!-- 多选框 -->
<div>
  <select multiple bind:value={flavours}>
    {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
      <option>{flavour}</option>
    {/each}
  </select>
</div>



<Markdown></Markdown>