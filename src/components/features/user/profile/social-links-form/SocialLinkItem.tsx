import type { DraggableProvided } from '@hello-pangea/dnd';
import { zodResolver } from '@hookform/resolvers/zod';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/Button';
import { Field, FieldGroup } from '@/components/ui/common/Field';
import { Input } from '@/components/ui/common/Input';

import {
	type FindSocialLinksQuery,
	useFindSocialLinksQuery,
	useRemoveSocialLinkMutation,
	useUpdateSocialLinkMutation,
} from '@/graphql/generated/output';

import {
	type TypeSocialLinksSchema,
	socialLinksSchema,
} from '@/schemas/user/social-links.schema';

interface SocialLinkItemProps {
	socialLink: FindSocialLinksQuery['findSocialLinks'][0];
	provided: DraggableProvided;
}

export function SocialLinkItem({ socialLink, provided }: SocialLinkItemProps) {
	const t = useTranslations(
		'dashboard.settings.profile.socialLinks.editForm',
	);

	const [editingId, setIsEditingId] = useState<string | null>(null);

	const { refetch } = useFindSocialLinksQuery();

	const form = useForm<TypeSocialLinksSchema>({
		resolver: zodResolver(socialLinksSchema),
		values: {
			title: socialLink.title ?? '',
			url: socialLink.url ?? '',
		},
	});

	const { isValid, isDirty } = form.formState;

	function toggleEditing(id: string | null) {
		setIsEditingId(id);
	}

	const [update, { loading: isLoadingUpdate }] = useUpdateSocialLinkMutation({
		onCompleted() {
			toggleEditing(null);
			refetch();
			toast.success(t('successUpdateMessage'));
		},
		onError() {
			toast.error(t('errorUpdateMessage'));
		},
	});

	const [remove, { loading: isLoadingRemove }] = useRemoveSocialLinkMutation({
		onCompleted() {
			refetch();
			toast.success(t('successRemoveMessage'));
		},
		onError() {
			toast.error(t('errorRemoveMessage'));
		},
	});

	function onSubmit(data: TypeSocialLinksSchema) {
		update({ variables: { id: socialLink.id, data } });
	}

	return (
		<div
			className='border-border bg-background mb-4 flex items-center gap-x-2 rounded-md border text-sm'
			// eslint-disable-next-line react-hooks/refs
			ref={provided.innerRef}
			// eslint-disable-next-line react-hooks/refs
			{...provided.draggableProps}
		>
			<div
				className='border-r-border text-foreground rounded-l-md border-r px-2 py-9 transition'
				// eslint-disable-next-line react-hooks/refs
				{...provided.dragHandleProps}
			>
				<GripVertical className='size-5' />
			</div>
			<div className='space-y-1 px-2'>
				{editingId === socialLink.id ? (
					<form
						id='form-rhf-demo'
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex gap-x-6'
					>
						<div className='w-96 space-y-2'>
							<FieldGroup>
								<Controller
									name='title'
									control={form.control}
									render={({ field }) => (
										<Field>
											<Input
												{...field}
												placeholder='YouTube'
												className='h-8'
												disabled={
													isLoadingUpdate ||
													isLoadingRemove
												}
												autoComplete='off'
											/>
										</Field>
									)}
								/>
								<Controller
									name='url'
									control={form.control}
									render={({ field }) => (
										<Field>
											<Input
												{...field}
												placeholder='https://youtube.com/@ded7'
												className='h-8'
												disabled={
													isLoadingUpdate ||
													isLoadingRemove
												}
												autoComplete='off'
											/>
										</Field>
									)}
								/>
							</FieldGroup>
						</div>
						<div className='flex items-center gap-x-4'>
							<Button
								onClick={() => toggleEditing(null)}
								variant='secondary'
							>
								{t('cancelButton')}
							</Button>
							<Button
								disabled={
									isLoadingUpdate ||
									!isValid ||
									!isDirty ||
									isLoadingRemove
								}
							>
								{t('submitButton')}
							</Button>
						</div>
					</form>
				) : (
					<>
						<h2 className='text-foreground text-lg font-semibold'>
							{socialLink.title}
						</h2>
						<p className='text-muted-foreground'>
							{socialLink.url}
						</p>
					</>
				)}
			</div>
			<div className='ml-auto flex items-center gap-x-2 pr-4'>
				{editingId !== socialLink.id && (
					<Button
						onClick={() => toggleEditing(socialLink.id)}
						variant='ghost'
						size='lgIcon'
					>
						<Pencil className='text-muted-foreground size-4' />
					</Button>
				)}
				<Button
					onClick={() => remove({ variables: { id: socialLink.id } })}
					variant='ghost'
					size='lgIcon'
				>
					<Trash2 className='text-muted-foreground size-4' />
				</Button>
			</div>
		</div>
	);
}
