"use client";

import { useState } from "react";

import type {
	LeaderboardLayoutProps,
	LeaderboardTypeTab,
	LeaderboardView,
} from "@/types/leaderboard";

import LeaderboardTypeTabs from "./leaderboardtypetabs";

export default function LeaderboardLayout({
	businessUnitsTable,
	customCategoryTable,
	employeeTable,
}: LeaderboardLayoutProps) {
	const [activeTab, setActiveTab] = useState<LeaderboardView>("all");
	const customCategoryTabs: LeaderboardTypeTab[] = customCategoryTable
		? [{ id: "custom-categories", label: "Custom Categories" }]
		: [];
	const tabs: LeaderboardTypeTab[] = [
		{ id: "all", label: "All" },
		{ id: "employees", label: "Employees" },
		{ id: "business-units", label: "Business Units" },
		...customCategoryTabs,
	];

	return (
		<div className="w-full">
			<LeaderboardTypeTabs
				activeTab={activeTab}
				onChange={setActiveTab}
				tabs={tabs}
			/>
			{activeTab === "all" ? (
				<div className="mb-10 flex w-full flex-col sm:flex-row">
					<div className="mb-10 w-full sm:mb-0 sm:w-1/2">
						<div className="relative h-fit ml-0 mr-0 sm:mr-10">
							<span className="absolute top-0 left-0 h-full w-full rounded-lg bg-primary mt-1 ml-1" />
							<div className="relative h-full rounded-lg border-2 border-primary bg-white p-5">
								{employeeTable}
							</div>
						</div>
						{customCategoryTable ? (
							<div className="relative my-10 h-fit ml-0 mr-0 sm:mr-10">
								<span className="absolute top-0 left-0 h-full w-full rounded-lg bg-gradient-to-r from-primary to-secondary mt-1 ml-1" />
								<div className="relative h-full rounded-lg border-2 border-primary bg-white p-5">
									{customCategoryTable}
								</div>
							</div>
						) : null}
					</div>
					<div className="w-full sm:w-1/2">
						<div className="relative h-fit ml-0 md:mr-10">
							<span className="absolute top-0 left-0 h-full w-full rounded-lg bg-secondary mt-1 ml-1" />
							<div className="relative h-full rounded-lg border-2 border-secondary bg-white p-5">
								{businessUnitsTable}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="mx-auto w-full max-w-5xl pb-10">
					{activeTab === "employees" ? (
						<div className="relative h-fit">
							<span className="absolute top-0 left-0 h-full w-full rounded-lg bg-primary mt-1 ml-1" />
							<div className="relative h-full rounded-lg border-2 border-primary bg-white p-5">
								{employeeTable}
							</div>
						</div>
					) : null}
					{activeTab === "business-units" ? (
						<div className="relative h-fit">
							<span className="absolute top-0 left-0 h-full w-full rounded-lg bg-secondary mt-1 ml-1" />
							<div className="relative h-full rounded-lg border-2 border-secondary bg-white p-5">
								{businessUnitsTable}
							</div>
						</div>
					) : null}
					{activeTab === "custom-categories" && customCategoryTable ? (
						<div className="relative h-fit">
							<span className="absolute top-0 left-0 h-full w-full rounded-lg bg-gradient-to-r from-primary to-secondary mt-1 ml-1" />
							<div className="relative h-full rounded-lg border-2 border-primary bg-white p-5">
								{customCategoryTable}
							</div>
						</div>
					) : null}
				</div>
			)}
		</div>
	);
}
