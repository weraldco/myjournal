import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	activate?: boolean;
	onClick?(): void;
}
export default function ToolButton({ children, activate, onClick }: Props) {
	return (
		<button
			className={clsx('p-2', activate ? 'bg-black text-white' : 'text-black')}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}
