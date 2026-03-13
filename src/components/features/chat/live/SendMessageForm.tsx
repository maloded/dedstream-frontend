import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizonal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/Button';
import { Field } from '@/components/ui/common/Field';
import { Textarea } from '@/components/ui/common/Textarea';
import { EmojiPicker } from '@/components/ui/elements/EmojiPicker';

import {
	type FindChannelByUsernameQuery,
	useSendChatMessageMutation,
} from '@/graphql/generated/output';

import {
	type TypeSendMessageSchema,
	sendMessageSchema,
} from '@/schemas/chat/send-message.schema';

interface SendMessageFormProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
	isDisabled: boolean;
}

export function SendMessageForm({ channel, isDisabled }: SendMessageFormProps) {
	const t = useTranslations('stream.chat.sendMessage');

	const form = useForm<TypeSendMessageSchema>({
		resolver: zodResolver(sendMessageSchema),
		defaultValues: {
			text: '',
		},
	});

	const [send, { loading: isLoadingSend }] = useSendChatMessageMutation({
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeSendMessageSchema) {
		send({
			variables: {
				data: {
					text: data.text,
					streamId: channel.stream.id,
				},
			},
		});
		form.reset();
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='mt-3 flex items-center gap-x-4'
		>
			<Controller
				name='text'
				control={form.control}
				render={({ field }) => (
					<Field className='w-60'>
						<div className='relative'>
							<Textarea
								{...field}
								placeholder={t('placeholder')}
								rows={1}
								ref={el => {
									field.ref(el);

									if (el) {
										el.style.height = 'auto';
										el.style.height = `${el.scrollHeight}px`;
									}
								}}
								onInput={e => {
									const el = e.currentTarget;
									el.style.height = 'auto';
									el.style.height = `${el.scrollHeight}px`;
								}}
								onKeyDown={e => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault();
										form.handleSubmit(onSubmit)();
									}
								}}
								className='min-h-[40px] resize-none pr-8'
								disabled={isDisabled || isLoadingSend}
								autoComplete='off'
							/>
							<div className='absolute top-2 right-2 cursor-pointer'>
								<EmojiPicker
									onChange={(emoji: string) =>
										field.onChange(
											`${field.value} ${emoji}`,
										)
									}
									isDisabled={isDisabled || isLoadingSend}
								/>
							</div>
						</div>
					</Field>
				)}
			/>
			<Button
				size='lgIcon'
				type='submit'
				disabled={isDisabled || !isValid || isLoadingSend}
			>
				<SendHorizonal className='size-4' />
			</Button>
		</form>
	);
}
