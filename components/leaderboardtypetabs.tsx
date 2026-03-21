"use client";

import type { LeaderboardTypeTabsProps } from "@/types/leaderboard";

export default function LeaderboardTypeTabs({
	activeTab,
	onChange,
	tabs,
}: LeaderboardTypeTabsProps) {
	return (
		<div className="flex justify-center pb-5">
			<div role="tablist" className="tabs tabs-box flex-wrap justify-center gap-1 border-t-primary">
				{tabs.map((tab) => (
					<input
						key={tab.id}
						type="radio"
						name="leaderboard_type_tab"
						className="tab"
						aria-label={tab.label}
						checked={activeTab === tab.id}
						onChange={() => onChange(tab.id)}
					/>
				))}
			</div>
		</div>
	);
}
