'use client';
import { addNewJournal } from '@/actions/journalAction';
// import { addNewBlogPost } from '@/actions/postActions';

import { default as RichEditor } from '@/components/richeditor/RichEditor';
import { JSONContent } from '@tiptap/react';
import React, { useState } from 'react';
const AddPostForm = () => {
	const [title, setTitle] = useState('');
	const [htmlContent, setHtmlContent] = useState('');
	const [jsonContent, setJsonContent] = useState('');
	const handleEditorChange = ({
		html,
		json,
	}: {
		html: string;
		json: JSONContent;
	}) => {
		setHtmlContent(html);
		setJsonContent(JSON.stringify(json));
	};
	const formSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('title', title);
		formData.append('htmlContent', htmlContent);
		formData.append('jsonContent', jsonContent);

		await addNewJournal(formData);
	};

	return (
		<div className=" w-full">
			<form onSubmit={formSubmit} className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold">Adding New Journal</h1>
				<div>
					<label htmlFor="title" className="text-sm text-gray-600">
						Journal Title
					</label>
					<input
						type="text"
						placeholder="Enter a title for your journal.."
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						className="w-full border border-gray-600 p-2 rounded outline-none"
						id="title"
					/>
				</div>

				<div>
					<label htmlFor="title" className="text-sm text-gray-600">
						Journal Content
					</label>
					<div className="border border-gray-600 rounded p-2">
						<RichEditor onValueChange={handleEditorChange} />
					</div>
				</div>
				<button type="submit" className="bg-blue-500 text-white p-2 rounded">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddPostForm;
