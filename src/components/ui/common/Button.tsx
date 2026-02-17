'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/utils/tw-merge';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground',
				outline: 'border border-border bg-background',
				secondary: 'bg-secondary text-secondary-foreground',
				ghost: 'text-accent-foreground hover:bg-accent hover:text-accent-foreground',
			},
			size: {
				default: 'h-10 px-5 py-2 rounded-full',
				icon: 'size-10 rounded-full',
			},
		},

		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends
		ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ variant, size }), className)}
				{...props}
			/>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };
