<script>
  export let data;
  const { characters } = data;
</script>

<h1>Characters</h1>

<a href="/characters/create">Skapa ny character</a>

{#each characters as c}
  <div style="margin: 15px 0; padding: 10px; border: 1px solid #ccc;">
    <h3>{c.name}</h3>
    <p>
      Total: {c.stats.total} |
      Vinster: {c.stats.wins} |
      Förluster: {c.stats.losses} |
      Win Rate: {c.stats.winRate}%
    </p>
    <a href={`/characters/${c.id}`}>Visa</a>
  </div>
{/each}
