import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CategoriesList } from '@/components/features/category/list/CategoriesList';

import {
	FindAllCategoriesDocument,
	FindAllCategoriesQuery,
} from '@/graphql/generated/output';

import { SERVER_URL } from '@/libs/constants/url.constants';

async function findAllCategories() {
	try {
		const query = FindAllCategoriesDocument.loc?.source.body;
		const serverUrl = SERVER_URL ?? 'http://localhost:4000/graphql';

		const response = await fetch(serverUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query }),
			next: { revalidate: 30 },
		});

		const data = await response.json();
		return {
			categories: data.data
				.findAllCategories as FindAllCategoriesQuery['findAllCategories'],
		};
	} catch (error) {
		console.error('Error fetching all categories:', error);
		throw new Error('Failed to fetch all categories');
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('categories');

	return {
		title: t('heading'),
	};
}

export default async function CategoriesPage() {
	const t = await getTranslations('categories');

	const { categories } = (await findAllCategories()) ?? {};

	return (
		<div className='space-y-10'>
			<CategoriesList heading={t('heading')} categories={categories} />
		</div>
	);
}
