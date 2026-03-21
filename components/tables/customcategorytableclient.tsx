"use client";

import { useState } from "react";

import { usePagination } from "@/lib/usepagination";

import type { CustomCategories, LeaderboardMember } from "@/types/leaderboard";

import { PaginationControls } from "./paginationcontrols";

export function CustomCategoryTableClient({
	customCategories,
	pageSize,
}: {
	customCategories: CustomCategories;
	pageSize: number;
}) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const activeIndex = customCategories[selectedIndex] ? selectedIndex : 0;
	const selectedCategory = customCategories[activeIndex];
	const hasAlternatives = customCategories.length > 1;

	return (
		<>
			<div className="-mt-1 mb-1">
				{hasAlternatives ? (
					<div className="dropdown">
						Category:
						<button type="button" className="btn m-1">
							{selectedCategory?.name ?? "Unavailable"}{" "}
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
							{customCategories.map((customCategory, index) => {
								if (index === activeIndex) {
									return null;
								}

								return (
									<li key={`${customCategory.name}_${index}`}>
										<button
											type="button"
											onClick={() => setSelectedIndex(index)}
										>
											{customCategory.name}
										</button>
									</li>
								);
							})}
						</ul>
					</div>
				) : (
					<div className="flex items-center">
						<h3 className="my-2 ml-3 text-base font-bold text-gray-800">
							Category: {selectedCategory?.name ?? "Unavailable"}
						</h3>
					</div>
				)}
			</div>
			<p className="mb-1 text-xs font-medium text-secondary uppercase">
				------------
			</p>
			<CustomCategoryMembersTable
				key={`custom-category-${activeIndex}`}
				members={selectedCategory?.members ?? []}
				pageSize={pageSize}
			/>
		</>
	);
}

function CustomCategoryMembersTable({
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
