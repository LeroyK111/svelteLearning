import { posts } from './data';
export function load() {
	/**
	 * @author Leroy
	 * - `+page.server.js` 中的 `load` 函数获取数据，并返回一个对象。
    - 返回的对象中的数据会被传递到 `+page.svelte` 文件中，作为其 `props`（属性）之一。
	*/
	return {

		summaries: posts.map((post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}
