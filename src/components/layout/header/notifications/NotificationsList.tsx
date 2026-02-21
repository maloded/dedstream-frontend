import parse from 'html-react-parser';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react/jsx-runtime';

import { Separator } from '@/components/ui/common/Separator';

import {
	useFindNotificationsByUserQuery,
	useFindUnreadNotificationsCountQuery,
} from '@/graphql/generated/output';

import { getNotificationIcon } from '@/utils/get-notification-icon';

export function NotificationsList() {
	const t = useTranslations('layout.header.headerMenu.profileMenu.notifications');

	const { refetch } = useFindUnreadNotificationsCountQuery();

	const { data, loading: isLoadingNotifications } =
		useFindNotificationsByUserQuery({
			onCompleted() {
				refetch();
			},
		});

	const notifications = data?.findNotificationsByUser ?? [];

	return (
		<>
			<h2 className='text-center text-lg font-medium'>{t('heading')}</h2>
			<Separator className='my-2' />
			{isLoadingNotifications ? (
				<div className='text-foreground flex items-center justify-center gap-x-2 text-sm'>
					<Loader2 className='size-5 animate-spin' />
					{t('loading')}
				</div>
			) : notifications.length ? (
				notifications.map((notification, index) => {
					const Icon = getNotificationIcon(notification.type);

					return (
						<Fragment key={index}>
							<div className='flex items-center gap-x-3 text-sm'>
								<div className='bg-foreground rounded-full p-2'>
									<Icon className='text-secondary size-6' />
								</div>
								<div>{parse(notification.message)}</div>
							</div>
							{index < notifications.length - 1 && (
								<Separator className='my-2' />
							)}
						</Fragment>
					);
				})
			) : (
				<div className='text-muted-foreground text-center'>
					{t('empty')}
				</div>
			)}
		</>
	);
}
