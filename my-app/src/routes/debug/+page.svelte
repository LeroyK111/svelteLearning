<script>
	let user = {
		firstname: 'Ada',
		lastname: 'Lovelace'
	};
</script>

<label>
	<input bind:value={user.firstname} />
	first name
</label>

<label>
	<input bind:value={user.lastname} />
	last name
</label>

<!-- 会对user对象触发单步调试，需要打开devtools -->
{@debug user}

<h1>Hello {user.firstname}!</h1>
