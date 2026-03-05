'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import {
	DataTable,
	DataTableSkeleton,
} from '@/components/ui/elements/DataTable';
import { Heading } from '@/components/ui/elements/Heading';

import {
	type FindMyTransactionsQuery,
	TransactionStatusType,
	useFindMyTransactionsQuery,
} from '@/graphql/generated/output';

import { convertPrice } from '@/utils/convert-price';
import { formatDate } from '@/utils/format-data';

export function TransactionsTable() {
	const t = useTranslations('dashboard.transactions');

	const { data, loading: isLoadingTransactions } =
		useFindMyTransactionsQuery();
	const transactions = data?.findMyTransactions ?? [];

	const transactionsColumns: ColumnDef<
		FindMyTransactionsQuery['findMyTransactions'][0]
	>[] = [
		{
			accessorKey: 'createdAt',
			header: t('columns.date'),
			cell: ({ row }) => formatDate(row.original.createdAt),
		},
		{
			accessorKey: 'status',
			header: t('columns.status'),
			cell: ({ row }) => {
				const status = row.original.status;
				switch (status) {
					case TransactionStatusType.Success:
						return (
							<div
								style={{ color: '#22c55e' }}
								className='py-1.5'
							>
								{t('columns.success')}
							</div>
						);
					case TransactionStatusType.Pending:
						return (
							<div
								style={{ color: '#f59e0b' }}
								className='py-1.5'
							>
								{t('columns.pending')}
							</div>
						);
					case TransactionStatusType.Failed:
						return (
							<div
								style={{ color: '#ef4444' }}
								className='py-1.5'
							>
								{t('columns.failed')}
							</div>
						);
					case TransactionStatusType.Expired:
						return (
							<div
								style={{ color: '#3b82f6' }}
								className='py-1.5'
							>
								{t('columns.expired')}
							</div>
						);
					default:
						return (
							<div className='text-muted-foreground py-1.5'>
								{status}
							</div>
						);
				}
			},
		},
		{
			accessorKey: 'amount',
			header: t('columns.amount'),
			cell: ({ row }) => convertPrice(row.original.amount),
		},
	];

	return (
		<div className='lg:px-10'>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size='lg'
			/>
			<div className='mt-5'>
				{isLoadingTransactions ? (
					<DataTableSkeleton />
				) : (
					<DataTable
						columns={transactionsColumns}
						data={transactions}
					/>
				)}
			</div>
		</div>
	);
}
