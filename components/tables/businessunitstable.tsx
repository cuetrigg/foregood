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
	const businessUnit = businessunits[0];
	const members = businessUnit?.members;

	return (
		<div>
			<div className="flex items-center -mt-1">
				<h3 className="my-2 ml-3 text-base font-bold text-gray-800">
					Business Unit: {businessUnit?.name ?? "Unavailable"}
				</h3>
			</div>
			<p className="mb-1 text-xs font-medium text-secondary uppercase">
				------------
			</p>
			<BusinessUnitsTableClient
				members={members}
				pageSize={data.leaderBoardSettings.topVolunteersLimit}
			/>
		</div>
	);
}
