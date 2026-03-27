<script>
    import { enhance } from '$app/forms';
</script>

<div class="max-w-md">
	<a href="/characters" class="text-sm font-medium text-gray-500 hover:text-white mb-6 inline-block transition-colors">
		&larr; Tillbaka
	</a>

	<h2 class="text-2xl font-light tracking-tight mb-8 text-white">Skapa ny character</h2>

	<form method="post" action="?/create" use:enhance class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<label for="name" class="text-sm font-medium text-gray-400">Name</label>
			<input 
				id="name"
				name="name" 
				type="text" 
				required 
				class="px-4 py-3 bg-black border border-gray-700 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
				placeholder="Namn..."
			/>
		</div>
		
		<div class="flex items-center gap-4 pt-4 border-t border-gray-800">
			<button type="submit" class="px-6 py-3 bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors">
				Skapa
			</button>
			<a href="/characters" class="text-sm font-medium text-gray-500 hover:text-white transition-colors p-3">
				Cancel
			</a>
		</div>
	</form>
</div>
