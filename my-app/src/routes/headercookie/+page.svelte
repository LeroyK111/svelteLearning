<script lang="ts">
  // 跨目录调用脚本
  import { publics } from "$lib/index.ts"
  publics()

  // 这个居然没用
  // let { data } = $props();


  // 只有这个有用
  export let data;
  

  console.log(data);


</script>

<h1>11111</h1>