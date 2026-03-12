import { useTranslations } from 'next-intl';

import {
	type FindChannelByUsernameQuery,
	useFindSponsorsByChannelQuery,
} from '@/graphql/generated/output';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/common/Card';
import Link from 'next/link';
import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar';

interface ChannelSponsorsProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function ChannelSponsors({ channel }: ChannelSponsorsProps) {
	const t = useTranslations('stream.sponsors');

	const { data, loading: isLoadingSponsors } = useFindSponsorsByChannelQuery({
		variables: {
			channelId: channel.id,
		},
	});
	const sponsors = data?.findSponsorsByChannel ?? [];

	if (!sponsors.length || isLoadingSponsors) {
		return null;
	}

	return <Card className='mt-6'>
        <CardHeader className='p-2-4'>
            <CardTitle className='text-xl'>
                {t('heading')}
            </CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-12 px-4'>
            {sponsors.map((sponsor, index) => (
                <Link key={index} href={`/${sponsor.user.username}`}>
                    <ChannelAvatar channel={sponsor.user} size='lg' />
                </Link>
            ))}
        </CardContent>
    </Card>;
}
