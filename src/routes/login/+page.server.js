import { prisma } from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  register: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
    
    if (!username || !password) {
      return fail(400, { error: 'Användarnamn och lösenord krävs' });
    }
    
    if (password.length < 3) {
      return fail(400, { error: 'Lösenordet är för kort!' });
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });
    
    if (existingUser) {
      return fail(400, { error: 'Användarnamnet är upptaget' });
    }
    
    let newUser;
    try {
      // NOTE: För Modul 10 sparar vi detta osäkert i klartext, enligt uppgiftens fas 3.
      newUser = await prisma.user.create({
        data: {
          username,
          password
        }
      });
      
    } catch (error) {
      console.error(error);
      return fail(500, { error: 'Något gick fel...' });
    }
    
    cookies.set('userId', newUser.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 vecka
      secure: false, 
      httpOnly: true
    });
      
    throw redirect(303, '/characters');
  },
  
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user || user.password !== password) {
      return fail(400, { error: 'Fel användarnamn eller lösenord' });
    }

    cookies.set('userId', user.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, 
      secure: false, 
      httpOnly: true
    });

    throw redirect(303, '/characters');
  },

  logout: async ({ cookies }) => {
    cookies.delete('userId', { path: '/' });
    throw redirect(303, '/');
  }
};
