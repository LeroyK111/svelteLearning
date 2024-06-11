<script lang="ts">
  /**
   * @author Leroy
   * 404页面专用
  */
	import { page } from '$app/stores';

	interface rule extends App.Error {
		message: string;
		code: string;
	}
	
</script>

<h1>{$page.status}</h1>
<p>{$page.error.message}</p>
<p>error code: {$page.error.code}</p>
