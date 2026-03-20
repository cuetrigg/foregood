export interface AppConfig {
	name: string;
	logo: string;
	userSettings: UserSettings;
	leaderBoardSettings: LeaderBoardSettings;
}
export interface UserSettings {
	custom_employee_category_required: boolean;
	custom_employee_category_name: string;
}
export interface LeaderBoardSettings {
	topVolunteersLimit: number;
}
