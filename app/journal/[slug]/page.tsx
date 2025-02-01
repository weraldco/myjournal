import { getDataBySlug } from '@/actions/journalAction';
import parse from 'html-react-parser';
import { FC } from 'react';

interface Props {
	params: { slug: string };
}

const page: FC<Props> = async ({ params }) => {
	const slug = params.slug;
	const journal = await getDataBySlug(slug);
	return (
		<div>
			{journal && (
				<div className="flex flex-col items-center justify-center gap-4 text-base md:text-xl">
					{/* Title  */}
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-4xl font-bold text-indigo-900">
							{journal.title}
						</h1>
						{/* Date */}
						<div className="text-sm text-gray-600">
							<span className="italic">Posted </span>
							{journal.createdAt.toLocaleDateString('en-EN', {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							})}
						</div>
					</div>
					{/* Content/Bodyt */} <div className="">{parse(journal.body)}</div>
				</div>
			)}
		</div>
	);
};

export default page;
