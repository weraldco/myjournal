import { getAllData } from '@/actions/journalAction';
import JournalItem from '@/components/journal/JournalItem';
import Link from 'next/link';
import React from 'react';

const JournalPage = async () => {
	const journals = await getAllData();

	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold">Journal Page</h1>
				<Link
					href="/journal/add"
					className="px-2 py-1 bg-blue-500 rounded-full text-white text-xs"
				>
					Add new journal
				</Link>
			</div>

			<div>
				{journals && (
					<ul>
						{journals.map((journal) => (
							<li key={journal.id}>
								<JournalItem journal={journal} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default JournalPage;
