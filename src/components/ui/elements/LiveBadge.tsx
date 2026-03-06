'use client';

import { useTranslations } from 'next-intl';

export function LiveBadge() {
	const t = useTranslations('components.liveBadge');

	return (
		<div className='bg-card/90 relative animate-pulse rounded-full px-2 py-0.5 text-xs font-semibold text-white uppercase shadow-[0_0_8px_rgba(239,68,68,0.7)] ring-red-500 after:absolute after:-inset-0.5 after:-z-10 after:rounded-full after:bg-red-500/30 after:blur-sm'>
			{t('text')}
		</div>
	);
}
