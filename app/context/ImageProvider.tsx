'use client';
import { readAllImages } from '@/actions/file';
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

interface Props {
	children: ReactNode;
}

interface InitialImageContext {
	images: string[];
	updateImages(images: string[]): void;
	removeOldImages(src: string): void;
}

const Context = createContext<InitialImageContext | null>(null);

const ImageProvider = ({ children }: Props) => {
	const [images, setImages] = useState<string[]>([]);

	const updateImages = (data: string[]) => {
		setImages([...data, ...images]);
	};

	const removeOldImages = (src: string) => {
		setImages((old) => old.filter((img) => src !== img));
	};

	useEffect(() => {
		readAllImages().then(setImages);
	}, []);

	return (
		<Context.Provider value={{ images, updateImages, removeOldImages }}>
			{children}
		</Context.Provider>
	);
};

export const useImages = () => useContext(Context);

export default ImageProvider;
