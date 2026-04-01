import { requireAuth } from '$lib/auth';
import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export async function load({ params, cookies }) {
  await requireAuth(cookies);

  const character = await prisma.character.findUnique({
    where: { id: params.id },
    include: { games: true }
  })

  return { character };
}

export const actions = {
  logMatch: async ({ request, cookies }) => {
    await requireAuth(cookies);

    const data = await request.formData();
    const characterId = data.get('characterId')?.toString() || '';
    const won = data.get('won') === 'true';

    await prisma.game.create({
      data: {
        won,
        character: { connect: { id: characterId } }
      }
    });

    return { success: true };
  }
};
