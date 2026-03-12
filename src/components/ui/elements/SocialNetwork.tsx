import {
	FaGithub,
	FaInstagram,
	FaReddit,
	FaTelegram,
	FaTiktok,
	FaYoutube,
} from 'react-icons/fa';
import { FaLink, FaXTwitter } from 'react-icons/fa6';

type Props = {
	name: string;
};

export function SocialNetwork({ name }: Props) {
	const normalized = name.toLowerCase();

	let Icon = FaLink;

	switch (normalized) {
		case 'x':
		case 'twitter':
			Icon = FaXTwitter;
			break;

		case 'telegram':
			Icon = FaTelegram;
			break;

		case 'tiktok':
			Icon = FaTiktok;
			break;

		case 'instagram':
			Icon = FaInstagram;
			break;

		case 'youtube':
			Icon = FaYoutube;
			break;

		case 'reddit':
			Icon = FaReddit;
			break;

		case 'github':
			Icon = FaGithub;
			break;

		default:
			Icon = FaLink;
	}

	return (
		<div className='flex items-center gap-2'>
			<Icon className='size-4 shrink-0' />
			<span>{name}</span>
		</div>
	);
}
