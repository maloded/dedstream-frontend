import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/common/Input';
import { CardContainer } from '@/components/ui/elements/CardContainer';
import { CopyButton } from '@/components/ui/elements/CopyButton';

interface StreamUrlProps {
	value: string | null;
}

export function StreamUrl({ value }: StreamUrlProps) {
	const t = useTranslations('dashboard.keys.url');

	return (
		<CardContainer
			heading={t('heading')}
            isRightContentInline
			rightContent={
				<div className='flex w-full items-center gap-x-4 pl-4'>
					<Input
						value={value ?? ''}
						disabled
						placeholder={t('heading')}
					/>
					<CopyButton value={value} />
				</div>
			}
		/>
	);
}
