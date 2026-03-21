import { rootApiDomain } from "@/lib/utils";

import type { AppConfig } from "@/types/config";
import type { BusinessUnits } from "@/types/leaderboard";

import { BusinessUnitsTableClient } from "./businessunitstableclient";

export default async function BusinessUnitTable({ data }: { data: AppConfig }) {
	const client = data.name.toLowerCase();

	const response = await fetch(
		`https://${client}.${rootApiDomain}/api/leaderboard/business-units`,
	);

	if (!response.ok) {
		throw new Error("Failed to load business units leaderboard data");
	}

	const businessunits: BusinessUnits = await response.json();

	return (
		<BusinessUnitsTableClient
			businessUnits={businessunits}
			pageSize={data.leaderBoardSettings.topVolunteersLimit}
		/>
	);
}
