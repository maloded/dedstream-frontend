import { Heading } from '@/components/ui/elements/Heading';

import { FindRandomStreamsQuery } from '@/graphql/generated/output';

interface StreamsListProps {
	heading?: string;
	streams: FindRandomStreamsQuery['findRandomStreams'];
}

export function StreamsList({ heading, streams }: StreamsListProps) {
	return streams.length ? (
		<>
			{heading && <Heading title={heading} />}
			<div className='mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {streams.map((stream, index) => (
                    <div key={index}>{stream.title}</div>
                ))}
            </div>
		</>
	) : (
		<div>Not found</div>
	);
}
