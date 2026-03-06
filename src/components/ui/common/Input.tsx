import { type ComponentProps } from 'react';

import { cn } from '@/utils/tw-merge';

function Input({ className, type, ...props }: ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				'border-input dark:bg-input/30 focus:outline-none ' +
					'input-glow h-8 w-full min-w-0 rounded-lg border px-2.5 py-1 text-sm transition-all duration-300',
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
