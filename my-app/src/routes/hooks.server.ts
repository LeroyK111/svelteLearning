
/**
 * @author Leroy
 * 自定义页面异常处理
*/



export function handleError({ event, error }: any) {
	console.error(error.stack);

	return {
		message: '找不到页面',
		code: '404'
	};
}
