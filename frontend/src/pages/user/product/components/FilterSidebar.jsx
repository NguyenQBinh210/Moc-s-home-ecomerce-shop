import React, { useState } from "react";
import Icon from "../../../../components/AppIcon";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { Checkbox } from "../../../../components/ui/Checkbox";

const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  categories = [],
  suppliers = [],
}) => {

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    supplier: true,
    price: true,
  });


  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev?.[section],
    }));
  };


  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border pb-6 mb-6">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full mb-4 text-left"
      >
        <h3 className="font-playfair text-lg font-semibold text-text-primary">
          {title}
        </h3>
        <Icon
          name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"}
          size={20}
          className="text-text-secondary"
        />
      </button>
      {expandedSections?.[sectionKey] && (
        <div className="space-y-3">{children}</div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay và Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/80 z-50 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`
          fixed lg:sticky top-0 right-0 h-full lg:h-auto w-80 border-r border-border z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${isOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0"}
          overflow-y-auto
        `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-bold text-text-primary">
              Bộ Lọc
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-text-secondary hover:text-primary hover:cursor-pointer "
              >
                Xóa Tất Cả
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="lg:hidden"
                iconName="X"
              />
            </div>
          </div>

          <FilterSection title="Danh Mục" sectionKey="category">
            {categories?.map((category) => (
              <div
                key={category?._id}
                className="flex items-center justify-between"
              >
                <Checkbox
                  label={category?.ten_danh_muc}
                  checked={
                    filters?.categories?.includes(category?._id) || false
                  }
                  onChange={(e) => {
                    const currentCategories = filters?.categories || [];
                    const newCategories = e?.target?.checked
                      ? [...currentCategories, category?._id]
                      : currentCategories?.filter((id) => id !== category?._id);
                    onFilterChange("categories", newCategories);
                  }}
                />
              </div>
            ))}
          </FilterSection>

          <FilterSection title="Nhà Cung Cấp" sectionKey="supplier">
            {suppliers?.map((supplier) => (
              <div
                key={supplier?._id}
                className="flex items-center justify-between"
              >
                <Checkbox
                  label={supplier?.ten_nha_cung_cap}
                  checked={filters?.suppliers?.includes(supplier?._id) || false}
                  onChange={(e) => {
                    const currentSuppliers = filters?.suppliers || [];
                    const newSuppliers = e?.target?.checked
                      ? [...currentSuppliers, supplier?._id]
                      : currentSuppliers?.filter((id) => id !== supplier?._id);
                    onFilterChange("suppliers", newSuppliers);
                  }}
                />
              </div>
            ))}
          </FilterSection>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
