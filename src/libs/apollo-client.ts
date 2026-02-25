import { InMemoryCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import { SERVER_URL } from './constants/url.constants';

const uploadLink = createUploadLink({
	uri: SERVER_URL,
	credentials: 'include',
	headers: {
		'apollo-require-preflight': 'true',
	},
});

export const client = new ApolloClient({
	link: uploadLink,
	cache: new InMemoryCache(),
});
