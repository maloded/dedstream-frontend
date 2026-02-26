import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/Button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/common/Dialog';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from '@/components/ui/common/Field';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/common/InputOTP';
import { FormWrapper } from '@/components/ui/elements/FormWrapper';

import {
	useEnableTotpMutation,
	useGenerateTotpSecretQuery,
} from '@/graphql/generated/output';

import { useCurrent } from '@/hooks/useCurrent';

import {
	TypeEnableTotpSchema,
	enableTotpSchema,
} from '@/schemas/user/enable-totp.schema';

export function EnableTotp() {
	const t = useTranslations('dashboard.settings.account.twoFactor.enable');
	const [isOpen, setIsOpen] = useState(false);

	const { refetch } = useCurrent();

	const { data, loading: isLoadingGenerate } = useGenerateTotpSecretQuery();
	const twoFactorAuth = data?.generateTotpSecret;

	const form = useForm<TypeEnableTotpSchema>({
		resolver: zodResolver(enableTotpSchema),
		defaultValues: {
			pin: '',
		},
	});

	const [enable, { loading: isLoadingEnable }] = useEnableTotpMutation({
		onCompleted() {
			refetch();
			setIsOpen(false);
			toast.success(t('successMessage'));
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeEnableTotpSchema) {
		enable({
			variables: {
				data: {
					secret: twoFactorAuth?.secret ?? '',
					pin: data.pin,
				},
			},
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>{t('trigger')}</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4'
				>
					<div className='flex flex-col items-center justify-center gap-4'>
						<span className='text-muted-foreground text-sm'>
							{twoFactorAuth?.qrcodeUrl
								? t('qrInstructions')
								: ''}
						</span>
						<img
							src={twoFactorAuth?.qrcodeUrl}
							alt='QR'
							className='rounded-lg'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<span className='text-muted-foreground text-center text-sm'>
							{twoFactorAuth?.secret
								? t('secretCodeLabel') +
									': ' +
									twoFactorAuth.secret
								: ''}
						</span>
					</div>
					<Controller
						name='pin'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								className='flex flex-col justify-center max-sm:items-center'
								data-invalid={fieldState.invalid}
							>
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
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<DialogFooter>
						<Button
							type='submit'
							disabled={!isValid || isLoadingGenerate || isLoadingEnable}
						>
							{t('submitButton')}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
