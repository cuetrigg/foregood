export const protocol =
	process.env.NODE_ENV === "production" ? "https" : "http";

export const rootDomain =
	process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

export const rootApiDomain = process.env.NEXT_PUBLIC_API_ROOT_DOMAIN || "";

function formatDate(value: string) {
	return new Intl.DateTimeFormat("en-ZA", {
		month: "numeric",
		day: "numeric",
		year: "numeric",
	}).format(new Date(value));
}

function formatCurrency(value: number) {
	return new Intl.NumberFormat("en-ZA", {
		style: "currency",
		currency: "ZAR",
		maximumFractionDigits: value % 1 === 0 ? 0 : 2,
	}).format(value);
}

export { formatDate, formatCurrency };
