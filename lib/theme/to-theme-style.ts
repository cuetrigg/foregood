import type { CSSProperties } from "react";

import type { ResolvedTheme } from "@/lib/theme/types";

export function toThemeStyle(theme: ResolvedTheme): CSSProperties {
	return {
		colorScheme: theme.colorScheme,
		...theme.tokens,
	} as CSSProperties;
}
