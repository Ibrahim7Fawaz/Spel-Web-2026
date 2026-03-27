import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');

    await prisma.character.create({
      // @ts-ignore
      data: { name }
    });

    throw redirect(302, "/characters")
  }
};
