'use client';

import { useTranslations } from 'next-intl';

export function LiveBadge() {
	const t = useTranslations('components.liveBadge');

	return (
		<div className='rounded-full p-0.5 px-2 text-center text-xs font-semibold tracking-wide text-white uppercase shadow-[0_0_10px_rgba(34,197,94,0.6)] ring-green-50'>
			{t('text')}
		</div>
	);
}
