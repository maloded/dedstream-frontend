'use client';

import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar';

import { useCurrent } from '@/hooks/useCurrent';

export default function Home() {
	const { user, isLoadingProfile } = useCurrent();

	return (
		<div>
			{isLoadingProfile ? (
				<div>Loading...</div>
			) : user ? (
				<div>JSON.stringify(user)</div>
			) : (
				<div>no user</div>
			)}
		</div>
	);
}
