import { rootApiDomain } from "@/lib/utils";
import type { AppConfig } from "@/types/config";
import type { CustomCategories } from "@/types/leaderboard";
import { MemberStatsModal } from "../memberstatsmodal";

export default async function CustomCategoryTable({
	data,
}: {
	data: AppConfig;
}) {
	const client = data.name.toLowerCase();

	const response = await fetch(
		`https://${client}.${rootApiDomain}/api/leaderboard/custom-categories`,
	);

	if (!response.ok) {
		throw new Error("Failed to load business units leaderboard data");
	}

	const customcategories: CustomCategories = await response.json();

	return (
		<div className="overflow-x-auto h-96">
			<div className="flex items-center -mt-1">
				<h3 className="my-2 ml-3 text-base font-bold text-gray-800">
					Category: {customcategories[0].name}
				</h3>
			</div>
			<p className="mb-1 text-xs font-medium text-secondary uppercase">
				------------
			</p>

			<table className="table table-xs table-pin-rows table-pin-cols">
				<thead>
					<tr>
						<th></th>
						<td>Name</td>
						<td>Connections</td>
					</tr>
				</thead>
				<tbody>
					{customcategories[0].members.map((member, i) => {
						return (
							<tr
								key={`${member.name.replaceAll(" ", "_").toLowerCase()}_${member.connections}`}
							>
								<th>{i + 1}</th>
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
								<td>{member.connections}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
