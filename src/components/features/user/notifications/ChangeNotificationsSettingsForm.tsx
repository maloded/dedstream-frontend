'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FieldGroup } from '@/components/ui/common/Field';
import {
	ToggleCard,
	ToggleCardSkeleton,
} from '@/components/ui/elements/ToggleCard';

import { useChangeNotificationSettingsMutation } from '@/graphql/generated/output';

import { useCurrent } from '@/hooks/useCurrent';

import {
	type TypeChangeNotificationsSettingsSchema,
	changeNotificationsSettingsSchema,
} from '@/schemas/user/change-notifications-settings';

export function ChangeNotificationsSettingsForm() {
	const t = useTranslations('dashboard.settings.notifications');

	const { user, isLoadingProfile } = useCurrent();

	const form = useForm<TypeChangeNotificationsSettingsSchema>({
		resolver: zodResolver(changeNotificationsSettingsSchema),
		values: {
			siteNotifications:
				user?.notificationSettings?.siteNotifications || false,
			telegramNotifications:
				user?.notificationSettings?.telegramNotifications || false,
		},
	});

	const [update, { loading: isLoadingUpdate }] =
		useChangeNotificationSettingsMutation({
			onCompleted(data) {
				toast.success(t('successMessage'));
				if (data.changeNotificationSettings.telegramAuthToken) {
					window.open(
						`https://t.me/dedstream_bot?start=${data.changeNotificationSettings.telegramAuthToken}`,
						'_blank',
					);
				}
			},
		});

	function onChange(
		field: keyof TypeChangeNotificationsSettingsSchema,
		value: boolean,
	) {
		form.setValue(field, value);
		update({
			variables: {
				data: { ...form.getValues(), [field]: value },
			},
		});
	}

	return isLoadingProfile ? (
		Array.from({ length: 2 }).map((_, index) => (
			<ToggleCardSkeleton key={index} />
		))
	) : (
		<form>
			<FieldGroup>
				<Controller
					name='siteNotifications'
					control={form.control}
					render={({ field }) => (
						<ToggleCard
							heading={t('siteNotifications.heading')}
							description={t('siteNotifications.description')}
							value={field.value}
							isDisabled={isLoadingUpdate}
							onChange={value =>
								onChange('siteNotifications', value)
							}
						/>
					)}
				/>
				<Controller
					name='telegramNotifications'
					control={form.control}
					render={({ field }) => (
						<ToggleCard
							heading={t('telegramNotifications.heading')}
							description={t('telegramNotifications.description')}
							value={field.value}
							isDisabled={isLoadingUpdate}
							onChange={value =>
								onChange('telegramNotifications', value)
							}
						/>
					)}
				/>
			</FieldGroup>
		</form>
	);
}
