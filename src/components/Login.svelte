<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import db from '$lib/db';

	let email: string;
	let sent = false;

	async function submit() {
		await db.signIn(email);
		sent = true;
	}

	function focus(element: HTMLElement) {
		element.focus();
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div>
	{#if sent}
		<div>
			<div in:fly class="notification">
				<svg
					height="32"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<h2>Sent you a link, check your email</h2>
			</div>
		</div>
	{:else}
		<div in:fade>
			<h1>Sign in</h1>

			<form on:submit|preventDefault={submit}>
				<label>
					<span>E-mail Address</span>
					<input name="email" type="email" required bind:value={email} use:focus />
				</label>
				<button>
					<svg
						height="24"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					<span>Send me a magic link</span>
				</button>
			</form>
		</div>
	{/if}
</div>
