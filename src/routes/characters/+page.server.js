import { requireAuth } from '$lib/auth';
import { prisma } from '$lib/prisma';

export const load = async ({ cookies }) => {
  const user = await requireAuth(cookies);

  const characters = await prisma.character.findMany({
    where: { userId: user.id },
    include: { games: true }
  });

  const withStats = characters.map(c => {
    const total = c.games ? c.games.length : 0;
    const wins = c.games ? c.games.filter(/** @param {any} g */ g => g.won).length : 0;
    const losses = total - wins;
    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

    return {
      ...c,
      stats: { total, wins, losses, winRate }
    };
  });

  return { characters: withStats };
}
