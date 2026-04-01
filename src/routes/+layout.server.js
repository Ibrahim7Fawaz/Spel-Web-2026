import { getUser } from '$lib/auth';

export const load = async ({ cookies }) => {
  const user = await getUser(cookies);
  return {
    user
  };
};
