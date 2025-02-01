'use client';
import Tools from '@/components/richeditor/Tools';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { FC, useEffect } from 'react';

interface Props {
	onValueChange: ({ html, json }: { html: string; json: JSONContent }) => void;
	content?: string;
}

const RichEditor: FC<Props> = ({ onValueChange, content }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({
				types: ['paragraph'],
			}),
			Underline,
			Placeholder.configure({ placeholder: 'Write something..' }),
		],
		editorProps: {
			attributes: {
				class:
					'prose prose-sm sm:prose-lg lg:prose-lg xl:prose-2xl outline-none  min-h-[40vh] ',
			},
		},
		content: content,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			const json = editor.getJSON();
			const html = editor.getHTML();

			onValueChange({ html, json });
		},
	});

	useEffect(() => {
		return () => {
			editor?.destroy();
		};
	}, [editor]);

	return (
		<div className="flex flex-col space-y-4 ">
			<div className="sticky top-0 bg-white z-50">
				<Tools editor={editor} />
			</div>
			<div className="flex-1 ">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default RichEditor;
