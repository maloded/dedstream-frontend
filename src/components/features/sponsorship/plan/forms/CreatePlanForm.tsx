'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/Button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/common/Dialog';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/common/Field';
import { Input } from '@/components/ui/common/Input';
import { Textarea } from '@/components/ui/common/Textarea';

import { useCreateSponsorshipPlanMutation, useFindMySponsorshipPlansQuery } from '@/graphql/generated/output';

import {
	type TypeCreatePlanSchema,
	createPlanSchema,
} from '@/schemas/plan/create-plan.schema';

export function CreatePlanForm() {
	const t = useTranslations('dashboard.plans.createForm');

	const [isOpen, setIsOpen] = useState(false);

	const { refetch } = useFindMySponsorshipPlansQuery();

	const form = useForm<TypeCreatePlanSchema>({
		resolver: zodResolver(createPlanSchema),
		defaultValues: {
			title: '',
			description: '',
			price: 0,
		},
	});

	const [create, { loading: isLoadingCreate }] =
		useCreateSponsorshipPlanMutation({
			onCompleted() {
				setIsOpen(false);
				form.reset();
				refetch();
				toast.success(t('successMessage'));
			},
			onError() {
				toast.error(t('errorMessage'));
			},
		});

	const { isValid } = form.formState;

	function onSubmit(data: TypeCreatePlanSchema) {
		create({
			variables: { data },
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>{t('trigger')}</Button>
			</DialogTrigger>
			<DialogContent className='!max-w-[800px]'>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>
				<form
					className='space-y-6'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Controller
							name='title'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
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
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
						<Controller
							name='description'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor='form-rhf-demo-description'>
										{t('descriptionLabel')}
									</FieldLabel>
									<Textarea
										{...field}
										id='form-rhf-demo-description'
										aria-invalid={fieldState.invalid}
										placeholder={t('titlePlaceholder')}
										disabled={isLoadingCreate}
										autoComplete='off'
									/>
									<FieldDescription>
										{t('descriptionDescription')}
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
							name='price'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor='form-rhf-demo-price'>
										{t('priceLabel')}
									</FieldLabel>
									<Input
										{...field}
										id='form-rhf-demo-price'
										aria-invalid={fieldState.invalid}
										placeholder={t('priceLabel')}
										type='number'
										disabled={isLoadingCreate}
										autoComplete='off'
										onChange={e =>
											field.onChange(
												Number(e.target.value),
											)
										}
										value={field.value}
									/>
									<FieldDescription>
										{t('priceDescription')}
									</FieldDescription>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<div className='flex justify-end'>
							<Button disabled={!isValid || isLoadingCreate}>
								{t('submitButton')}
							</Button>
						</div>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	);
}
