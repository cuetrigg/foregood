"use client";

import { useState } from "react";

import { usePagination } from "@/lib/usepagination";

import type { BusinessUnits, LeaderboardMember } from "@/types/leaderboard";

import { MemberStatsModal } from "../memberstatsmodal";
import { PaginationControls } from "./paginationcontrols";

export function BusinessUnitsTableClient({
	businessUnits,
	pageSize,
}: {
	businessUnits: BusinessUnits;
	pageSize: number;
}) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const activeIndex = businessUnits[selectedIndex] ? selectedIndex : 0;
	const selectedBusinessUnit = businessUnits[activeIndex];
	const hasAlternatives = businessUnits.length > 1;

	return (
		<>
			<div className="-mt-1 mb-1">
				{hasAlternatives ? (
					<div className="dropdown">
						Business Unit:
						<button type="button" className="btn m-1">
							{selectedBusinessUnit?.name ?? "Unavailable"}{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="#000000"
							>
								<path d="M480-360 280-560h400L480-360Z" />
							</svg>
						</button>
						<ul className="dropdown-content menu mt-1 w-64 rounded-box bg-base-100 p-2 shadow-sm z-10">
							{businessUnits.map((businessUnit, index) => {
								if (index === activeIndex) {
									return null;
								}

								return (
									<li key={`${businessUnit.name}_${index}`}>
										<button
											type="button"
											onClick={() => setSelectedIndex(index)}
										>
											{businessUnit.name}
										</button>
									</li>
								);
							})}
						</ul>
					</div>
				) : (
					<div className="flex items-center">
						<h3 className="my-2 ml-3 text-base font-bold text-gray-800">
							Business Unit: {selectedBusinessUnit?.name ?? "Unavailable"}
						</h3>
					</div>
				)}
			</div>
			<p className="mb-1 text-xs font-medium text-secondary uppercase">
				------------
			</p>
			<BusinessUnitMembersTable
				key={`business-unit-${activeIndex}`}
				members={selectedBusinessUnit?.members ?? []}
				pageSize={pageSize}
			/>
		</>
	);
}

function BusinessUnitMembersTable({
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
