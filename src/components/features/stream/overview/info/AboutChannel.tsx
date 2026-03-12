import { useTranslations } from 'next-intl';
import Link from 'next/link';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/common/Card';
import { Skeleton } from '@/components/ui/common/Skeleton';
import { SocialNetwork } from '@/components/ui/elements/SocialNetwork';

import { type FindChannelByUsernameQuery } from '@/graphql/generated/output';

interface AboutChannelProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function AboutChannel({ channel }: AboutChannelProps) {
	const t = useTranslations('stream.aboutChannel');

	return (
		<Card className='mt-6'>
			<CardHeader className='p-4-2-4-2'>
				<CardTitle className='text-xl'>
					{t('heading')} {channel.displayName}
				</CardTitle>
			</CardHeader>
			<CardContent className='-mt-1 space-y-2 px-4'>
				<div className='text-foreground text-[15px]'>
					<span className='font-semibold'>
						{channel.followings.length}
					</span>{' '}
					{t('followersCount')}
				</div>
				<div className='text-muted-foreground w-[90%] text-[15px]'>
					{channel.bio ?? t('noDescription')}
				</div>
				{channel.socialLinks.length ? (
					<div className='grid gap-x-3 md:grid-cols-3 xl:grid-cols-8'>
						{channel.socialLinks.map((socialLink, index) => (
							<Link
								key={index}
								href={socialLink.url}
								className='hover:text-primary flex items-center pr-1 text-[15px]'
								target='_blank'
							>
								<SocialNetwork name={socialLink.title} />
							</Link>
						))}
					</div>
				) : null}
			</CardContent>
		</Card>
	);
}

export function AboutChannelSkeleton() {
	return <Skeleton className='mt-6 h-36 w-full rounded-lg' />;
}
