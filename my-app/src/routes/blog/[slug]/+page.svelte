<script>
  /**
   * @author Leroy
   * 动态路由传递，通过【文件夹】的形式
   * 一个网址区段中可以显示多个路由参数，只要它们至少由一个静态字符分隔即可： foo/[bar]x[baz] 是有效的路由，其中 [bar] 和 [baz] 是动态参数。
  */

  export let data;
  console.log(11111);
</script>

<h1>动态路由{data.params.slug}</h1>
<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
