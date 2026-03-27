<script>
  let { data } = $props();
  const { characters } = data;
</script>

<div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
	<h2 class="text-2xl font-light tracking-tight text-white">Characters</h2>
	<a href="/characters/create" class="text-sm font-medium text-blue-400 hover:underline">
		+ Skapa ny character
	</a>
</div>

{#if characters.length === 0}
	<p class="text-gray-400 text-sm p-4 border border-dashed border-gray-800 text-center">Inga karaktärer gjorda än.</p>
{:else}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each characters as c}
			<a href={`/characters/${c.id}`} class="block p-5 border border-gray-800 hover:border-gray-500 hover:bg-gray-900 transition-colors">
				<h3 class="text-xl font-medium mb-4 text-white">{c.name}</h3>
				
				<div class="flex flex-col gap-2 text-md text-gray-500 mb-6">
					<div class="flex justify-between border-b border-gray-900 pb-1">
						<span>Totalt antal matcher</span>
						<span class="text-white">{c.stats.total}</span>
					</div>
					<div class="flex justify-between">
						<span>Win Rate</span>
						<span class="font-medium {c.stats.winRate > 50 ? 'text-green-400' : 'text-gray-300'}">{c.stats.winRate}%</span>
					</div>
				</div>
				
				<div class="flex gap-4 text-sm mt-4">
					<span class="text-green-500 border border-green-900 bg-green-950/30 px-2 py-0.5">{c.stats.wins} W</span>
					<span class="text-red-500 border border-red-900 bg-red-950/30 px-2 py-0.5">{c.stats.losses} L</span>
				</div>
			</a>
		{/each}
	</div>
{/if}
