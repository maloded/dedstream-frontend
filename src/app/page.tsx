'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/common/Button';

export default function Home() {
	const t = useTranslations('home');

	return (
		<div>
			{t('title')}
			<Button>Default</Button>
			<Button variant='outline'>Outline</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='ghost'>Ghost</Button>

		</div>
	);
}
