// @ts-nocheck
import { prisma } from '$lib/prisma';

export async function load({ params }) {
  const character = await prisma.character.findUnique({
    where: { id: params.id },
    include: { games: true }
  })

  return { character };
}

export const actions = {
  logMatch: async ({ request }) => {
    const data = await request.formData();
    const characterId = data.get('characterId');
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
