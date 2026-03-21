import { rootApiDomain } from "@/lib/utils";
import type { AppConfig } from "@/types/config";
import type { Employee } from "@/types/leaderboard";

import { EmployeeTableClient } from "./employeetableclient";

export default async function EmployeeTable({ data }: { data: AppConfig }) {
	const client = data.name.toLowerCase();

	const response = await fetch(
		`https://${client}.${rootApiDomain}/api/leaderboard/employees`,
	);

	if (!response.ok) {
		throw new Error("Failed to load employee leaderboard data");
	}

	const employees: Employee[] = await response.json();

	return (
		<EmployeeTableClient
			employees={employees}
			pageSize={data.leaderBoardSettings.topVolunteersLimit}
		/>
	);
}
