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
import { FormWrapper } from '@/components/ui/elements/FormWrapper';

import { useChangePasswordMutation } from '@/graphql/generated/output';

import { useCurrent } from '@/hooks/useCurrent';

import {
	type TypeChangePasswordSchema,
	changePasswordSchema,
} from '@/schemas/user/change-password.schema';

export function ChangePasswordForm() {
	const t = useTranslations('dashboard.settings.account.password');

	const { isLoadingProfile, refetch } = useCurrent();

	const form = useForm<TypeChangePasswordSchema>({
		resolver: zodResolver(changePasswordSchema),
		values: {
			oldPassword: '',
			newPassword: '',
		},
	});

	const [update, { loading: isLoadingUpdate }] = useChangePasswordMutation({
		onCompleted() {
			refetch();
			form.reset()
			toast.success(t('successMessage'));
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeChangePasswordSchema) {
		update({ variables: { data } });
	}

	return isLoadingProfile ? (
		<ChangePasswordFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<form
				id='form-rhf-demo'
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-y-3'
			>
				<FieldGroup>
					<Controller
						name='oldPassword'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								className='px-5 pb-3'
								data-invalid={fieldState.invalid}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									{t('oldPasswordLabel')}
								</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder='********'
									type='password'
									disabled={isLoadingUpdate}
									autoComplete='off'
								/>
								<FieldDescription>
									{t('oldPasswordDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Separator />
					<Controller
						name='newPassword'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								className='px-5 pb-3'
								data-invalid={fieldState.invalid}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									{t('newPasswordLabel')}
								</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder='********'
									type='password'
									disabled={isLoadingUpdate}
									autoComplete='off'
								/>
								<FieldDescription>
									{t('newPasswordDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Separator />
					<div className='flex justify-end px-5'>
						<Button disabled={!isValid || isLoadingUpdate}>
							{t('submitButton')}
						</Button>
					</div>
				</FieldGroup>
			</form>
		</FormWrapper>
	);
}

export function ChangePasswordFormSkeleton() {
	return <Skeleton className='h-96 w-full' />;
}
