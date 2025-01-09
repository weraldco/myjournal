'use client';
// import { addNewBlogPost } from '@/actions/postActions';
import ImageGallery from '@/components/richeditor/ImageGallery';

import { default as RichEditor } from '@/components/richeditor/RichEditor';
import { JSONContent } from '@tiptap/react';
import Image from 'next/image';
import React, { useState } from 'react';
const AddPostForm = () => {
	const [showImageGallery, setShowImageGallery] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');
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
		formData.append('img-url', selectedImage);
		formData.append('htmlContent', htmlContent);
		formData.append('jsonContent', jsonContent);

		// await addNewBlogPost(formData);
	};

	const handleOnclick = () => {
		setShowImageGallery(true);
	};
	const onImageSelect = (image: string) => {
		setSelectedImage(image);
	};

	console.log(selectedImage);

	return (
		<div>
			<form onSubmit={formSubmit} className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold">Adding New Post</h1>
				<div>
					<label htmlFor="title" className="text-sm text-gray-600">
						Post Title
					</label>
					<input
						type="text"
						placeholder="Enter a title for your post.."
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						className="w-full border border-gray-600 p-2 rounded outline-none"
						id="title"
					/>
				</div>
				<label
					onClick={handleOnclick}
					htmlFor="title"
					className="text-sm text-gray-600 cursor-pointer"
				>
					Upload Image Banner (click here)
				</label>
				<div>
					{selectedImage && (
						<Image
							src={selectedImage}
							alt="banner-image"
							width={600}
							height={600}
							className="w-full"
							priority
						></Image>
					)}
				</div>
				<div>
					<label htmlFor="title" className="text-sm text-gray-600">
						Post htmlContent
					</label>
					<div className="border border-gray-600 rounded p-2">
						<RichEditor onValueChange={handleEditorChange} />
					</div>
				</div>
				<button type="submit" className="bg-blue-500 text-white p-2 rounded">
					Submit
				</button>
			</form>
			<ImageGallery
				onSelect={onImageSelect}
				visible={showImageGallery}
				onClose={setShowImageGallery}
			/>
		</div>
	);
};

export default AddPostForm;
