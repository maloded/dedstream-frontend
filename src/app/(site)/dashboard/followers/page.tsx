import { FollowersTable } from '@/components/features/follow/table/FollowersTable';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';


export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.followers.header');

	return {
		title: t('heading'),
		description: t('description'),
		robots: {
			index: false,
			follow: false,
		},
	};
}

export default function FollowersSettingsPage() {
	return <FollowersTable />;
}
