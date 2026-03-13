import { Medal } from 'lucide-react';

import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar';

import { type FindChatMessagesByStreamQuery } from '@/graphql/generated/output';

import { stringToColor } from '@/utils/color';

interface MessageItemProps {
	message: FindChatMessagesByStreamQuery['findChatMessagesByStream'][0];
	isSponsor: boolean;
}

export function MessageItem({ message, isSponsor }: MessageItemProps) {
	const color = stringToColor(message.user.username ?? '');

	const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<div className='hover:bg-accent flex items-start gap-3 rounded-md px-2 py-1'>
			<p className='text-muted-foreground w-13 shrink-0 text-xs tabular-nums'>
				{formattedTime}
			</p>

			<div className='flex flex-1 items-start gap-2'>
				<ChannelAvatar
					channel={message.user}
					isLive={false}
					size='sm'
				/>

				<div className='flex flex-wrap items-baseline gap-x-1'>
					<span
						className='flex items-center gap-1 text-sm font-semibold'
						style={{ color }}
					>
						<span className='truncate'>
							{message.user.username}
						</span>

						{isSponsor && <Medal className='size-3.5 shrink-0' />}
					</span>

					<span className='text-sm break-words'>{message.text}</span>
				</div>
			</div>
		</div>
	);
}
