import { type VariantProps, cva } from 'class-variance-authority';

import { FindProfileQuery } from '@/graphql/generated/output';

import { getMediaSource } from '@/utils/get-media-source';
import { cn } from '@/utils/tw-merge';

import { Avatar, AvatarFallback, AvatarImage } from '../common/Avatar';

const avatarSizes = cva('', {
	variants: {
		size: {
			sm: 'size-7',
			default: 'size-9',
			lg: 'size-14',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

interface ChannelAvatarProps extends VariantProps<typeof avatarSizes> {
	channel: Pick<FindProfileQuery['findProfile'], 'username' | 'avatar'>;
	isLive?: boolean;
}

export function ChannelAvatar({ size, channel, isLive }: ChannelAvatarProps) {
	return (
		<div className='relative'>
			<Avatar
				className={cn(
					avatarSizes({ size }),
					isLive
						? 'shadow-[0_0_10px_rgba(34,197,94,0.6)] ring-green-500'
						: 'shadow-[0_0_10px_rgba(156,163,175,0.6)] ring-gray-400',
				)}
			>
				<AvatarImage
					src={getMediaSource(channel.avatar!)}
					className='object-cover'
				/>
				<AvatarFallback>{channel.username[0]}</AvatarFallback>
			</Avatar>
		</div>
	);
}
