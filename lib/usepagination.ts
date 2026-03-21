"use client";

import { useMemo, useState } from "react";

export function usePagination<T>(rows: T[], pageSize: number) {
	const safePageSize = Math.max(1, pageSize);
	const totalRows = rows.length;
	const totalPages = totalRows === 0 ? 0 : Math.ceil(totalRows / safePageSize);
	const [currentPage, setCurrentPage] = useState(1);
	const clampedCurrentPage =
		totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
	const startIndex =
		totalPages === 0 ? 0 : (clampedCurrentPage - 1) * safePageSize;
	const endIndex = startIndex + safePageSize;

	const pageRows = useMemo(
		() => rows.slice(startIndex, endIndex),
		[rows, startIndex, endIndex],
	);

	return {
		currentPage: clampedCurrentPage,
		endRow: Math.min(totalRows, endIndex),
		hasPagination: totalPages > 1,
		goToNextPage: () => {
			setCurrentPage((page) => Math.min(page + 1, totalPages || 1));
		},
		goToPreviousPage: () => {
			setCurrentPage((page) => {
				const normalizedPage =
					totalPages === 0 ? 1 : Math.min(page, totalPages);

				return Math.max(normalizedPage - 1, 1);
			});
		},
		pageRows,
		startIndex,
		startRow: totalRows === 0 ? 0 : startIndex + 1,
		totalPages,
		totalRows,
	};
}
