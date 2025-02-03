'use server';

import { signIn } from '@/auth';

export const loginWithCreds = async (formData: FormData) => {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		console.error(error);
	}
};
