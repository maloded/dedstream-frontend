import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/common/Field';
import { Input } from '@/components/ui/common/Input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/common/Select';
import { Separator } from '@/components/ui/common/Separator';

import {
	type FindChannelByUsernameQuery,
	useChangeStreamInfoMutation,
	useFindAllCategoriesQuery,
} from '@/graphql/generated/output';

import {
	type TypeChangeStreamInfoSchema,
	changeStreamInfoSchema,
} from '@/schemas/stream/change-stream-info.schema';
import { Button } from '@/components/ui/common/Button';
import { useRouter } from 'next/navigation';

interface ChangeInfoFormProps {
	stream: FindChannelByUsernameQuery['findChannelByUsername']['stream'];
}

export function ChangeInfoForm({ stream }: ChangeInfoFormProps) {
	const t = useTranslations('stream.settings.info');

    const router = useRouter();

	const { data } = useFindAllCategoriesQuery();
	const categories = data?.findAllCategories ?? [];

	const form = useForm<TypeChangeStreamInfoSchema>({
		resolver: zodResolver(changeStreamInfoSchema),
		values: {
			title: stream?.title ?? '',
			categoryId: stream?.category?.id ?? '',
		},
	});

	const [update, { loading: isLoadingUpdate }] = useChangeStreamInfoMutation({
		onCompleted() {
			toast.success(t('successMessage'));
            router.refresh();
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeChangeStreamInfoSchema) {
		update({ variables: { data } });
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Separator />
			<FieldGroup>
				<Controller
					name='title'
					control={form.control}
					render={({ field }) => (
						<Field className='py-3'>
							<FieldLabel htmlFor='form-rhf-demo-title'>
								{t('titleLabel')}
							</FieldLabel>
							<Input
								{...field}
								placeholder={t('titlePlaceholder')}
								disabled={isLoadingUpdate}
								autoComplete='off'
							/>
							<FieldDescription>
								{t('titleDescription')}
							</FieldDescription>
						</Field>
					)}
				/>
				<Separator />
				<Controller
					name='categoryId'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							className='py-3'
							data-invalid={fieldState.invalid}
						>
							<FieldLabel htmlFor='form-rhf-demo-title'>
								{t('categoryLabel')}
							</FieldLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={t('categoryPlaceholder')}
									/>
								</SelectTrigger>
								<SelectContent className='p-0'>
									{categories.map(category => (
										<SelectItem
											key={category.id}
											value={category.id}
										>
											{category.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FieldDescription>
								{t('categoryDescription')}
							</FieldDescription>
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
	);
}
