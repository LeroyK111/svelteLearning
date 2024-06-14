/**
 * @author Leroy
 * 从ui回调数据库
 */
// @ts-nocheck

const db = new Map();

export function getTodos(userid) {
	if (!db.get(userid)) {
		// 如果没有id存在，则我们放入一个默认id
		db.set(userid, [
			{
				id: crypto.randomUUID(),
				description: 'Learn SvelteKit',
				done: false
			}
		]);
	}

	// 返回查找结果就好
	return db.get(userid);
}

let sw = true;
let todos: any;
export function createTodo(userid, description) {
	/**
	 * @author Leroy
	 * 传入id 和 内容
	 * 根据id查找对象，放入
	 */
	// if (todos.find((todo) => todo.description === description)) {
	// 	// 表单验证
	// 	throw new Error('todos must be unique');
	// }


	if (sw) {
    todos = db.get(userid);
    sw = false
  }

	// if (todos.find((todo) => todo.description === description)) {
	// 	// 表单验证
	// 	throw new Error('todos must be unique');
	// }

	
	todos.push({
		id: crypto.randomUUID(),
		description,
		done: false
	});
}

export function deleteTodo(userid, todoid) {
	const todos = db.get(userid);
	const index = todos.findIndex((todo) => todo.id === todoid);

	if (index !== -1) {
		todos.splice(index, 1);
	}
}
