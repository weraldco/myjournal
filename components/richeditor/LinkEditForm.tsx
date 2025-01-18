'use client';
import React, { useEffect, useState } from 'react';
import { BiUnlink } from 'react-icons/bi';

interface Props {
	inititalState?: string;
	onSubmit(link: string): void;
}

const LinkEditForm = ({ inititalState, onSubmit }: Props) => {
	const [showForm, setShowForm] = useState(false);
	const [link, setLink] = useState('');

	useEffect(() => {
		if (inititalState) setLink(inititalState);
	}, [inititalState]);
	return (
		<div>
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
					onClick={() => {
						setLink('');
						setShowForm(false);
					}}
					onMouseDown={() => {
						onSubmit(link);
					}}
					className="bg-black text-white w-8 aspect-square flex justify-center items-center"
				>
					Ok
				</button>
				<button
					onClick={() => {
						setShowForm(false);
					}}
					onMouseDown={() => {
						onSubmit('');
					}}
					className="bg-red-400 text-white w-8 aspect-square flex justify-center items-center"
				>
					<BiUnlink />
				</button>
			</div>
		</div>
	);
};

export default LinkEditForm;
