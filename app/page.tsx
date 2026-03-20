import { permanentRedirect } from "next/navigation";
import { protocol, rootDomain } from "@/lib/utils";

export default function RootPage() {
	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold pb-5">Hello there.</h1>
					<p className="pb-10">
						You seem lost, enter your company name and we will redirect you to
						the right place.
					</p>
					<form
						className="join"
						action={async (formData: FormData) => {
							"use server";
							const subdomain = formData
								.get("client_subdomain")
								?.toString()
								.toLowerCase();
							if (subdomain) {
								permanentRedirect(`${protocol}://${subdomain}.${rootDomain}`);
							}
						}}
					>
						<button type="submit" className="btn join-item rounded-r-full">
							Go To
						</button>
						<input
							type="text"
							name="client_subdomain"
							required
							className="input join-item"
							placeholder="mag"
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
