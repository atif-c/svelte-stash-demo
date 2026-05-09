export const themes = ['light', 'dark'] as const;

export type UserSettings = {
	theme: (typeof themes)[number];
	language: string;
	notifications: boolean;
	accentHue: number;
};

export const defaultUserSettings = {
	theme: 'dark',
	language: 'en',
	notifications: true,
	accentHue: 200
} as const satisfies UserSettings;
