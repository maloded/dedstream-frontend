'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FieldGroup } from '@/components/ui/common/Field';
import { Heading } from '@/components/ui/elements/Heading';
import {
	ToggleCard,
	ToggleCardSkeleton,
} from '@/components/ui/elements/ToggleCard';

import { useChangeChatSettingsMutation } from '@/graphql/generated/output';

import { useCurrent } from '@/hooks/useCurrent';

import {
	type TypeChangeChatSettingsSchema,
	changeChatSettingsSchema,
} from '@/schemas/stream/change-chat-settings.schema';

export function ChangeChatSettings() {
	const t = useTranslations('dashboard.chat');

	const { user, isLoadingProfile } = useCurrent();

	const form = useForm<TypeChangeChatSettingsSchema>({
		resolver: zodResolver(changeChatSettingsSchema),
		values: {
			isChatEnabled: user?.stream?.isChatEnabled || false,
			isChatFollowersOnly: user?.stream?.isChatFollowersOnly || false,
			isChatPremiumFollowersOnly:
				user?.stream?.isChatPremiumFollowersOnly || false,
		},
	});

	const [update, { loading: isLoadingUpdate }] =
		useChangeChatSettingsMutation({
			onCompleted() {
				toast.success(t('successMessage'));
			},
			onError() {
				toast.error(t('errorMessage'));
			},
		});

	function onChange(
		field: keyof TypeChangeChatSettingsSchema,
		value: boolean,
	) {
		form.setValue(field, value);
		update({
			variables: {
				data: { ...form.getValues(), [field]: value },
			},
		});
	}
	return (
		<div className='lg:px-10'>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size='lg'
			/>
			<div className='mt-3'>
				{isLoadingProfile ? (
					Array.from({ length: 3 }).map((_, index) => (
						<ToggleCardSkeleton key={index} />
					))
				) : (
					<form>
						<FieldGroup className='space-y-6'>
							<Controller
								name='isChatEnabled'
								control={form.control}
								render={({ field }) => (
									<ToggleCard
										heading={t('isChatEnabled.heading')}
										description={t(
											'isChatEnabled.description',
										)}
										value={field.value}
										isDisabled={isLoadingUpdate}
										onChange={value =>
											onChange('isChatEnabled', value)
										}
									/>
								)}
							/>
							<Controller
								name='isChatFollowersOnly'
								control={form.control}
								render={({ field }) => (
									<ToggleCard
										heading={t(
											'isChatFollowersOnly.heading',
										)}
										description={t(
											'isChatFollowersOnly.description',
										)}
										value={field.value}
										isDisabled={isLoadingUpdate}
										onChange={value =>
											onChange(
												'isChatFollowersOnly',
												value,
											)
										}
									/>
								)}
							/>
							<Controller
								name='isChatPremiumFollowersOnly'
								control={form.control}
								render={({ field }) => (
									<ToggleCard
										heading={t(
											'isChatPremiumFollowersOnly.heading',
										)}
										description={t(
											'isChatPremiumFollowersOnly.description',
										)}
										value={field.value}
										isDisabled={isLoadingUpdate}
										onChange={value =>
											onChange(
												'isChatPremiumFollowersOnly',
												value,
											)
										}
									/>
								)}
							/>
						</FieldGroup>
					</form>
				)}
			</div>
		</div>
	);
}
