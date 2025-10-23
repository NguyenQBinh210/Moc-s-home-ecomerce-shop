import React, { useState } from "react";
import Icon from "../../../../components/AppIcon";
import Button from "../../../../components/ui/Button";

const SortingControls = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalProducts,
  currentPage,
  productsPerPage,
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    { value: "relevance", label: "Liên quan nhất", icon: "Target" },
    { value: "price-low-high", label: "Giá: Thấp đến Cao", icon: "ArrowUp" },
    { value: "price-high-low", label: "Giá: Cao đến Thấp", icon: "ArrowDown" },
    { value: "newest", label: "Mới nhất", icon: "Clock" },
    { value: "popular", label: "Phổ biến nhất", icon: "TrendingUp" },
    { value: "name-a-z", label: "Tên: A-Z", icon: "ArrowUp" },
    { value: "name-z-a", label: "Tên: Z-A", icon: "ArrowDown" },
  ];

  const currentSort =
    sortOptions?.find((option) => option?.value === sortBy) || sortOptions?.[0];

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setShowSortDropdown(false);
  };

  const getDisplayRange = () => {
    const start = (currentPage - 1) * productsPerPage + 1;
    const end = Math.min(currentPage * productsPerPage, totalProducts);
    return { start, end };
  };

  const { start, end } = getDisplayRange();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-background border-b border-border">
      {/* Results Info */}
      <div className="flex items-center space-x-4">
        <div className="text-text-primary">
          <span className="font-medium">
            Hiển thị {start?.toLocaleString("vi-VN")}-
            {end?.toLocaleString("vi-VN")}
          </span>
          <span className="text-text-secondary ml-1">
            trong tổng số {totalProducts?.toLocaleString("vi-VN")} sản phẩm
          </span>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            iconName={currentSort?.icon}
            iconPosition="left"
            className="min-w-[200px] justify-between"
          >
            <span>{currentSort?.label}</span>
            <Icon
              name={showSortDropdown ? "ChevronUp" : "ChevronDown"}
              size={16}
              className="ml-2"
            />
          </Button>

          {showSortDropdown && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-xl shadow-warm-lg z-50">
              <div className="p-2">
                {sortOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleSortSelect(option?.value)}
                    className={`
                      flex items-center space-x-3 w-full p-3 rounded-lg transition-colors text-left
                      ${
                        sortBy === option?.value
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-surface text-text-primary"
                      }
                    `}
                  >
                    <Icon
                      name={option?.icon}
                      size={16}
                      className={
                        sortBy === option?.value
                          ? "text-primary"
                          : "text-text-secondary"
                      }
                    />
                    <span className="font-medium">{option?.label}</span>
                    {sortBy === option?.value && (
                      <Icon
                        name="Check"
                        size={16}
                        className="text-primary ml-auto"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-surface rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            iconName="Grid3X3"
            className="px-3"
          />
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            iconName="List"
            className="px-3"
          />
        </div>
      </div>
      {/* Mobile Sort & Filter */}
      <div className="flex sm:hidden items-center space-x-2 w-full">
        <Button
          variant="outline"
          onClick={() => setShowSortDropdown(!showSortDropdown)}
          iconName="ArrowUpDown"
          iconPosition="left"
          className="flex-1"
        >
          Sắp xếp
        </Button>

        <div className="flex items-center bg-surface rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            iconName="Grid3X3"
          />
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            iconName="List"
          />
        </div>
      </div>
    </div>
  );
};

export default SortingControls;
