import { formatCurrency, formatDate, rootApiDomain } from "@/lib/utils";
import type { AppConfig } from "@/types/config";
import type { Employee } from "@/types/leaderboard";

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
		<div className="overflow-x-auto">
			<table className="table table-xs">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Connections</th>
						<th>Confirmed</th>
						<th>Rating</th>
						<th>Donated</th>
						<th>Last Active</th>
						<th>Hours</th>
					</tr>
				</thead>
				<tbody>
					{employees
						.slice(0, data.leaderBoardSettings.topVolunteersLimit)
						.map((employee, index) => (
							<tr key={employee.id}>
								<th>{index + 1}</th>
								<td>{employee.fullName}</td>
								<td>{employee.connections}</td>
								<td>{employee.connectionsConfirmed}</td>
								<td>{employee.averageRating ?? "--"}</td>
								<td>{formatCurrency(employee.amountDonated)}</td>
								<td>{formatDate(employee.latestActivity)}</td>
								<td>{employee.totalHours}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
