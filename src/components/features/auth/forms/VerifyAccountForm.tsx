'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { useVerifyAccountMutation } from '@/graphql/generated/output';

import { AuthWrapper } from '../AuthWrapper';
import { Loader } from 'lucide-react';

export function VerifyAccountForm() {
	const t = useTranslations('auth.verify');

	const router = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams.get('token') ?? '';

	const [verify] = useVerifyAccountMutation({
		onCompleted() {
			toast.message(t('successMessage'));
			router.push('/dashboard/settings');
		},
		onError() {
			toast.error(t('errorMessage'));
		},
	});

	useEffect(() => {
		verify({
			variables: {
				data: { token },
			},
		});
	}, [token, verify]);

	return (
		<AuthWrapper heading={t('heading')}>
			<div className='flex justify-center'>
                <Loader className='size-8 animate-spin'/>
            </div>
		</AuthWrapper>
	);
}
