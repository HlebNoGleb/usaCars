<style>
  .img-container{
    max-width: 400px;
  }
</style>

<script>
// @ts-nocheck
import { getStores, navigating, page, session, updated } from '$app/stores';
    let car = $page.params.slug;
    let carData = getPart();


    async function getPart() {
      // const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user}`);
      const res = await fetch(`http://localhost:3001/posts/${car}/`);
      const json = await res.json();

      if (res.ok) {
        return json;
      }
    }

    async function buyVIN(status){
      const res = await fetch(`http://localhost:3001/posts/${car}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              site: 'site1',
              status: status
            }),
		  })
      const json = await res.json();
      if (res.ok) {
          carData = json;
          console.log(carData);
          return carData;
      }
      // console.log(json);

    }


  </script>
  {#await carData}
      <p>загрузка...</p>
  {:then carData}
  <h1>Информация об авто с VIN: {carData.vin}</h1>
  {#if carData.deletedOnSite.site1.status}
    <div class="alert alert-danger" role="alert">
      Продано
    </div>
    {:else}
    <div class="alert alert-info" role="alert">
      Не продано
    </div>
    {/if}
  <div class="img-container">
    {#if carData.imageDownloaded}
      <img src="http://localhost:3001/images/{carData.id}/{carData.id}.jpg" class="card-img-top" alt="...">
    {:else}
      <img src="http://placehold.jp/600x600.png" class="card-img-top" alt="...">
    {/if}
  </div>
    <p>{carData.title}</p>
    <button class="btn btn-primary" on:click={() => buyVIN(true)}>Купить</button>
    <button class="btn btn-primary" on:click={() => buyVIN(false)}>Продать</button>

  {:catch error}
      <p style="color: red">{error.message}</p>
  {/await}
