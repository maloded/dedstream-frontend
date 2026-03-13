import { useEffect, useState } from 'react';

import {
	type FindChannelByUsernameQuery,
	type FindChatMessagesByStreamQuery,
	useChatMessageAddedSubscription,
	useFindChatMessagesByStreamQuery,
	useFindSponsorsByChannelQuery,
} from '@/graphql/generated/output';

import { MessageItem } from './MessageItem';

interface MessagesListProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function MessagesList({ channel }: MessagesListProps) {
	const { data } = useFindChatMessagesByStreamQuery({
		variables: {
			streamId: channel.stream.id,
		},
	});

	const { data: sponsorsData } = useFindSponsorsByChannelQuery({
		variables: {
			channelId: channel.id,
		},
	});

	const sponsors = sponsorsData?.findSponsorsByChannel ?? [];

	const sponsorsIds = new Set(sponsors.map(sponsor => sponsor.user.id));

	const [messages, setMessages] = useState<
		FindChatMessagesByStreamQuery['findChatMessagesByStream']
	>([]);

	useEffect(() => {
		if (data?.findChatMessagesByStream) {
			// eslint-disable-next-line
			setMessages(data.findChatMessagesByStream);
		}
	}, [data]);

	const { data: newMessageData } = useChatMessageAddedSubscription({
		variables: {
			streamId: channel.stream.id,
		},
	});

	useEffect(() => {
		if (newMessageData) {
			const newMessage = newMessageData.chatMessageAdded;
			// eslint-disable-next-line
			setMessages(prev => [newMessage, ...prev]);
		}
	}, [newMessageData]);

	return (
		<div className='flex h-full flex-1 flex-col-reverse overflow-y-auto'>
			{messages.map((message, index) => (
				<MessageItem
					message={message}
					key={index}
					isSponsor={sponsorsIds.has(message.user.id)}
				/>
			))}
		</div>
	);
}
