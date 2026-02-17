'use client';

import { AuthWrapper } from '../AuthWrapper';

export function CreateAccountForm() {
	return (
		<AuthWrapper
			heading='Registration in Dedstream'
			backButtonLabel='Log in '
			backButtonHref='/account/login'
		>
			CreateAccountForm
		</AuthWrapper>
	);
}
