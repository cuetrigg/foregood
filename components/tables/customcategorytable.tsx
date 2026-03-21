import { rootApiDomain } from "@/lib/utils";
import type { AppConfig } from "@/types/config";
import type { CustomCategories } from "@/types/leaderboard";

import { CustomCategoryTableClient } from "./customcategorytableclient";

export default async function CustomCategoryTable({
	data,
}: {
	data: AppConfig;
}) {
	const client = data.name.toLowerCase();

	const response = await fetch(
		`https://${client}.${rootApiDomain}/api/leaderboard/custom-categories`,
	);

	if (!response.ok) {
		throw new Error("Failed to load custom category leaderboard data");
	}

	const customcategories: CustomCategories = await response.json();

	return (
		<CustomCategoryTableClient
			customCategories={customcategories}
			pageSize={data.leaderBoardSettings.topVolunteersLimit}
		/>
	);
}
