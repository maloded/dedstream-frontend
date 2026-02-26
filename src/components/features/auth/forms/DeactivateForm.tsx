'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/common/InputOTP';

import { useDeactivateAccountMutation } from '@/graphql/generated/output';

import { useAuth } from '@/hooks/useAuth';

import {
	type TypeDeactivateSchema,
	deactivateSchema,
} from '@/schemas/user/deactivate.schema';

import { AuthWrapper } from '../AuthWrapper';

export function DeactivateForm() {
	const t = useTranslations('auth.deactivate');

	const { exit } = useAuth();

	const router = useRouter();

	const [isShowConfirm, setIsShowConfirm] = useState(false);

	const form = useForm<TypeDeactivateSchema>({
		resolver: zodResolver(deactivateSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [deactivate, { loading: isLoadingDeactivate }] =
		useDeactivateAccountMutation({
			onCompleted(data) {
				if (data.deactivateAccount.message) {
					setIsShowConfirm(true);
				} else {
					exit();
					toast.success(t('successMessage'));
					router.push('/');
				}
			},
			onError() {
				toast.error(t('errorMessage'));
			},
		});

	const { isValid } = form.formState;

	function onSubmit(data: TypeDeactivateSchema) {
		deactivate({ variables: { data } });
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref='/dashboard/settings'
		>
			<form
				id='form-rhf-demo'
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-y-3'
			>
				<FieldGroup>
					{isShowConfirm ? (
						<Controller
							name='pin'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-rhf-demo-title'>
										{t('pinLabel')}
									</FieldLabel>
									<InputOTP maxLength={6} {...field}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
									<FieldDescription>
										{t('pinDescription')}
									</FieldDescription>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					) : (
						<>
							<Controller
								name='email'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='form-rhf-demo-title'>
											{t('emailLabel')}
										</FieldLabel>
										<Input
											{...field}
											id='form-rhf-demo-title'
											aria-invalid={fieldState.invalid}
											placeholder='ded@example.com'
											disabled={isLoadingDeactivate}
											autoComplete='off'
										/>
										<FieldDescription>
											{t('emailDescription')}
										</FieldDescription>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
							<Controller
								name='password'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='form-rhf-demo-title'>
											{t('passwordLabel')}
										</FieldLabel>
										<Input
											{...field}
											id='form-rhf-demo-title'
											aria-invalid={fieldState.invalid}
											placeholder='********'
											disabled={isLoadingDeactivate}
											type='password'
											autoComplete='off'
										/>
										<FieldDescription>
											{t('passwordDescription')}
										</FieldDescription>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
						</>
					)}
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingDeactivate}
					>
						{t('submitButton')}
					</Button>
				</FieldGroup>
			</form>
		</AuthWrapper>
	);
}
