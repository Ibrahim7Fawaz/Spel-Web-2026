<script>
// @ts-nocheck

  export let data;
  const { character } = data;
</script>

<h1>{character.name}</h1>

<h2>Logga match</h2>

<form method="post" action="?/logMatch">
  <input type="hidden" name="characterId" value="{character.id}" />

  <label>
    <input type="radio" name="won" value="true" checked />
    Vinst
  </label>

  <label>
    <input type="radio" name="won" value="false" />
    Förlust
  </label>

  <button type="submit">Logga match</button>
</form>

<h2>Matchhistorik</h2>

{#each character.games as g}
  <div style="margin: 10px 0;">
    <strong>{g.won ? 'Vinst' : 'Förlust'}</strong>
    – {new Date(g.playedAt).toLocaleString()}
  </div>
{/each}
