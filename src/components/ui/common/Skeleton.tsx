import { type ComponentProps } from 'react';

import { cn } from '@/utils/tw-merge';

function Skeleton({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot='skeleton'
			className={cn('dark:bg-muted bg-card animate-pulse rounded-md', className)}
			{...props}
		/>
	);
}

export { Skeleton };
