import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/tw-merge';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../common/Tooltip';

interface HintProps {
	label: string;
	asChild?: boolean;
	side?: 'top' | 'bottom' | 'left' | 'right';
	align?: 'start' | 'center' | 'end';
}

export function Hint({
	children,
	label,
	asChild,
	side,
	align,
}: PropsWithChildren<HintProps>) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className={cn(
						'rounded-md border px-3 py-2 font-semibold whitespace-nowrap shadow-lg drop-shadow-md',

						'border-gray-700 bg-gray-900 text-white',

						'dark:border-gray-300 dark:bg-white dark:text-black',
					)}
					side={side}
					align={align}
				>
					<p className='font-semibold'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
