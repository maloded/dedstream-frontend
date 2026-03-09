'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { type FindRandomCategoriesQuery } from '@/graphql/generated/output';

import { useSidebar } from '@/hooks/useSidebar';

import { getRandomColor } from '@/utils/color';
import { getMediaSource } from '@/utils/get-media-source';

interface CategoryCardProps {
	category: FindRandomCategoriesQuery['findRandomCategories'][0];
}

export function CategoryCard({ category }: CategoryCardProps) {
	const { isCollapsed } = useSidebar();
	const [randomColor, setRandomColor] = useState<string | undefined>();

	useEffect(() => {
		requestAnimationFrame(() => {
			setRandomColor(getRandomColor());
		});
	}, []);

	return (
		<div className='h-full w-full'>
			<Link href={`/categories/${category.slug}`}>
				<div
					className='group relative cursor-pointer rounded-xl'
					style={{ height: isCollapsed ? 240 : 208 }}
				>
					<div
						className='absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100'
						style={{ backgroundColor: randomColor }}
					/>

					{getMediaSource(category.thumbnailUrl) && (
						<Image
							src={getMediaSource(category.thumbnailUrl)!}
							alt={category.title}
							fill
							className='rounded-lg object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2'
						/>
					)}
				</div>
				<div>
					<h2 className='mt-3 text-foreground truncate text-base font-semibold hover:text-primary'>
						{category.title}
					</h2>
				</div>
			</Link>
		</div>
	);
}
