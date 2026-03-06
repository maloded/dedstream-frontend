'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Card } from '@/components/ui/common/Card';
import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar';
import { LiveBadge } from '@/components/ui/elements/LiveBadge';

import { type FindProfileQuery } from '@/graphql/generated/output';

import { getRandomColor } from '@/utils/color';
import { getMediaSource } from '@/utils/get-media-source';

interface StreamThumbnailProps {
	url: string | null | undefined;
	user: Pick<
		FindProfileQuery['findProfile'],
		'username' | 'avatar' | 'updatedAt' | 'isVerified'
	>;
	isLive?: boolean;
}

export function StreamThumbnail({ url, user, isLive }: StreamThumbnailProps) {
	const [randomColor, setRandomColor] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			requestAnimationFrame(() => {
				setRandomColor(getRandomColor());
			});
		}
	}, []);

	return (
		<div className='group relative aspect-video cursor-pointer rounded-lg'>
			<div
				className='absolute inset-0 z-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100'
				style={{
					backgroundColor: randomColor,
				}}
			/>
			{url && getMediaSource(url) ? (
				<Image
					src={getMediaSource(url)!}
					alt={user.username}
					fill
					className='z-10 rounded-xl object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2'
				/>
			) : (
				<Card className='flex h-full w-full flex-col items-center justify-center gap-x-4 rounded-lg transition-transform group-hover:translate-x-2 group-hover:-translate-y-2'>
					<ChannelAvatar channel={user} isLive={isLive} />
				</Card>
			)}
			{isLive && (
				<div className='absolute top-2 right-2 z-20 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2'>
					<LiveBadge />
				</div>
			)}
		</div>
	);
}
