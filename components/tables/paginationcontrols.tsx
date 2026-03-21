type PaginationControlsProps = {
	currentPage: number;
	endRow: number;
	onNextPage: () => void;
	onPreviousPage: () => void;
	startRow: number;
	totalPages: number;
	totalRows: number;
};

export function PaginationControls({
	currentPage,
	endRow,
	onNextPage,
	onPreviousPage,
	startRow,
	totalPages,
	totalRows,
}: PaginationControlsProps) {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
			<p className="text-xs text-gray-500">
				Showing {startRow}-{endRow} of {totalRows}
			</p>
			<div className="flex items-center gap-2 self-start sm:self-auto">
				<button
					type="button"
					className="btn btn-sm btn-outline"
					disabled={currentPage === 1}
					onClick={onPreviousPage}
				>
					Previous
				</button>
				<span className="text-xs font-semibold text-gray-600">
					Page {currentPage} of {totalPages}
				</span>
				<button
					type="button"
					className="btn btn-sm btn-outline"
					disabled={currentPage === totalPages}
					onClick={onNextPage}
				>
					Next
				</button>
			</div>
		</div>
	);
}
