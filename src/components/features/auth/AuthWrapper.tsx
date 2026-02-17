import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';

import { Button } from '@/components/ui/common/Button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/common/Card';

interface AuthWrapperProps {
	heading: string;
	backButtonLabel?: string;
	backButtonHref?: string;
	children: ReactNode; // ?
}

export function AuthWrapper({
	children,
	heading,
	backButtonHref,
	backButtonLabel,
}: PropsWithChildren<AuthWrapperProps>) {
	return (
		<div className='items-center flex h-full justify-center'>
			<Card className='w-[450px]'>
				<CardHeader className='flex items-center justify-center gap-4'>
					<Image
						src='/images/logo.svg'
						alt='TeaStream'
						width={40}
						height={40}
					/>
					<CardTitle>{heading}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className='-mt-2 p-1'>
					{backButtonLabel && backButtonHref && (
						<Button variant='ghost' className='w-full'>
							<Link href={backButtonHref}>{backButtonLabel}</Link>
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
