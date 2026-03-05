import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '../common/Button';

interface CopyButtonProps {
	value: string | null;
}

export function CopyButton({ value }: CopyButtonProps) {
	const t = useTranslations('components.copyButton');

	const [isCopied, setIsCopied] = useState(false);

	function onCopy() {
		if (value) {
			navigator.clipboard.writeText(value);
			setIsCopied(true);
			toast.success(t('successMessage'));
			setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
		}
	}

	const Icon = isCopied ? Check : Copy;

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={onCopy}
			disabled={!value || isCopied}
		>
			<Icon className='size-5' />
		</Button>
	);
}
