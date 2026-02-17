'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '@/components/ui/common/Alert';
import { Button } from '@/components/ui/common/Button';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/common/Field';
import { Input } from '@/components/ui/common/Input';

import { useCreateUserMutation } from '@/graphql/generated/output';

import {
	TypeCreateAccountSchema,
	createAccountSchema,
} from '@/schemas/auth/create-account.schema';

import { AuthWrapper } from '../AuthWrapper';

export function CreateAccountForm() {
	const t = useTranslations('auth.register');

	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<TypeCreateAccountSchema>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			username: '',
			displayName: '',
			email: '',
			password: '',
		},
	});

	const [create, { loading: isLoadingCreate }] = useCreateUserMutation({
		onCompleted() {
			setIsSuccess(true);
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeCreateAccountSchema) {
		create({ variables: { data } });
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref='/account/login'
		>
			{isSuccess ? (
				<Alert>
					<CircleCheck className='size-4' />
					<AlertTitle>{t('successAlertTitle')}</AlertTitle>
					<AlertDescription>
						{t('successAlertDescription')}
					</AlertDescription>
				</Alert>
			) : (
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
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-rhf-demo-title'>
										{t('usernameLabel')}
									</FieldLabel>
									<Input
										{...field}
										id='form-rhf-demo-title'
										aria-invalid={fieldState.invalid}
										placeholder='ded'
										disabled={isLoadingCreate}
										autoComplete='off'
									/>
									<FieldDescription>
										{t('usernameDescription')}
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
							name='displayName'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='form-rhf-demo-title'>
										{t('displayNameLabel')}
									</FieldLabel>
									<Input
										{...field}
										id='form-rhf-demo-title'
										aria-invalid={fieldState.invalid}
										placeholder='dedushka'
										disabled={isLoadingCreate}
										autoComplete='off'
									/>
									<FieldDescription>
										{t('displayNameDescription')}
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
										placeholder='ded@gmail.com'
										disabled={isLoadingCreate}
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
										disabled={isLoadingCreate}
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
						<Button
							className='mt-2 w-full'
							disabled={!isValid || isLoadingCreate}
						>
							{t('submitButton')}
						</Button>
					</FieldGroup>
				</form>
			)}
		</AuthWrapper>
	);
}
