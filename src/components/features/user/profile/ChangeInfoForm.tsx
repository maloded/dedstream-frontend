'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/Button';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/common/Field';
import { Input } from '@/components/ui/common/Input';
import { Separator } from '@/components/ui/common/Separator';
import { Skeleton } from '@/components/ui/common/Skeleton';
import { Textarea } from '@/components/ui/common/Textarea';
import { FormWrapper } from '@/components/ui/elements/FormWrapper';

import { useChangeProfileInfoMutation } from '@/graphql/generated/output';

import { useCurrent } from '@/hooks/useCurrent';

import {
	type TypeChangeInfoSchema,
	changeInfoSchema,
} from '@/schemas/user/change-info.schema';

export function ChangeInfoForm() {
	const t = useTranslations('dashboard.settings.profile.info');

	const { user, isLoadingProfile, refetch } = useCurrent();

	const form = useForm<TypeChangeInfoSchema>({
		resolver: zodResolver(changeInfoSchema),
		values: {
			username: user?.username ?? '',
			displayName: user?.displayName ?? '',
			bio: user?.bio ?? '',
		},
	});

	const [update, { loading: isLoadingUpdate }] = useChangeProfileInfoMutation(
		{
			onCompleted() {
				refetch();
				toast.success(t('successMessage'));
			},
			onError() {
				toast.error(t('errorMessage'));
			},
		},
	);

	const { isValid, isDirty } = form.formState;

	function onSubmit(data: TypeChangeInfoSchema) {
		update({ variables: { data } });
	}

	return isLoadingProfile ? (
		<ChangeInfoFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<form
				id='form-rhf-demo'
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-y-3'
			>
				<FieldGroup>
					<Controller
						name='username'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								className='px-5 pb-3'
								data-invalid={fieldState.invalid}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									{t('usernameLabel')}
								</FieldLabel>
								<Input
									{...field}
									id='form-rhf-demo-title'
									aria-invalid={fieldState.invalid}
									placeholder={t('usernamePlaceholder')}
									disabled={isLoadingUpdate}
									autoComplete='off'
								/>
								<FieldDescription>
									{t('usernameDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Separator />
					<Controller
						name='displayName'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								className='px-5 pb-3'
								data-invalid={fieldState.invalid}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									{t('displayNameLabel')}
								</FieldLabel>
								<Input
									{...field}
									id='form-rhf-demo-title'
									aria-invalid={fieldState.invalid}
									placeholder={t('displayNamePlaceholder')}
									disabled={isLoadingUpdate}
									autoComplete='off'
								/>
								<FieldDescription>
									{t('displayNameDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Separator />
					<Controller
						name='bio'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								className='px-5 pb-3'
								data-invalid={fieldState.invalid}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									{t('bioLabel')}
								</FieldLabel>
								<Textarea
									{...field}
									id='form-rhf-demo-title'
									aria-invalid={fieldState.invalid}
									placeholder={t('bioPlaceholder')}
									disabled={isLoadingUpdate}
									autoComplete='off'
								/>
								<FieldDescription>
									{t('bioDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Separator />
					<div className='flex justify-end px-5'>
						<Button disabled={!isValid || !isDirty || isLoadingUpdate}>
							{t('submitButton')}
						</Button>
					</div>
				</FieldGroup>
			</form>
		</FormWrapper>
	);
}

export function ChangeInfoFormSkeleton() {
	return <Skeleton className='h-96 w-full' />;
}
