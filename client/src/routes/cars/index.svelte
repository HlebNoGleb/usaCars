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
	import { onMount } from "svelte";

	let posts = [];
    let photos = [];

	onMount(async () => {
        const res = await fetch(`http://localhost:3001/posts/?cars=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
		})
        posts = await res.json();
        console.log(posts);
  	});
</script>

<h1>Машины</h1>
{#if posts.length > 0}
    <div class="row">
        {#each posts as post}
		  <div class="col-md-auto mt-2 mb-2">
            <div class="card">
				{#if post.imageDownloaded}
					<img src="http://localhost:3001/images/{post.id}/{post.id}.jpg" class="card-img-top" alt="...">
				{:else}
					<img src="http://placehold.jp/600x600.png" class="card-img-top" alt="...">
				{/if}
                <div class="card-body">
					{#if post.deletedOnSite.site1.status}
					<div class="alert alert-danger" role="alert">
					  Продано
					</div>
					{:else}
					<div class="alert alert-info" role="alert">
					  Не продано
					</div>
					{/if}
					<div class="mb-2">
						<h5 class="card-title">{post.vin}</h5>
						<p class="card-text">{post.title}</p>
					</div>
                	<a class="btn btn-primary" href="/cars/{post._id}">Перейти к машине</a>
                </div>
            </div>
        </div>
        {/each}
        <!-- <div class="col-md-auto mt-2 mb-2">
            <div class="card">
                <img src="http://placehold.jp/300x200.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Тестовая запчасть с фото</h5>
                <a class="btn btn-primary" href="{import.meta.env.VITE_BASE_URL}parts/1958680">Перейти к запчасти</a>
                <a class="btn btn-primary" href="/parts/{part.Article}">Перейти к запчасти</a>
                </div>
            </div>
        </div> -->
     </div>
{:else}
	<div class="alert alert-info" role="alert">
		Нет данных
	</div>
{/if}


