import baseThemeJson from "@/lib/theme/base.json";
import registryJson from "@/lib/theme/registry.json";

import formJson from "@/lib/theme/tenants/form.json";
import blinkJson from "@/lib/theme/tenants/blink.json";
import magJson from "@/lib/theme/tenants/mag.json";

import type { BaseThemeConfig, TenantThemeConfig } from "@/lib/theme/types";

export const baseTheme = baseThemeJson as BaseThemeConfig;

export const tenantThemes = {
	[formJson.id]: formJson as TenantThemeConfig,
	[blinkJson.id]: blinkJson as TenantThemeConfig,
	[magJson.id]: magJson as TenantThemeConfig,
};

export type TenantThemeId = keyof typeof tenantThemes;

export const themeRegistry = registryJson as Record<
	string,
	TenantThemeId | "global"
>;
