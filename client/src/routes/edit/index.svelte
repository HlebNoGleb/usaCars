<script>
    import { onMount } from "svelte";

    let name = "Name";
	let fname ="Fname";
	let result = null;

    let subscribers = [];

    let msg = null;

    async function getUsers(){
        const res = await fetch(`http://localhost:3001/subscribers/`);
        subscribers = await res.json();
    }


	async function addUser () {
		const res = await fetch(`http://localhost:3001/subscribers/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ 'name': name, 'fname': fname}),
		})

		const json = await res.json();
		result = JSON.stringify(json);
        getUsers();
        showToast();
	}

    onMount(getUsers);

    async function deleteUser (id) {
        const res = await fetch(`http://localhost:3001/subscribers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',

            },
		})
        const json = await res.json();
		result = JSON.stringify(json);
        getUsers();
        showToast();
	  }

    function showToast(){
        alert(result);
    }
</script>


<div class="mt-3">
	<div class="mb-3">
		<label for="login" class="form-label">Name</label>
		<input class="form-control" id="login" aria-describedby="emailHelp" bind:value={name} />
		<div id="emailHelp" class="form-text">Your name</div>
	</div>
	<div class="mb-3">
		<label for="fname" class="form-label">F-name</label>
		<input type="text" class="form-control" id="fname" bind:value={fname}>
	</div>
	<button type="submit" class="btn btn-success showToast" on:click={addUser}>Add user</button>
</div>

{#each subscribers as subscriber}
<div class="card mt-3 mb-3">
    <div class="card-body">
      <h5 class="card-title">{subscriber.name}</h5>
      <p class="card-text">{subscriber.fname}</p>
      <button on:click={() => deleteUser(subscriber._id)} class="btn btn-danger showToast">Delete</button>
    </div>
  </div>
{/each}