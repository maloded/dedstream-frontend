import { Share } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FaReddit, FaTelegram } from 'react-icons/fa';
import { FaFacebook, FaXTwitter } from 'react-icons/fa6';
import {
	FacebookShareButton,
	RedditShareButton,
	TelegramShareButton,
	XShareButton,
} from 'react-share';

import { Button } from '@/components/ui/common/Button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/common/Popover';

import { type FindChannelByUsernameQuery } from '@/graphql/generated/output';

interface ShareActionsProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function ShareActions({ channel }: ShareActionsProps) {
	const t = useTranslations('stream.actions.share');

	const shareUrl = `${window.location.origin}/${channel.username}`;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' size='lgIcon'>
					<Share className='size-5' />
				</Button>
			</PopoverTrigger>
			<PopoverContent side='top' className='w-[308x]'>
				<h2 className='ml-2 font-medium'>{t('heading')}</h2>
				<div className='mt-2 grid grid-cols-4 gap-4'>
					<TelegramShareButton url={shareUrl}>
						<div className='flex h-14 w-14 items-center justify-center rounded-lg bg-sky-500 transition-transform hover:-translate-y-1.5'>
							<FaTelegram className='size-7 text-white' />
						</div>
					</TelegramShareButton>
					<XShareButton url={shareUrl}>
						<div className='flex h-14 w-14 items-center justify-center rounded-lg bg-black transition-transform hover:-translate-y-1.5'>
							<FaXTwitter className='size-7 text-white' />
						</div>
					</XShareButton>
					<FacebookShareButton url={shareUrl}>
						<div className='flex h-14 w-14 items-center justify-center rounded-lg bg-blue-500 transition-transform hover:-translate-y-1.5'>
							<FaFacebook className='size-7 text-white' />
						</div>
					</FacebookShareButton>
					<RedditShareButton url={shareUrl}>
						<div className='flex h-14 w-14 items-center justify-center rounded-lg bg-orange-600 transition-transform hover:-translate-y-1.5'>
							<FaReddit className='size-7 text-white' />
						</div>
					</RedditShareButton>
				</div>
			</PopoverContent>
		</Popover>
	);
}
