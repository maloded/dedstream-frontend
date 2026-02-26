'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Skeleton } from '@/components/ui/common/Skeleton';
import { FormWrapper } from '@/components/ui/elements/FormWrapper';

import {
	useCreateSocialLinkMutation,
	useFindSocialLinksQuery,
} from '@/graphql/generated/output';

import {
	type TypeSocialLinksSchema,
	socialLinksSchema,
} from '@/schemas/user/social-links.schema';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/common/Field';
import { Input } from '@/components/ui/common/Input';
import { Separator } from '@/components/ui/common/Separator';
import { Button } from '@/components/ui/common/Button';
import { SocialLinksList } from './SocialLinksList';

export function SocialLinksForm() {
	const t = useTranslations(
		'dashboard.settings.profile.socialLinks.createForm',
	);

	const { loading: isLoadingLinks, refetch } = useFindSocialLinksQuery();

	const form = useForm<TypeSocialLinksSchema>({
		resolver: zodResolver(socialLinksSchema),
		defaultValues: {
			title: '',
			url: '',
		},
	});

	const [create, { loading: isLoadingCreate }] = useCreateSocialLinkMutation({
		onCompleted() {
			form.reset();
			refetch();
			toast.success(t('successMessage'));
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeSocialLinksSchema) {
		create({ variables: { data } });
	}

	return isLoadingLinks ? (
		<SocialLinksFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<form
				id='form-rhf-demo'
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-y-3'
			>
				<FieldGroup>
					<Controller
						name='title'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								className='px-5 pb-3'
								data-invalid={fieldState.invalid}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									{t('titleLabel')}
								</FieldLabel>
								<Input
									{...field}
									id='form-rhf-demo-title'
									aria-invalid={fieldState.invalid}
									placeholder={t('titlePlaceholder')}
									disabled={isLoadingCreate}
									autoComplete='off'
								/>
								<FieldDescription>
									{t('titleDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Separator />
					<Controller
						name='url'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								className='px-5 pb-3'
								data-invalid={fieldState.invalid}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									{t('urlLabel')}
								</FieldLabel>
								<Input
									{...field}
									id='form-rhf-demo-title'
									aria-invalid={fieldState.invalid}
									placeholder={t('urlPlaceholder')}
									disabled={isLoadingCreate}
									autoComplete='off'
								/>
								<FieldDescription>
									{t('urlDescription')}
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Separator />
					<div className='flex justify-end px-5 pb-5 pt-3'>
						<Button
							disabled={!isValid || isLoadingCreate}
						>
							{t('submitButton')}
						</Button>
					</div>
				</FieldGroup>
			</form>
			<SocialLinksList />
		</FormWrapper>
	);
}

export function SocialLinksFormSkeleton() {
	return <Skeleton className='h-72 w-full' />;
}
