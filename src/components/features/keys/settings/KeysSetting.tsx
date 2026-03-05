'use client';

import { useTranslations } from 'next-intl';

import { Heading } from '@/components/ui/elements/Heading';
import { ToggleCardSkeleton } from '@/components/ui/elements/ToggleCard';

import { useCurrent } from '@/hooks/useCurrent';

import { InstructionModal } from './InstructionModal';
import { CreateIngressForm } from './forms/CreateIngressForm';
import { StreamUrl } from './forms/StreamUrl';
import { StreamKey } from './forms/StreamKey';

export function KeysSetting() {
	const t = useTranslations('dashboard.keys.header');

	const { user, isLoadingProfile } = useCurrent();

	return (
		<div className='lg:px-10'>
			<div className='block items-center justify-between space-y-3 lg:flex lg:space-y-0'>
				<Heading
					title={t('heading')}
					description={t('description')}
					size='lg'
				/>
				<div className='flex items-center gap-x-4'>
					<InstructionModal />
					<CreateIngressForm />
				</div>
			</div>
			<div className='mt-5 space-y-6'>
				{isLoadingProfile ? (
					Array.from({ length: 2 }).map((_, i) => (
						<ToggleCardSkeleton key={i} />
					))
				) : user?.stream?.serverUrl && user?.stream?.streamKey ? (
					<>
						<StreamUrl value={user?.stream.serverUrl} />
                        <StreamKey value={user?.stream.streamKey} />
					</>
				) : null}
			</div>
		</div>
	);
}
