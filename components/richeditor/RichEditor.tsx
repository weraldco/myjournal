'use client';

import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import Tools from './Tools';

interface Props {
	onValueChange: ({ html, json }: { html: string; json: JSONContent }) => void;
	content?: string;
}

const RichEditor = ({ onValueChange, content }: Props) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,

			Link.configure({
				openOnClick: false,
				autolink: false,
				linkOnPaste: true,
				HTMLAttributes: {
					target: '_blank',
				},
			}),
			TextAlign.configure({
				types: ['paragraph'],
			}),
			Placeholder.configure({ placeholder: 'Write something..' }),
		],
		content: content,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			const json = editor.getJSON();
			const html = editor.getHTML();

			onValueChange({ html, json });
		},
		editorProps: {
			attributes: {
				class: 'prose lg:prose-base  outline-none',
			},
		},
	});
	useEffect(() => {
		return () => {
			editor?.destroy();
		};
	}, [editor]);

	return (
		<>
			<div className=" flex flex-col space-y-4  justify-center">
				<div className="sticky top-0 bg-white z-50 flex items-center justify-center border-b border-gray-600">
					<Tools editor={editor} />
				</div>
				<div className="flex-1 ">
					<EditorContent editor={editor} className="min-h-[200px] " />
				</div>
				{/* <div className="p-4 text-right">
					<button
						onClick={() => {
							// The result should be this one.
							// editor?.getHTML -> which is give you the result of your data you put in your richtext editor.
							console.log(editor?.getHTML());
						}}
						className="bg-black text-white px-4 py-2 rounded-lg"
					>
						Create new post
					</button>
				</div> */}
			</div>
		</>
	);
};

export default RichEditor;
