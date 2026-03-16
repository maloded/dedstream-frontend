import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { KeysSetting } from '@/components/features/keys/settings/KeysSetting';
import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.keys.header');

	return {
		title: t('heading'),
		description: t('description'),
		...NO_INDEX_PAGE
	};
}

export default function KeysSettingsPage() {
	return <KeysSetting />;
}
