import { prisma } from '$lib/prisma';

export async function load() {
  const characters = await prisma.character.findMany({
    include: { games: true }
  });

  const withStats = characters.map(c => {
    const total = c.games.length;
    const wins = c.games.filter(g => g.won).length;
    const losses = total - wins;
    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

    return {
      ...c,
      stats: { total, wins, losses, winRate }
    };
  });

  return { characters: withStats };
}
