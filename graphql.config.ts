import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as loadEnv } from 'dotenv';

loadEnv();

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_SERVER_URL,
	documents: ['./src/graphql/**/*.graphql'],
	generates: {
		'./src/graphql/generated/output.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo',
			]
		},
	},
	ignoreNoDocuments: true,
};

export default config;
