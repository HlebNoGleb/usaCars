<script>
    let list = [
        { state: true}, { state: true}, { state: true},{ state: true}
    ]
    let test;
    let counter = 0;
    async function getList(){
        counter++;
        test = list[0].state = !list[0].state;
        return Promise.resolve(list);

    }
    const promise = getList()
</script>

Times GetList called: {counter}
Times GetList called: {test}

{#await promise then alist}
    {#each alist as item}
    <div>
        {item.state}
        <div class="button" on:click={()=>getList()}>Toggle it!</div>
    </div>
    {/each}
{/await}