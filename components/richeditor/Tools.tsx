import { FC } from 'react';
import {
	BiAlignLeft,
	BiAlignMiddle,
	BiAlignRight,
	BiBold,
	BiCodeAlt,
	BiCodeCurly,
	BiItalic,
	BiListOl,
	BiListUl,
	BiStrikethrough,
	BiUnderline,
} from 'react-icons/bi';
import ToolButton from './ToolButton';

import { ChainedCommands, Editor } from '@tiptap/react';

interface Props {
	editor: Editor | null;
}

type TaskType = (typeof tools)[number]['task'];

const tools = [
	{
		task: 'bold',
		icon: <BiBold size="18" />,
	},
	{
		task: 'italic',
		icon: <BiItalic size="18" />,
	},
	{
		task: 'underline',
		icon: <BiUnderline size="18" />,
	},
	{
		task: 'strike',
		icon: <BiStrikethrough size="18" />,
	},
	{
		task: 'code',
		icon: <BiCodeAlt size="18" />,
	},
	{
		task: 'codeblock',
		icon: <BiCodeCurly size="18" />,
	},
	{
		task: 'left',
		icon: <BiAlignLeft size="18" />,
	},
	{
		task: 'center',
		icon: <BiAlignMiddle size="18" />,
	},
	{
		task: 'right',
		icon: <BiAlignRight size="18" />,
	},
	{
		task: 'orderList',
		icon: <BiListOl size="18" />,
	},
	{
		task: 'bulletList',
		icon: <BiListUl size="18" />,
	},
] as const;

const chainMethod = (
	editor: Editor | null,
	command: (chain: ChainedCommands) => ChainedCommands
) => {
	if (!editor) return;

	command(editor.chain().focus()).run();
};

const Tools: FC<Props> = ({ editor }) => {
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
			// case 'image':
			// 	return onImageSelection && onImageSelection();
		}
	};
	return (
		<div className="grid grid-flow-col justify-center">
			{tools.map(({ icon, task }, i) => {
				return (
					<ToolButton
						key={i}
						onClick={() => handleOnClick(task)}
						active={
							editor?.isActive(task) || editor?.isActive({ textAlign: task })
						}
					>
						{icon}
					</ToolButton>
				);
			})}
		</div>
	);
};

export default Tools;
