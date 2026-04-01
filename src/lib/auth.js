import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

// Få userId från cookies och omdirigera om oinloggad
/** @param {import('@sveltejs/kit').Cookies} cookies */
export async function requireAuth(cookies) {
  const userId = cookies.get('userId');
  
  if (!userId) {
    throw redirect(303, '/login');
  }
  
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  if (!user) {
    cookies.delete('userId', { path: '/' });
    throw redirect(303, '/login');
  }
  
  return user;
}

// Kolla vem som är inloggad utan att omdirigera
/** @param {import('@sveltejs/kit').Cookies} cookies */
export async function getUser(cookies) {
  const userId = cookies.get('userId');
  if (!userId) return null;
  
  return await prisma.user.findUnique({
    where: { id: userId }
  });
}
