<script>
    import { onMount } from "svelte";
	let parts = [];

    onMount(async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}gettestparts/`);
        parts = await res.json();
        console.log(parts);
  });

    async function partsPaging (pg) {
		const res = await fetch(`${import.meta.env.VITE_API_URL}gettestparts?pg=${pg}`);
        parts = await res.json();
        console.log(parts);
	}
</script>

<h1>Запчасти</h1>
{#if parts.length > 0}
    <div class="row">
        {#each parts as part}
        <div class="col-md-auto mt-2 mb-2">
            <div class="card">
                {#if part.PhotoNames}
                    <img src="" class="card-img-top" alt="...">
                {:else}
                    <img src="http://placehold.jp/300x200.png" class="card-img-top" alt="...">
                {/if}
                <div class="card-body">
                <h5 class="card-title">{part.PartName}</h5>
                <p class="card-text">для {part.AutoSeoName}</p>
                <p class="card-text">Артикул {part.Article}</p>
                <a class="btn btn-primary" href="{import.meta.env.VITE_BASE_URL}parts/{part.Article}">Перейти к запчасти</a>
                <!-- <a class="btn btn-primary" href="/parts/{part.Article}">Перейти к запчасти</a> -->
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
     <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
              <button class="page-link" on:click={() => partsPaging(1)}>1</button>
            </li>
          <li class="page-item">
              <button class="page-link" on:click={() => partsPaging(2)}>2</button>
            </li>
          <li class="page-item">
              <button class="page-link" on:click={() => partsPaging(3)}>3</button>
            </li>
        </ul>
      </nav>
{:else}
<!-- this block renders when users.length === 0 -->
<p>загрузка запчастей....</p>
{/if}

<style>
    .card{
        width: 18em;
    }

    .card-title, .card-text{
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        height: 1.4em;
        white-space: nowrap;
    }

</style>