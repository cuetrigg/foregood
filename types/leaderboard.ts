import type { ReactNode } from "react";

export type Employee = {
	id: string;
	fullName: string;
	connections: number;
	connectionsConfirmed: number;
	averageRating: number | null;
	amountDonated: number;
	latestActivity: string;
	totalHours: number;
};

export interface LeaderboardMember {
	name: string;
	connections: number;
	imageUrl: string | null;
}

export interface LeaderboardEntry {
	name: string;
	connections: number;
	members: LeaderboardMember[];
}

export type LeaderboardView =
	| "all"
	| "employees"
	| "business-units"
	| "custom-categories";

export interface LeaderboardTypeTab {
	id: LeaderboardView;
	label: string;
}

export interface LeaderboardTypeTabsProps {
	activeTab: LeaderboardView;
	onChange: (tabId: LeaderboardView) => void;
	tabs: LeaderboardTypeTab[];
}

export interface LeaderboardLayoutProps {
	employeeTable: ReactNode;
	businessUnitsTable: ReactNode;
	customCategoryTable?: ReactNode;
}

export type BusinessUnits = LeaderboardEntry[];
export type CustomCategories = LeaderboardEntry[];
