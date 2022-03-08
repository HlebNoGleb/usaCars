<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<style>
    h1{
        color: red;
    }
</style>

<script>
	export let title;
</script>

<h1>{title}</h1>