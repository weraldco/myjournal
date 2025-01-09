import { BubbleMenu, ChainedCommands, Editor } from '@tiptap/react';
import React, { ChangeEventHandler } from 'react';
import {
	BiAlignLeft,
	BiAlignMiddle,
	BiAlignRight,
	BiBold,
	BiCodeAlt,
	BiCodeCurly,
	BiImage,
	BiItalic,
	BiListOl,
	BiListUl,
	BiStrikethrough,
	BiUnderline,
} from 'react-icons/bi';
import LinkEditForm from './LinkEditForm';
import LinkForm from './LinkForm';
import ToolButton from './ToolButton';

interface Props {
	editor: Editor | null;
	onImageSelection?(): void;
}

const tools = [
	{
		task: 'bold',
		icon: <BiBold />,
	},
	{
		task: 'italic',
		icon: <BiItalic />,
	},
	{
		task: 'underline',
		icon: <BiUnderline />,
	},
	{
		task: 'strike',
		icon: <BiStrikethrough />,
	},
	{
		task: 'code',
		icon: <BiCodeAlt />,
	},
	{
		task: 'codeblock',
		icon: <BiCodeCurly />,
	},
	{
		task: 'left',
		icon: <BiAlignLeft />,
	},
	{
		task: 'center',
		icon: <BiAlignMiddle />,
	},
	{
		task: 'right',
		icon: <BiAlignRight />,
	},
	{
		task: 'orderList',
		icon: <BiListOl />,
	},
	{
		task: 'bulletList',
		icon: <BiListUl />,
	},
	{
		task: 'image',
		icon: <BiImage />,
	},
] as const;

const headingOptions = [
	{ task: 'p', value: 'Paragraph' },
	{ task: 'h1', value: 'Heading 1' },
	{ task: 'h2', value: 'Heading 2' },
	{ task: 'h3', value: 'Heading 3' },
] as const;

const chainMethod = (
	editor: Editor | null,
	command: (chain: ChainedCommands) => ChainedCommands
) => {
	if (!editor) return;

	command(editor.chain().focus()).run();
};

type TaskType = (typeof tools)[number]['task'];
type HeadingType = (typeof headingOptions)[number]['task'];

export default function Tools({ editor, onImageSelection }: Props) {
	const handleOnClick = (task: TaskType) => {
		switch (task) {
			case 'bold':
				return chainMethod(editor, (chain) => chain.toggleBold());
			case 'italic':
				return chainMethod(editor, (chain) => chain.toggleItalic());
			case 'underline':
				return chainMethod(editor, (chain) => chain.toggleUnderline());
			case 'strike':
				return chainMethod(editor, (chain) => chain.toggleStrike());
			case 'code':
				return chainMethod(editor, (chain) => chain.toggleCode());
			case 'codeblock':
				return chainMethod(editor, (chain) => chain.toggleCodeBlock());

			case 'orderList':
				return chainMethod(editor, (chain) => chain.toggleOrderedList());
			case 'bulletList':
				return chainMethod(editor, (chain) => chain.toggleBulletList());
			case 'left':
				return chainMethod(editor, (chain) => chain.setTextAlign('left'));
			case 'center':
				return chainMethod(editor, (chain) => chain.setTextAlign('center'));
			case 'right':
				return chainMethod(editor, (chain) => chain.setTextAlign('right'));
			case 'image':
				return onImageSelection && onImageSelection();
		}
	};

	const getInitialLink = () => {
		const attributes = editor?.getAttributes('link');
		if (attributes) return attributes.href;
	};
	const handleHeadingSelection: ChangeEventHandler<HTMLSelectElement> = ({
		target,
	}) => {
		const { value } = target as { value: HeadingType };

		switch (value) {
			case 'p':
				return chainMethod(editor, (chain) => chain.setParagraph());
			case 'h1':
				return chainMethod(editor, (chain) =>
					chain.toggleHeading({ level: 1 })
				);
			case 'h2':
				return chainMethod(editor, (chain) =>
					chain.toggleHeading({ level: 2 })
				);
			case 'h3':
				return chainMethod(editor, (chain) =>
					chain.toggleHeading({ level: 3 })
				);
		}
	};

	const getSelectedHeading = (): HeadingType => {
		let result: HeadingType = 'p';
		if (editor?.isActive('heading', { level: 1 })) result = 'h1';
		if (editor?.isActive('heading', { level: 2 })) result = 'h2';
		if (editor?.isActive('heading', { level: 3 })) result = 'h3';

		return result;
	};

	const handleLinkSubmission = (href: string) => {
		if (href === '') {
			editor?.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		// update link
		editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
	};
	return (
		<div className="flex items-start space-x-1">
			<select
				value={getSelectedHeading()}
				className="p-2"
				onChange={handleHeadingSelection}
			>
				{headingOptions.map((item, i) => {
					return (
						<option key={i} value={item.task}>
							{item.value}
						</option>
					);
				})}
			</select>
			<LinkForm onSubmit={handleLinkSubmission} />

			<BubbleMenu
				editor={editor}
				shouldShow={({ editor }) => editor.isActive('link')}
			>
				<LinkEditForm
					inititalState={getInitialLink()}
					onSubmit={handleLinkSubmission}
				/>
				{/* <div className="bg-gray-200 w-96 p-2 rounded shadow-md z-50"></div> */}
			</BubbleMenu>

			{tools.map(({ icon, task }, i) => {
				return (
					<ToolButton
						key={i}
						onClick={() => handleOnClick(task)}
						activate={
							editor?.isActive(task) || editor?.isActive({ textAlign: task })
						}
					>
						{icon}
					</ToolButton>
				);
			})}
		</div>
	);
}
