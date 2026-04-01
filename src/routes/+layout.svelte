<script lang="ts">
	import './layout.css';
	let { children, data } = $props();
</script>

<div class="max-w-4xl mx-auto min-h-screen bg-black border-x border-gray-800">
	<header class="px-8 py-6 border-b border-gray-800 flex items-center justify-between">
		<h1 class="text-xl font-medium tracking-tight text-white">Character Tracker</h1>
		<nav class="flex gap-6 text-sm items-center">
			<a href="/" class="text-gray-400 hover:text-white transition-colors">Hem</a>
            {#if data?.user}
			    <a href="/characters" class="text-gray-400 hover:text-white transition-colors">characters</a>
			    <a href="/characters/create" class="text-blue-400 hover:text-blue-300 transition-colors">Skapa ny</a>
                <span class="text-gray-600 pl-4 border-l border-gray-800">{data.user.username}</span>
                <form method="POST" action="/login?/logout" class="inline">
                    <button type="submit" class="text-red-500 hover:text-red-400 transition-colors">Logga ut</button>
                </form>
            {:else}
                <a href="/login" class="text-blue-400 hover:text-blue-300 transition-colors bg-gray-900 px-3 py-1 rounded">Logga in</a>
            {/if}
		</nav>
	</header>

	<main class="p-8">
		{@render children()}
	</main>
</div>
