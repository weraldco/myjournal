'use server';

import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addNewData = async () => {
	await prisma.journal.create({
		data: {
			slug: 'first-journal',
			title: 'First Journal',
			body: "The findMany query you used in the previous section only reads data from the database (although it was still empty). In this section, you'll learn how to write a query to write new records into the Post, User and Comment tables. This code creates a new User record together with a new Post using a nested write query. The User record is connected to the other one via the Post.author ↔ User.posts relation fields respectively. Notice that you're passing the include option to findMany which tells Prisma Client to include the posts relations on the returned User objects.",
			authorId: '679d3dcf82a9997e5c8f19e8',
		},
	});
};

export const getAllData = async () => {
	try {
		const journal = await prisma.journal.findMany();
		if (journal) return journal;
	} catch (error) {
		console.error(error);
	}
};

export const addNewJournal = async (formData: FormData) => {
	const rawData = {
		slug: (formData.get('title') as string).split(' ').join('-').toLowerCase(),
		title: formData.get('title') as string,
		body: formData.get('htmlContent') as string,
		authorId: '679d3dcf82a9997e5c8f19e8',
	};
	try {
		await prisma.journal.create({
			data: rawData,
		});
	} catch (error) {
		console.error(error);
	} finally {
		revalidatePath('/journal');
		redirect('/journal');
	}
};

export const getDataBySlug = async (slug: string) => {
	try {
		const data = await prisma.journal.findUnique({ where: { slug } });
		if (data) return data;
	} catch (error) {
		console.error(error);
	}
};
