import { redirect } from 'next/navigation';

import { VerifyAccountForm } from '@/components/features/auth/forms/VerifyAccountForm';

interface VerifyAccountProps {
	searchParams: Promise<{ token: string }>;
}

export default async function VerifyAccountPage(props: VerifyAccountProps) {
	const searchParams = await props.searchParams;

	if (!searchParams.token) {
		return redirect('/account/create');
	}

	return <VerifyAccountForm />;
}
