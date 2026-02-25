import { MEDIA_URL } from '@/libs/constants/url.constants';

export function getMediaSource(
	path?: string | null,
	version?: string | number,
) {
	if (!path) return undefined;

	const url = `${MEDIA_URL}${path}`;

	return version ? `${url}?v=${version}` : url;
}
