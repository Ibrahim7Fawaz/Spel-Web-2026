<script lang="ts">
	import './layout.css';
	let { children } = $props();
</script>

<div class="max-w-4xl mx-auto min-h-screen bg-black border-x border-gray-800">
	<header class="px-8 py-6 border-b border-gray-800 flex items-center justify-between">
		<h1 class="text-xl font-medium tracking-tight text-white">Character Tracker</h1>
		<nav class="flex gap-6 text-sm">
			<a href="/" class="text-gray-400 hover:text-white transition-colors">Home</a>
			<a href="/characters" class="text-gray-400 hover:text-white transition-colors">characters</a>
			<a href="/characters/create" class="text-blue-400 hover:text-blue-300 transition-colors">Create New</a>
		</nav>
	</header>

	<main class="p-8">
		{@render children()}
	</main>
</div>
