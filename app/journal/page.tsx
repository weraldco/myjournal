import Link from 'next/link';
import React from 'react';

const JournalPage = () => {
	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<h1 className="text-2xl font-bold">Journal Page</h1>
			<Link
				href="/journal/add"
				className="px-2 py-1 bg-blue-500 rounded-full text-white text-xs"
			>
				Add new journal
			</Link>
		</div>
	);
};

export default JournalPage;
