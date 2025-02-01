'use client';
import { getAllData } from '@/actions/journalAction';
import { useEffect, useState } from 'react';

type JournalT = {
	id: string;
	slug: string;
	title: string;
	body: string;
};

const AllJournal = () => {
	const [journals, setJournals] = useState<JournalT[] | undefined>();
	useEffect(() => {
		const updateJournalState = async () => {
			const newJournals = await getAllData();
			setJournals(newJournals);
		};
		updateJournalState();
	}, [journals]);

	console.log(journals);
	return <div></div>;
};

export default AllJournal;
