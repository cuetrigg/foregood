import { baseTheme, tenantThemes, themeRegistry } from "@/lib/theme/themes";

import type { ResolvedTheme, TenantThemeConfig } from "@/lib/theme/types";

function getTenantTheme(subdomain: string): TenantThemeConfig | undefined {
	const normalized = subdomain.toLowerCase();
	const themeId = themeRegistry[normalized];
	if (!themeId || themeId === "global") {
		return undefined;
	}
	return tenantThemes[themeId];
}

export function resolveThemeBySubdomain(subdomain: string): ResolvedTheme {
	const tenantTheme = getTenantTheme(subdomain);
	return {
		id: tenantTheme?.id ?? baseTheme.id,
		label: tenantTheme?.label ?? baseTheme.label,
		colorScheme: tenantTheme?.colorScheme ?? baseTheme.colorScheme,
		tokens: {
			...baseTheme.tokens,
			...tenantTheme?.tokens,
		},
	};
}
