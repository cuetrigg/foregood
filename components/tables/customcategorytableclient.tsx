"use client";

import { usePagination } from "@/lib/usepagination";

import type { LeaderboardMember } from "@/types/leaderboard";

import { PaginationControls } from "./paginationcontrols";

export function CustomCategoryTableClient({
	members,
	pageSize,
}: {
	members: LeaderboardMember[];
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
	} = usePagination(members, pageSize);

	if (totalRows === 0) {
		return (
			<p className="px-2 py-6 text-sm text-gray-500">
				No custom category leaderboard data is available right now.
			</p>
		);
	}

	return (
		<>
			<div className="overflow-x-auto h-96">
				<table className="table table-xs table-pin-rows table-pin-cols">
					<thead>
						<tr>
							<th></th>
							<td>Name</td>
							<td>Connections</td>
						</tr>
					</thead>
					<tbody>
						{pageRows.map((member, index) => (
							<tr
								key={`${member.name.replaceAll(" ", "_").toLowerCase()}_${member.connections}`}
							>
								<th>{startIndex + index + 1}</th>
								<td>
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle h-12 w-12">
												<img
													src={
														member.imageUrl ? member.imageUrl : "/person.png"
													}
													height={48}
													width={48}
													alt="member profile"
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">{member.name}</div>
										</div>
									</div>
								</td>
								<td>{member.connections}</td>
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
