'use client';
import React, { ReactNode } from 'react';
import ImageProvider from './context/ImageProvider';

interface Props {
	children: ReactNode;
}
const Providers = ({ children }: Props) => {
	return <ImageProvider>{children}</ImageProvider>;
};

export default Providers;
