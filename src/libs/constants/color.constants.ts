export const BASE_COLORS = [
	{ name: 'violet', color: '262, 83%, 58%' },
	{ name: 'blue', color: '204, 70%, 53%' },
	{ name: 'turquoise', color: '176, 77%, 41%' },
	{ name: 'green', color: '142, 71%, 45%' },
	{ name: 'lime', color: '95, 75%, 50%' },

	{ name: 'yellow', color: '48, 89%, 50%' },
	{ name: 'orange', color: '28, 90%, 54%' },
	{ name: 'peach', color: '17, 94%, 67%' },
	{ name: 'pink', color: '330, 81%, 60%' },
	{ name: 'rose', color: '340, 82%, 52%' },
	{ name: 'red', color: '0, 72%, 51%' },

	{ name: 'indigo', color: '231, 60%, 50%' },
	{ name: 'cyan', color: '190, 85%, 48%' },

	{ name: 'brown', color: '25, 45%, 35%' },
	{ name: 'gray', color: '220, 10%, 50%' },
	{ name: 'slate', color: '215, 20%, 35%' },
	{ name: 'black', color: '0, 0%, 10%' },
	{ name: 'white', color: '0, 0%, 98%' },
] as const;

export type TypeBaseColor = (typeof BASE_COLORS)[number]['name'];
