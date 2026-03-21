"use client";

import { usePagination } from "@/lib/usepagination";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Employee } from "@/types/leaderboard";

import { PaginationControls } from "./paginationcontrols";

export function EmployeeTableClient({
	employees,
	pageSize,
}: {
	employees: Employee[];
	pageSize: number;
}) {
	const {
		currentPage,
		endRow,
		goToNextPage,
		goToPreviousPage,
		pageRows,
		startIndex,
		startRow,
		totalPages,
		totalRows,
	} = usePagination(employees, pageSize);

	if (totalRows === 0) {
		return (
			<p className="px-2 py-6 text-sm text-gray-500">
				No employee leaderboard data is available right now.
			</p>
		);
	}

	return (
		<>
			<div className="overflow-x-auto min-h-48">
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
						{pageRows.map((employee, index) => (
							<tr key={employee.id}>
								<th>{startIndex + index + 1}</th>
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
			<PaginationControls
				currentPage={currentPage}
				endRow={endRow}
				onNextPage={goToNextPage}
				onPreviousPage={goToPreviousPage}
				startRow={startRow}
				totalPages={totalPages}
				totalRows={totalRows}
			/>
		</>
	);
}
