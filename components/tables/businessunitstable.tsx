import { rootApiDomain } from "@/lib/utils";

import type { AppConfig } from "@/types/config";
import type { BusinessUnits } from "@/types/leaderboard";
import { MemberStatsModal } from "../memberstatsmodal";

export default async function BusinessUnitTable({ data }: { data: AppConfig }) {
	const client = data.name.toLowerCase();

	const response = await fetch(
		`https://${client}.${rootApiDomain}/api/leaderboard/business-units`,
	);

	if (!response.ok) {
		throw new Error("Failed to load business units leaderboard data");
	}

	const businessunits: BusinessUnits = await response.json();

	return (
		<div className="overflow-x-auto">
			<div className="flex items-center -mt-1">
				<h3 className="my-2 ml-3 text-base font-bold text-gray-800">
					{businessunits[0].name}
				</h3>
			</div>
			<p className="mb-1 text-xs font-medium text-secondary uppercase">
				------------
			</p>

			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Connections</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{businessunits[0].members
						.slice(0, data.leaderBoardSettings.topVolunteersLimit)
						.map((member) => (
							<tr
								key={`${member.name.replaceAll(" ", "_").toLowerCase()}_${member.connections}`}
							>
								<td>
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle h-12 w-12">
												<img
													src={
														member?.imageUrl ? member.imageUrl : "/person.png"
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
	);
}
