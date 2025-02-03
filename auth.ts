/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const email = credentials.email as string;
				const password = credentials.password as string;

				const user = await prisma.user.findUnique({ where: { email } });
				// logic to salt and hash password
				// const pwHash = saltAndHashPassword(credentials.password);

				// logic to verify if the user exists
				// user = await getUserFromDb(credentials.email, pwHash);

				if (!user) {
					// No user found, so this is their first attempt to login
					// Optionally, this is also the place you could do a user registration
					throw new Error('Invalid credentials.');
				}

				// return user object with their profile data
				return user;
			},
		}),
	],
});
