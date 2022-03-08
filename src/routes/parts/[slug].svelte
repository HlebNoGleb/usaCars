<script>
  import { page } from '$app/stores';
	let user = $page.params.slug;
  let photos = [];

  async function getPart() {
    // const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user}`);
    const res = await fetch(`${import.meta.env.VITE_API_URL}gettestpart/${user}/`);
    const json = await res.json();
    const partData = JSON.parse(json);

    if (res.ok) {
        photos = partData.PhotoNames != null ? partData.PhotoNames.split(',') : [];
        return partData;
    }
  }
</script>

{#await getPart()}
	<p>загрузка...</p>
{:then partData}
<h1>{partData.PartName} для {partData.AutoSeoName} - Артикул {partData.Article}</h1>
{#if photos.length > 0}
  <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      {#each photos as photo, i}
        {#if i == 0}
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="{i}" class="active" aria-current="true" aria-label="Slide {i}"></button>
        {:else}
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="{i}"  aria-label="Slide {i}"></button>
        {/if}
      {/each}
    </div>
    <div class="carousel-inner">
      {#each photos as photo, i}
        {#if i == 0}
          <div class="carousel-item active">
            <img src="{import.meta.env.VITE_IMAGE_URL}{partData.strId}/{photo.trim()}" class="d-block w-100" alt="{partData.Article}">
          </div>
          {:else}
          <div class="carousel-item ">
            <img src="{import.meta.env.VITE_IMAGE_URL}{partData.strId}/{photo.trim()}" class="d-block w-100" alt="{partData.Article}">
          </div>
          {/if}
      {/each}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
{:else}
<div class="card">
  <div class="card-body">
    Фотографии добавят позже
  </div>
</div>
{/if}

<p class="lead mt-2 mb-2">
  Цена - {partData.Price} USD
</p>


<ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Характеристики</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Доставка</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Оплата</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active testtable" id="home" role="tabpanel" aria-labelledby="home-tab">
    {@html partData.TableDescription}
  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
    информация о доставка
  </div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
    информация об оплате
  </div>
</div>



{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
