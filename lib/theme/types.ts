export const themeTokenKeys = [
	"--color-base-100",
	"--color-base-200",
	"--color-base-300",
	"--color-base-content",
	"--color-primary",
	"--color-primary-content",
	"--color-secondary",
	"--color-secondary-content",
	"--color-accent",
	"--color-accent-content",
	"--color-neutral",
	"--color-neutral-content",
	"--color-info",
	"--color-info-content",
	"--color-success",
	"--color-success-content",
	"--color-warning",
	"--color-warning-content",
	"--color-error",
	"--color-error-content",
	"--radius-selector",
	"--radius-field",
	"--radius-box",
	"--size-selector",
	"--size-field",
	"--border",
	"--depth",
	"--noise",
] as const;

export type ThemeTokenKey = (typeof themeTokenKeys)[number];
export type ThemeTokens = Record<ThemeTokenKey, string>;
export type ThemeTokenOverrides = Partial<ThemeTokens>;
export type ThemeColorScheme = "light" | "dark";

export type BaseThemeConfig = {
	id: string;
	label: string;
	colorScheme: ThemeColorScheme;
	tokens: ThemeTokens;
};

export type TenantThemeConfig = {
	id: string;
	label: string;
	colorScheme?: ThemeColorScheme;
	tokens: ThemeTokenOverrides;
};

export type ResolvedTheme = {
	id: string;
	label: string;
	colorScheme: ThemeColorScheme;
	tokens: ThemeTokens;
};
