import parse from 'html-react-parser';
import Link from 'next/link';
import { FC } from 'react';

type JournalT = {
	id: string;
	slug: string;
	title: string;
	body: string;
	createdAt: Date;
};

interface Props {
	journal: JournalT;
}

const JournalItem: FC<Props> = ({ journal }) => {
	return (
		<div>
			<Link href={`/journal/${journal.slug}`}>
				<h1 className="text-2xl font-bold text-indigo-900">{journal.title}</h1>
			</Link>
			<div className="text-sm text-gray-600">
				<span className="italic">Posted </span>
				{journal.createdAt.toLocaleDateString('en-EN', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				})}
			</div>
			<div className="">{parse(journal.body)}</div>
		</div>
	);
};

export default JournalItem;
