<script>
	let html = '<p>Write some text!</p>';
</script>

<!-- 直接绑定dom，取出字符串 -->
<div bind:innerHTML={html} contenteditable></div>

<pre>{html}</pre>

<style>
  /* 索引 */
	[contenteditable] {
		padding: 0.5em;
		border: 1px solid #eee;
		border-radius: 4px;
	}
</style>
