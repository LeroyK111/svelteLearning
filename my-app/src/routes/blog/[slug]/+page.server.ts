import { error } from '@sveltejs/kit';
import { posts } from '../data';

export function load(data: { params: any }) {
	// 居然是先传入到服务端脚本上。。。
	// console.log('路由传参各种参数', data);

	const { params } = data;

	const post = posts.find((post) => post.slug === params.slug);
	console.log(post);

	// 跳转404
	if (!post) throw error(404);

	return {
		// 这里我们就能接收到各种参数了
		post,
		params
	};
}
