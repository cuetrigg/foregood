"use client";

import { usePagination } from "@/lib/usepagination";

import type { LeaderboardMember } from "@/types/leaderboard";

import { MemberStatsModal } from "../memberstatsmodal";
import { PaginationControls } from "./paginationcontrols";

export function BusinessUnitsTableClient({
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
				No business unit leaderboard data is available right now.
			</p>
		);
	}

	return (
		<>
			<div className="overflow-x-auto h-96">
				<table className="table table-pin-rows table-pin-cols">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Connections</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{pageRows.map((member, index) => (
							<tr
								key={`${member.name.replaceAll(" ", "_").toLowerCase()}_${member.connections}`}
							>
								<td>{startIndex + index + 1}</td>
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
								<td>
									<span className="badge badge-ghost badge-sm">
										{member.connections}
									</span>
								</td>
								<th>
									<MemberStatsModal member={member} />
								</th>
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
