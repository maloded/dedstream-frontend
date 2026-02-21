'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
	const t = useTranslations('layout.header.logo');

	return (
		<Link
			href='/'
			className='flex items-center gap-x-4 transition-opacity hover:opacity-75'
		>
			<Image
				src='./images/logo.svg'
				alt='DedStream'
				width={70}
				height={70}
			/>
			<div className='hidden leading-tight lg:block'>
				<h2 className='text-accent-foreground text-lg font-semibold tracking-wider'>
					DedStream
				</h2>
				<p className='text-muted-foreground text-sm'>{t('platform')}</p>
			</div>
		</Link>
	);
}
