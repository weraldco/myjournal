'use client';
import React, { useState } from 'react';
import { BiLink } from 'react-icons/bi';
import ToolButton from './ToolButton';

interface Props {
	onSubmit(link: string): void;
}

const LinkForm = ({ onSubmit }: Props) => {
	const [showForm, setShowForm] = useState(false);
	const [link, setLink] = useState('');

	return (
		<div>
			<ToolButton onClick={() => setShowForm(true)}>
				<BiLink />
			</ToolButton>
			{showForm && (
				<div className="absolute top-10 z-50 ring-1 ring-black p-2 rounded flex items-center shadow-sm bg-white outline-none">
					<input
						value={link}
						onChange={({ target }) => setLink(target.value)}
						onBlur={() => setShowForm(false)}
						type="text"
						className="outline-none"
						placeholder="https://example.com"
					/>
					<button
						type="button"
						onClick={() => {
							setLink('');
							setShowForm(false);
						}}
						onMouseDown={() => {
							onSubmit(link);
						}}
						className="bg-white ml-1"
					>
						Ok
					</button>
				</div>
			)}
		</div>
	);
};

export default LinkForm;
