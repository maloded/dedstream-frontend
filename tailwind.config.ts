import type { Config } from 'tailwindcss';

export default {
	content: [
		'./app/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				5: 'repeat(5, minmax(0, 1fr))',
				7: 'repeat(7, minmax(0, 1fr))',
			},
			spacing: {
				6: '1.5rem',
				8: '2rem',
			},
			colors: {
				lime: {
					DEFAULT: '#70df20',
					dark: '#5ebb1b',
					accent: '#2d590d',
					foreground: '#f9fafb',
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
