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

import { useLoginUserMutation } from '@/graphql/generated/output';

import { type TypeLoginSchema, loginSchema } from '@/schemas/auth/login.schema';

import { AuthWrapper } from '../AuthWrapper';
import Link from 'next/link';

export function LoginForm() {
	const t = useTranslations('auth.login');

	const router = useRouter();

	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false);

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			login: '',
			password: '',
		},
	});

	const [login, { loading: isLoadingLogin }] = useLoginUserMutation({
		onCompleted(data) {
			if (data.loginUser.message) {
				setIsShowTwoFactor(true);
			} else {
				toast.success(t('successMessage'));
				router.push('/dashboard/settings');
			}
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeLoginSchema) {
		login({ variables: { data } });
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref='/account/create'
		>
			<form
				id='form-rhf-demo'
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-y-3'
			>
				<FieldGroup>
					{isShowTwoFactor ? (
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
								name='login'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='form-rhf-demo-title'>
											{t('loginLabel')}
										</FieldLabel>
										<Input
											{...field}
											id='form-rhf-demo-title'
											aria-invalid={fieldState.invalid}
											placeholder='ded'
											disabled={isLoadingLogin}
											autoComplete='off'
										/>
										<FieldDescription>
											{t('loginDescription')}
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
										<div className='flex items-center justify-between'>
											<FieldLabel htmlFor='form-rhf-demo-title'>
												{t('passwordLabel')}
											</FieldLabel>
											<Link
												href='/account/recovery'
												className='ml-auto inline-block text-sm'
											>
												{t('forgotPassword')}
											</Link>
										</div>
										<Input
											{...field}
											id='form-rhf-demo-title'
											aria-invalid={fieldState.invalid}
											placeholder='********'
											disabled={isLoadingLogin}
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
						disabled={!isValid || isLoadingLogin}
					>
						{t('submitButton')}
					</Button>
				</FieldGroup>
			</form>
		</AuthWrapper>
	);
}
