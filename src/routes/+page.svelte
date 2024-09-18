<script lang="ts">
	import db from '$lib/db';
	import Login from '../components/Login.svelte';

	export let data;

	let user = db.user;
</script>

<div>
	<h2>Water Quality Reports</h2>
	{#if data.waterQualityReports.length}
		<ul>
			{#each data.waterQualityReports as report}
				<li>{report.id}</li>
			{/each}
		</ul>
	{:else}
		<span>No Water Quality Reports found.</span>
	{/if}
</div>

{#if !$user}
	<Login />
{/if}
