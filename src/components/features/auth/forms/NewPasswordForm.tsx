'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
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

import { useNewPasswordMutation } from '@/graphql/generated/output';

import {
	type TypeNewPasswordSchema,
	newPasswordSchema,
} from '@/schemas/auth/new-password.schema';

import { AuthWrapper } from '../AuthWrapper';

export function NewPasswordForm() {
	const t = useTranslations('auth.newPassword');

	const router = useRouter();

	const params = useParams<{ token: string }>();

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: '',
			passwordRepeat: '',
		},
	});

	const [newPassword, { loading: isLoadingNew }] = useNewPasswordMutation({
		onCompleted() {
			toast.success(t('successMessage'));
			router.push('/account/login');
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeNewPasswordSchema) {
		newPassword({ variables: { data: { ...data, token: params.token } } });
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
									disabled={isLoadingNew}
									type='password'
									autoComplete='off'
								/>
								<FieldDescription>
									{t('passwordDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name='passwordRepeat'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									{t('passwordRepeatLabel')}
								</FieldLabel>
								<Input
									{...field}
									id='form-rhf-demo-title'
									aria-invalid={fieldState.invalid}
									placeholder='********'
									disabled={isLoadingNew}
									type='password'
									autoComplete='off'
								/>
								<FieldDescription>
									{t('passwordRepeatDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingNew}
					>
						{t('submitButton')}
					</Button>
				</FieldGroup>
			</form>
		</AuthWrapper>
	);
}
