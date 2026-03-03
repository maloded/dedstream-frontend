import { useTranslations } from 'next-intl';
import { PropsWithChildren } from 'react';

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/common/Dialog';

import { FindSessionsByUserQuery } from '@/graphql/generated/output';
import { formatDate } from '@/utils/format-data';

interface SessionModalProps {
	session: FindSessionsByUserQuery['findSessionsByUser'][0];
}

export function SessionModal({
	session,
	children,
}: PropsWithChildren<SessionModalProps>) {
	const t = useTranslations('dashboard.settings.sessions.sessionModal');

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle className='text-xl'>{t('heading')}</DialogTitle>
				<div className='space-y-3'>
					<div className='flex items-center'>
						<span className='font-medium'>{t('device')}</span>
						<span className='text-muted-foreground ml-auto'>
							{session.metadata.device.browser} -{' '}
							{session.metadata.device.os}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('location')}</span>
						<span className='text-muted-foreground ml-auto'>
							{session.metadata.location.country},{' '}
							{session.metadata.location.city}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('ipAddress')}</span>
						<span className='text-muted-foreground ml-auto'>
							{session.metadata.ip}
						</span>
					</div>
                    					<div className='flex items-center'>
						<span className='font-medium'>{t('createdAt')}</span>
						<span className='text-muted-foreground ml-auto'>
							{formatDate(session.createdAt, true)}
						</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
