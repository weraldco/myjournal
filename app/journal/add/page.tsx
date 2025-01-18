// import AddPostForm from '@/components/AddPostForm';
import RichEditor from '@/components/richeditor/RichEditor';
import { JSONContent } from '@tiptap/react';
import React from 'react';

function AddNewJournal() {
	const handleEditorChange = ({
		html,
		json,
	}: {
		html: string;
		json: JSONContent;
	}) => {
		console.log(html);
		console.log(json);
	};
	return (
		<div>
			{/* <AddPostForm /> */}
			<RichEditor onValueChange={handleEditorChange} />
		</div>
	);
}

export default AddNewJournal;
