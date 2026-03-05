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
	FieldGroup,
} from '@/components/ui/common/Field';
import { Label } from '@/components/ui/common/Label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/common/Select';

import { useCreateIngressMutation } from '@/graphql/generated/output';

import { useCurrent } from '@/hooks/useCurrent';

import {
	IngressType,
	type TypeCreateIngressSchema,
	createIngressSchema,
} from '@/schemas/stream/create-ingress.schema';

export function CreateIngressForm() {
	const t = useTranslations('dashboard.keys.createModal');

	const [isOpen, setIsOpen] = useState(false);

	const { refetch } = useCurrent();

	const form = useForm<TypeCreateIngressSchema>({
		resolver: zodResolver(createIngressSchema),
		defaultValues: {
			ingressType: IngressType.RTMP,
		},
	});

	const [create, { loading: isLoadingCreate }] = useCreateIngressMutation({
		onCompleted() {
            setIsOpen(false);
			refetch();
			toast.success(t('successMessage'));
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeCreateIngressSchema) {
		create({
			variables: { ingressType: data.ingressType },
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>{t('trigger')}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>
				<form
					className='space-y-6'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Label>{t('ingressTypeLabel')}</Label>
						<Controller
							name='ingressType'
							control={form.control}
							render={({ field }) => (
								<Field>
									<Select
										onValueChange={value => {
											field.onChange(Number(value));
										}}
										defaultValue={field.value.toString()}
									>
										<SelectTrigger>
											<SelectValue
												placeholder={t(
													'ingressTypePlaceholder',
												)}
											/>
											<SelectContent>
												<SelectItem
													value={IngressType.RTMP.toString()}
													disabled={isLoadingCreate}
												>
													RTMP
												</SelectItem>
												<SelectItem
													value={IngressType.WHIP.toString()}
													disabled={isLoadingCreate}
												>
													WHIP
												</SelectItem>
											</SelectContent>
										</SelectTrigger>
									</Select>
									<FieldDescription>
										{t('ingressTypeDescription')}
									</FieldDescription>
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
