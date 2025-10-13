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
}) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    material: true,
    color: true,
    room: true,
    brand: true,
  });

  const categories = [
    { id: "sofa", label: "Ghế Sofa" },
    { id: "chair", label: "Ghế Đơn"},
    { id: "table", label: "Bàn"},
    { id: "bed", label: "Giường"},
    { id: "wardrobe", label: "Tủ Quần Áo"},
    { id: "bookshelf", label: "Kệ Sách"},
    { id: "cabinet", label: "Tủ Trang Trí"},
    { id: "desk", label: "Bàn Làm Việc" },
  ];

  const colors = [
    { id: "brown", label: "Nâu", hex: "#8B4513"},
    { id: "white", label: "Trắng", hex: "#FFFFFF" },
    { id: "black", label: "Đen", hex: "#000000" },
    { id: "gray", label: "Xám", hex: "#808080" },
    { id: "beige", label: "Be", hex: "#F5F5DC" },
    { id: "blue", label: "Xanh Dương", hex: "#0066CC" },
    { id: "green", label: "Xanh Lá" },
    { id: "red", label: "Đỏ", hex: "#CC0000"},
  ];

  const rooms = [
    { id: "living-room", label: "Phòng Khách" },
    { id: "bedroom", label: "Phòng Ngủ" },
    { id: "dining-room", label: "Phòng Ăn" },
    { id: "office", label: "Văn Phòng",},
    { id: "kitchen", label: "Nhà Bếp" },
    { id: "bathroom", label: "Phòng Tắm" },
    { id: "outdoor", label: "Ngoài Trời" },
  ];

  const brands = [
    { id: "furnicraft-premium", label: "FurniCraft Premium" },
    { id: "eco-living", label: "Eco Living" },
    { id: "modern-home", label: "Modern Home" },
    { id: "classic-wood", label: "Classic Wood" },
    { id: "urban-style", label: "Urban Style" },
    { id: "comfort-zone", label: "Comfort Zone" },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev?.[section],
    }));
  };

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange("priceRange", newPriceRange);
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
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/80 z-50 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
        fixed lg:sticky top-0 right-0 h-full lg:h-auto w-80  border-r border-border z-50 lg:z-auto
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
                className="text-text-secondary hover:text-primary"
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

          {/* Category Filter */}
          <FilterSection title="Danh Mục" sectionKey="category">
            {categories?.map((category) => (
              <div
                key={category?.id}
                className="flex items-center justify-between"
              >
                <Checkbox
                  label={category?.label}
                  checked={filters?.categories?.includes(category?.id) || false}
                  onChange={(e) => {
                    const currentCategories = filters?.categories || [];
                    const newCategories = e?.target?.checked
                      ? [...currentCategories, category?.id]
                      : currentCategories?.filter((id) => id !== category?.id);
                    onFilterChange("categories", newCategories);
                  }}
                />
              </div>
            ))}
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection title="Khoảng Giá" sectionKey="price">
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Từ"
                value={priceRange?.min}
                onChange={(e) => handlePriceChange("min", e?.target?.value)}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Đến"
                value={priceRange?.max}
                onChange={(e) => handlePriceChange("max", e?.target?.value)}
                className="text-sm"
              />
            </div>
            <div className="text-xs text-text-secondary">
              Giá tính bằng VND (₫)
            </div>
          </FilterSection>

          {/* Room Filter */}
          <FilterSection title="Phòng" sectionKey="room">
            {rooms?.map((room) => (
              <div key={room?.id} className="flex items-center justify-between">
                <Checkbox
                  label={room?.label}
                  checked={filters?.rooms?.includes(room?.id) || false}
                  onChange={(e) => {
                    const currentRooms = filters?.rooms || [];
                    const newRooms = e?.target?.checked
                      ? [...currentRooms, room?.id]
                      : currentRooms?.filter((id) => id !== room?.id);
                    onFilterChange("rooms", newRooms);
                  }}
                />
              </div>
            ))}
          </FilterSection>

          {/* Brand Filter */}
          <FilterSection title="Thương Hiệu" sectionKey="brand">
            {brands?.map((brand) => (
              <div
                key={brand?.id}
                className="flex items-center justify-between"
              >
                <Checkbox
                  label={brand?.label}
                  checked={filters?.brands?.includes(brand?.id) || false}
                  onChange={(e) => {
                    const currentBrands = filters?.brands || [];
                    const newBrands = e?.target?.checked
                      ? [...currentBrands, brand?.id]
                      : currentBrands?.filter((id) => id !== brand?.id);
                    onFilterChange("brands", newBrands);
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
