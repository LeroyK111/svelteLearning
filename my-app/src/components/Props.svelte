<script>
  // 这里接参数，居然用export，暴露语法
	// export let answer;
  // 如果组件传参涉及到
	export let answer = "默认值";
	export let website;
</script>

<p>The answer is {answer}</p>
<p>{website}</p>

