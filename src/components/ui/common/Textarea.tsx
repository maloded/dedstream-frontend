import { ComponentProps } from 'react';

import { cn } from '@/utils/tw-merge';

function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot='textarea'
			className={cn(
				'border-input dark:bg-input/30 input-glow ' +
					'h-[80px] w-full rounded-lg border px-2.5 py-2 text-sm transition-all duration-300 ' +
					'bg-input placeholder:text-muted-foreground flex field-sizing-content ' +
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 ' +
					'aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 ' +
					'disabled:bg-input/50 dark:disabled:bg-input/80 ' +
					'outline-none disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
