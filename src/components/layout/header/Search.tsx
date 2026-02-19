'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { type SyntheticEvent, useState } from 'react';

import { Button } from '@/components/ui/common/Button';
import { Input } from '@/components/ui/common/Input';
import { SearchIcon } from 'lucide-react';

export function Search() {
	const t = useTranslations('layout.search');

	const [searchTerm, setSearchTerm] = useState('');

	const router = useRouter();

	const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (searchTerm.trim()) {
			router.push(`/streams?searchTerm=${searchTerm}`);
		} else {
			router.push('/streams');
		}
	};

	return (
		<div className='ml-auto hidden lg:block'>
			<form className='relative flex items-center' onSubmit={onSubmit}>
				<Input
					placeholder={t('placeholder')}
					type='text'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='w-full rounded-full pr-10 pl-4 lg:w-[400px]'
				/>
				<Button
					className='absolute right-0.5 h-8'
					type='submit'
				>
                    <SearchIcon className='absolute size-[18px]'/>
                </Button>
			</form>
		</div>
	);
}
