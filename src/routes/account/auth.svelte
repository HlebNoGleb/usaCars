<script>
	let login = "+375291053528";
	let password ="1223334444";
    let selected;
    let сountryList = [
		{ id: 1, text: `Беларусь` },
		{ id: 2, text: `Россия` },
		{ id: 3, text: `Казахстан` }
	];


	let result = null

	async function loginRegister () {
		const res = await fetch(`${import.meta.env.VITE_API_URL}loginregister/`, {
            method: 'POST',
            async: 'async',
            body: JSON.stringify({ 'Login': login, 'Password': password, 'Country': selected.id, 'AutoLoginField': true }),
		})

		const json = await res.json();
		result = JSON.stringify(json);
        console.log(result);
	}

	async function unlogin () {
		const res = await fetch(`${import.meta.env.VITE_API_URL}unlogin/`);
		result = await res.text();
		console.log(result);
	}
</script>

<div class="mt-3">
	<div class="mb-3">
		<label for="country" class="form-label">Страна</label>
		<select class="form-select" id="country" aria-label="Default select example" bind:value={selected}>
			{#each сountryList as сountry}
				<option value={сountry}>
					{сountry.text}
				</option>
			{/each}
		</select>
	</div>
	<div class="mb-3">
		<label for="login" class="form-label">Телефон</label>
		<input class="form-control" id="login" aria-describedby="emailHelp" bind:value={login} />
		<div id="emailHelp" class="form-text">Введите ваш телефон</div>
	</div>
	<div class="mb-3">
		<label for="password" class="form-label">Пароль</label>
		<input type="password" class="form-control" id="password" bind:value={password}>
	</div>
	<button type="submit" class="btn btn-success" on:click={loginRegister}>Войти/Зарегестрироваться</button>
	<button type="submit" class="btn btn-danger" on:click={unlogin}>Выйти</button>
</div>

<div>
	<p>{result}</p>
</div>