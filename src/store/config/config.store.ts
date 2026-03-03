// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';

// import { type TypeBaseColor } from '@/libs/constants/color.constants';

// import { ConfigStore } from './config.type';

// export const configStore = create(
// 	persist<ConfigStore>(
// 		set => ({
// 			theme: 'lime',
// 			setTheme: (theme: TypeBaseColor) => set({ theme }),
// 		}),
// 		{
// 			name: 'config',
// 			storage: createJSONStorage(() => localStorage),
// 		},
// 	),
// );
