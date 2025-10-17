import React from "react";

import Button from "../../../../components/ui/Button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalProducts,
  productsPerPage,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, "...");
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getDisplayRange = () => {
    const start = (currentPage - 1) * productsPerPage + 1;
    const end = Math.min(currentPage * productsPerPage, totalProducts);
    return { start, end };
  };

  const { start, end } = getDisplayRange();

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-background border-t border-border">
      {/* Results Info */}
      <div className="text-text-secondary text-sm">
        Hiển thị {start?.toLocaleString("vi-VN")}-{end?.toLocaleString("vi-VN")}{" "}
        trong tổng số {totalProducts?.toLocaleString("vi-VN")} sản phẩm
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          iconName="ChevronLeft"
          className="px-3"
        />

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getVisiblePages()?.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-3 py-2 text-text-secondary"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                  ${
                    currentPage === page
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-text-primary hover:bg-gray-100" 
                  }
                `}
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          iconName="ChevronRight"
          className="px-3"
        />
      </div>
      {/* Jump to Page (Desktop only) */}
      <div className="hidden lg:flex items-center space-x-2 text-sm">
        <span className="text-text-secondary">Đi đến trang:</span>
        <select
          value={currentPage}
          onChange={(e) => handlePageChange(parseInt(e?.target?.value))}
          className="px-2 py-1 border border-border rounded-md bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
