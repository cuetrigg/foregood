import Image from "next/image";

import type { AppConfig } from "@/types/config";

export default async function Navbar({ data }: { data: AppConfig }) {
	return (
		<div className="navbar bg-base-200 justify-center">
			<div className="flex w-5/6 border-b-4 border-primary p-2">
				<div className="ps-4 self-center">
					<Image
						src={data?.logo}
						width={100}
						height={35}
						alt="logo"
						loading="eager"
					/>
				</div>
				<div className="flex grow justify-end px-2">
					<div className="flex items-stretch">
						<button
							tabIndex={0}
							type="button"
							className="btn btn-soft btn-secondary font-bold text-lg"
						>
							{data?.name}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
