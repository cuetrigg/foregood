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

export type BusinessUnits = LeaderboardEntry[];
export type CustomCategories = LeaderboardEntry[];
