<script lang="ts">
  // 需要大写
  import Nested from '../components/Nested.svelte';
  
	let name = 'hello world';
	let src = '/src/assets/mylog.png';

  // 支持插入 原生js
  let string = `<strong>粗体</strong>`;
  // string = "<a href='www.baidu.com'>点我跳转</a>";


  // 响应式绑定
  let count = 0;
  function increment(e: PointerEvent) {
    count++;
    console.log(e.target, count);
  }
  // 计算属性
  $: doubled = count * 2;
  // 高级监听器
  $: console.log(`the count is ${doubled}`);

  
</script>



<!-- 模板语法{} -->
<h1>{name}</h1>
<!-- 支持jsx类似的语法 -->
<div>{name.toUpperCase()}</div>
<!-- 大括号支持属性值 -->
<img {src} alt="A man dances." />
<!-- 支持简写 -->
<img {src} alt="A man dances." />
<!-- 组件引入 -->
<Nested></Nested>
<!-- @html关键字支持引入html原始语法，容易造成xss攻击 -->
<p>{@html string}</p>
<!-- 响应式 -->
<button on:click={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
<p>计算值 {doubled}</p>

<style>
  h1 {
    color: red;
  }
</style>