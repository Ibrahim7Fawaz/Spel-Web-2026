<script>
    import { enhance } from '$app/forms';
    
    let { data } = $props();
    const { character } = data;
    
    let totalGames = $derived(character.games.length);
    let wins = $derived(character.games.filter(g => g.won).length);
    let losses = $derived(totalGames - wins);
    let winRate = $derived(totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0);
</script>

<a href="/characters" class="text-sm font-medium text-gray-500 hover:text-white transition-colors mb-6 inline-block">
	&larr; Tillbaka
</a>

<div class="mb-12">
	<h2 class="text-3xl font-light tracking-tight mb-6 text-white">{character.name}</h2>

	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border border-gray-800 bg-gray-900/30">
		<div class="flex flex-col gap-1">
			<span class="text-xs text-gray-500 uppercase tracking-widest">Win Rate</span>
			<span class="text-2xl font-medium {winRate >= 50 ? 'text-green-400' : 'text-white'}">{winRate}%</span>
		</div>
		<div class="flex flex-col gap-1 border-l border-gray-800 pl-4">
			<span class="text-xs text-gray-500 uppercase tracking-widest">Matcher</span>
			<span class="text-2xl font-medium text-white">{totalGames}</span>
		</div>
		<div class="flex flex-col gap-1 border-l border-gray-800 pl-4">
			<span class="text-xs text-gray-500 uppercase tracking-widest">Vinster</span>
			<span class="text-2xl font-medium text-green-500">{wins}</span>
		</div>
		<div class="flex flex-col gap-1 border-l border-gray-800 pl-4">
			<span class="text-xs text-gray-500 uppercase tracking-widest">Förluster</span>
			<span class="text-2xl font-medium text-red-500">{losses}</span>
		</div>
	</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
	<div class="md:col-span-1">
		<h3 class="text-xl font-medium mb-6 text-white border-b border-gray-800 pb-2">Logga match</h3>
		<form method="post" action="?/logMatch" use:enhance class="flex flex-col gap-4">
			<input type="hidden" name="characterId" value="{character.id}" />

			<div class="flex flex-col gap-3">
				<label class="flex items-center gap-4 p-4 border border-gray-800 cursor-pointer hover:border-gray-500 bg-gray-900/50 has-[:checked]:border-white has-[:checked]:bg-gray-900 transition-colors">
					<input type="radio" name="won" value="true" checked class="w-4 h-4 accent-white bg-black border-gray-600" />
					<span class="text-lg font-medium text-white">Vinst</span>
				</label>
				
				<label class="flex items-center gap-4 p-4 border border-gray-800 cursor-pointer hover:border-gray-500 bg-gray-900/50 has-[:checked]:border-white has-[:checked]:bg-gray-900 transition-colors">
					<input type="radio" name="won" value="false" class="w-4 h-4 accent-white bg-black border-gray-600" />
					<span class="text-lg font-medium text-white">Förlust</span>
				</label>
			</div>

			<button type="submit" class="w-full mt-4 px-4 py-3 bg-white text-black text-lg font-medium hover:bg-gray-200 transition-colors">
				Spara
			</button>
		</form>
	</div>

	<div class="md:col-span-2">
		<h3 class="text-xl font-medium mb-6 text-white border-b border-gray-800 pb-2">Matchhistorik</h3>
		
		{#if character.games.length === 0}
			<p class="text-md text-gray-500 italic p-4 text-center border border-dashed border-gray-800">No matches played .</p>
		{:else}
			<div class="flex flex-col border border-gray-800">
				{#each [...character.games].sort((a,b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime()) as g}
					<div class="flex items-center justify-between p-4 border-b border-gray-800 last:border-b-0 bg-black hover:bg-gray-900/50 transition-colors">
						<span class="text-lg font-medium {g.won ? 'text-green-500' : 'text-red-500'}">
							{g.won ? 'WIN' : 'LOSS'}
						</span>
						<span class="text-md text-gray-500 tracking-wider">
							{new Date(g.playedAt).toLocaleDateString('sv-SE', {
								year: 'numeric', month: '2-digit', day: '2-digit',
								hour: '2-digit', minute: '2-digit'
							})}
						</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
