"use client";

import { useRef } from "react";

import type { LeaderboardMember } from "@/types/leaderboard";

export function MemberStatsModal({ member }: { member: LeaderboardMember }) {
	const modelRef = useRef<HTMLDialogElement | null>(null);

	return (
		<>
			<button
				type="button"
				className="btn btn-ghost btn-xs"
				onClick={() => modelRef.current?.showModal()}
			>
				details
			</button>
			<dialog ref={modelRef} className="modal">
				<div className="modal-box max-w-fit">
					<form method="dialog">
						{/*
					  	apparently if there is a button in form, it will close the modal
					  	don't ask it just works.

					  	p.s it needs to be of type submit for it to work tho
					  */}
						<button
							type="submit"
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
						>
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg brand-gradient-text">
						{member.name}
					</h3>
					<div className="stats shadow mt-5">
						<div className="stat">
							<div className="stat-figure text-secondary">
								<div className="avatar avatar-online">
									<div className="w-16 rounded-full">
										<img
											src={member?.imageUrl ? member.imageUrl : "/person.png"}
											alt="member profile"
										/>
									</div>
								</div>
							</div>
							<div className="stat-value">{member.connections}</div>
							<div className="stat-title">Connections</div>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
}
