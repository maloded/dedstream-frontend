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

import { useChangeEmailMutation } from '@/graphql/generated/output';

import { useCurrent } from '@/hooks/useCurrent';

import {
	type TypeChangeEmailSchema,
	changeEmailSchema,
} from '@/schemas/user/change-email.schema';

export function ChangeEmailForm() {
	const t = useTranslations('dashboard.settings.account.email');

	const { user, isLoadingProfile, refetch } = useCurrent();

	const form = useForm<TypeChangeEmailSchema>({
		resolver: zodResolver(changeEmailSchema),
		values: {
			email: user?.email ?? '',
		},
	});

	const [update, { loading: isLoadingUpdate }] = useChangeEmailMutation({
		onCompleted() {
			refetch();
			toast.success(t('successMessage'));
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid, isDirty } = form.formState;

	function onSubmit(data: TypeChangeEmailSchema) {
		update({ variables: { data } });
	}

	return isLoadingProfile ? (
		<ChangeEmailFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<form
				id='form-rhf-demo'
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-y-3'
			>
				<FieldGroup>
					<Controller
						name='email'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								className='px-5 pb-3'
								data-invalid={fieldState.invalid}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									{t('emailLabel')}
								</FieldLabel>
								<Input
									{...field}
									id='form-rhf-demo-title'
									aria-invalid={fieldState.invalid}
									placeholder='ded@example.com'
									disabled={isLoadingUpdate}
									autoComplete='off'
								/>
								<FieldDescription>
									{t('emailDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Separator />
					<div className='flex justify-end px-5'>
						<Button
							disabled={!isValid || !isDirty || isLoadingUpdate}
						>
							{t('submitButton')}
						</Button>
					</div>
				</FieldGroup>
			</form>
		</FormWrapper>
	);
}

export function ChangeEmailFormSkeleton() {
	return <Skeleton className='h-64 w-full' />;
}
