import { requireAuth } from '$lib/auth';
import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const actions = {
  create: async ({ request, cookies }) => {
    // Kräver att man är inloggad för att skapa!
    const user = await requireAuth(cookies);
    
    const data = await request.formData();
    const name = data.get('name')?.toString() || '';

    await prisma.character.create({
      data: {
        name,
        user: { connect: { id: user.id } }
      }
    });

    throw redirect(303, '/characters');
  }
};
