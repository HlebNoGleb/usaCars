<svelte:head>
	<title>Home</title>
</svelte:head>

<style>
	.card{
		max-width: 300px;
		height: 100%;
	}
	.card-body{
		justify-content: space-between;
		flex-direction: column;
		display: flex;
		/* align-items: flex-start; */
		height: 100%;
	}
</style>

<script>
// @ts-nocheck

	let vin;
	let result = null;

	async function checkVin() {
		const res = await fetch(`http://localhost:3001/posts/vin/${vin}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
		})
        const json = await res.json();
		result = json;
	}

</script>

<h1>Удалим ваш вин за 200$</h1>
<form class="mb-3" onsubmit="return false">
	<div class="mb-3">
	  <label for="vinInput" class="form-label">Введите VIN номер вашего авто</label>
	  <input type="text" class="form-control" id="vinInput" aria-describedby="vinHelp" bind:value={vin}>
	  <div id="vinHelp" class="form-text">Пример: 5NPE24AF6GH306710</div>
	</div>
	<button class="btn btn-primary" on:click={checkVin}>Проверить</button>
</form>


{#if result == null }
	<div class="alert alert-info" role="alert">
		Введите VIN номер вашего авто
	</div>
{:else if result.length > 0}
<div class="row">
	{#each result as car}
	  <div class="col-md-auto mt-2 mb-2">
		<div class="card">
			{#if car.imageDownloaded}
				<img src="http://localhost:3001/images/{car.id}/{car.id}.jpg" class="card-img-top" alt="...">
			{:else}
				<img src="http://placehold.jp/600x600.png" class="card-img-top" alt="...">
			{/if}
			<div class="card-body">
				<div class="mb-2">
					<h5 class="card-title">{car.vin}</h5>
					<p class="card-text">{car.title}</p>
				</div>
				<a class="btn btn-primary" href="/cars/{car._id}">Перейти к машине</a>
			</div>
		</div>
	</div>
	{/each}
</div>
{:else}
	<div class="alert alert-info" role="alert">
		Нет данных
	</div>
{/if}

