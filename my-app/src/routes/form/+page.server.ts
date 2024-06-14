import * as db from '$lib/server/database.js';
// 最好留在同一页面上并提供错误指示，以便用户可以修复它。为此，我们可以使用 fail 函数从操作返回数据以及适当的 HTTP 状态代码：
import { fail } from '@sveltejs/kit';

/**
 * @author Leroy
 * chrome不再支持cookie了，不要再用了
 */
let id: any;

export function load({ cookies }: any) {
	// cookie 有无 useid
	id = cookies.get('userid');

	// if (!id) {
	// 	// 没有，我们就生成一个cookie
	// 	id = crypto.randomUUID();
	// 	// cookie
	// 	cookies.set('userid', id, { path: '/' });
	// }

	// console.log("设置的cookie", cookies.get('userid'));

	return {
		todos: db.getTodos(id)
	};
}

export const actions = {
	// default 只要当前页面中只有一个form表单时，才能使用

	// 多个表单中，不支持default
	// 这里创建了一个接口，用来捕获表单动作
	create: async (res: any) => {
		const data = await res.request.formData();

		// 我靠，永远获取不到cookie
		// let id = await res.cookies.get('userid');
		// 这里发生了一步创建新的todo对象
		// db.createTodo(res.cookies.get('userid'), data.get('description'));

		try {
			db.createTodo(id, data.get('description'));
		} catch (error) {
      // 发生异常则，将返回一个对象
			return fail(422, {
				description: data.get('description'),
				error: error.message
			});
		}
	},
	delete: async ({ cookies, request }) => {
		// 这里就可以接收到另一张表单的传参数
		const data = await request.formData();
		db.deleteTodo(id, data.get('id'));
	}
};
