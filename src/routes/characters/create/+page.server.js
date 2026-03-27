import { prisma } from '$lib/prisma';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');

    await prisma.character.create({
      // @ts-ignore
      data: { name }
    });

    return { success: true };
  }
};
