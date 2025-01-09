import Image from 'next/image';
import React from 'react';
import { BiCheck, BiSolidTrash } from 'react-icons/bi';

interface Props {
	src: string;
	onDeleteClick?(): void;
	onSelectClick?(): void;
}
export default function GalleryImage({
	src,
	onDeleteClick,
	onSelectClick,
}: Props) {
	return (
		<div className="group relative w-full aspect-square overflow-hidden rounded-xl">
			<Image
				src={src}
				alt="image"
				width={100}
				height={100}
				className="w-full h-full object-cover "
				priority
			/>
			<div className="hidden group-hover:flex absolute bottom-0 right-0 left-0">
				<button
					onClick={onDeleteClick}
					className="flex-1 bg-red-400 text-white flex items-center justify-center p-2"
				>
					<BiSolidTrash />
				</button>
				<button
					onClick={onSelectClick}
					className="flex-1 bg-blue-400 text-white flex items-center justify-center p-2"
				>
					<BiCheck />
				</button>
			</div>
		</div>
	);
}
