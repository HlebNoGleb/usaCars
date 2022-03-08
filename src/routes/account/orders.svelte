<script>
    import { onMount } from "svelte";
	let orders = [];


    onMount(async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}getorders/`);
        let data = await res.json();
        orders = data.orders;
  });
</script>

<h1>Заказы</h1>
{#if orders.length > 0}
<div class="list-group">
    {#each orders as order}
    <div class="list-group-item list-group-item-action mt-2 mb-2" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{order.pickupName}</h5>
          <small>{order.date}</small>
        </div>
        <p class="mb-1">{order.paymentMethod}</p>
        <small>{order.status}</small>
      </div>
     {/each}
</div>
{:else}
<!-- this block renders when users.length === 0 -->
<p>loading...</p>
{/if}
