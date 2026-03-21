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
	const customCategory = customcategories[0];
	const members = customCategory?.members;

	return (
		<div>
			<div className="flex items-center -mt-1">
				<h3 className="my-2 ml-3 text-base font-bold text-gray-800">
					Category: {customCategory?.name ?? "Unavailable"}
				</h3>
			</div>
			<p className="mb-1 text-xs font-medium text-secondary uppercase">
				------------
			</p>
			<CustomCategoryTableClient
				members={members}
				pageSize={data.leaderBoardSettings.topVolunteersLimit}
			/>
		</div>
	);
}
