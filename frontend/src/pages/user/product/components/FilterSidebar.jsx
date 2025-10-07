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
    { id: "sofa", label: "Ghế Sofa", count: 156 },
    { id: "chair", label: "Ghế Đơn", count: 89 },
    { id: "table", label: "Bàn", count: 234 },
    { id: "bed", label: "Giường", count: 78 },
    { id: "wardrobe", label: "Tủ Quần Áo", count: 45 },
    { id: "bookshelf", label: "Kệ Sách", count: 67 },
    { id: "cabinet", label: "Tủ Trang Trí", count: 123 },
    { id: "desk", label: "Bàn Làm Việc", count: 91 },
  ];

  const materials = [
    { id: "wood", label: "Gỗ Tự Nhiên", count: 345 },
    { id: "engineered-wood", label: "Gỗ Công Nghiệp", count: 234 },
    { id: "metal", label: "Kim Loại", count: 156 },
    { id: "fabric", label: "Vải", count: 189 },
    { id: "leather", label: "Da", count: 78 },
    { id: "plastic", label: "Nhựa", count: 45 },
    { id: "glass", label: "Kính", count: 67 },
  ];

  const colors = [
    { id: "brown", label: "Nâu", hex: "#8B4513", count: 234 },
    { id: "white", label: "Trắng", hex: "#FFFFFF", count: 189 },
    { id: "black", label: "Đen", hex: "#000000", count: 156 },
    { id: "gray", label: "Xám", hex: "#808080", count: 145 },
    { id: "beige", label: "Be", hex: "#F5F5DC", count: 123 },
    { id: "blue", label: "Xanh Dương", hex: "#0066CC", count: 89 },
    { id: "green", label: "Xanh Lá", count: 67 },
    { id: "red", label: "Đỏ", hex: "#CC0000", count: 45 },
  ];

  const rooms = [
    { id: "living-room", label: "Phòng Khách", count: 345 },
    { id: "bedroom", label: "Phòng Ngủ", count: 234 },
    { id: "dining-room", label: "Phòng Ăn", count: 156 },
    { id: "office", label: "Văn Phòng", count: 123 },
    { id: "kitchen", label: "Nhà Bếp", count: 89 },
    { id: "bathroom", label: "Phòng Tắm", count: 67 },
    { id: "outdoor", label: "Ngoài Trời", count: 45 },
  ];

  const brands = [
    { id: "furnicraft-premium", label: "FurniCraft Premium", count: 234 },
    { id: "eco-living", label: "Eco Living", count: 189 },
    { id: "modern-home", label: "Modern Home", count: 156 },
    { id: "classic-wood", label: "Classic Wood", count: 123 },
    { id: "urban-style", label: "Urban Style", count: 89 },
    { id: "comfort-zone", label: "Comfort Zone", count: 67 },
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
                <span className="text-sm text-text-secondary">
                  ({category?.count})
                </span>
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

          {/* Material Filter */}
          <FilterSection title="Chất Liệu" sectionKey="material">
            {materials?.map((material) => (
              <div
                key={material?.id}
                className="flex items-center justify-between"
              >
                <Checkbox
                  label={material?.label}
                  checked={filters?.materials?.includes(material?.id) || false}
                  onChange={(e) => {
                    const currentMaterials = filters?.materials || [];
                    const newMaterials = e?.target?.checked
                      ? [...currentMaterials, material?.id]
                      : currentMaterials?.filter((id) => id !== material?.id);
                    onFilterChange("materials", newMaterials);
                  }}
                />
                <span className="text-sm text-text-secondary">
                  ({material?.count})
                </span>
              </div>
            ))}
          </FilterSection>

          {/* Color Filter */}
          <FilterSection title="Màu Sắc" sectionKey="color">
            <div className="grid grid-cols-2 gap-3">
              {colors?.map((color) => (
                <div key={color?.id} className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const currentColors = filters?.colors || [];
                      const newColors = currentColors?.includes(color?.id)
                        ? currentColors?.filter((id) => id !== color?.id)
                        : [...currentColors, color?.id];
                      onFilterChange("colors", newColors);
                    }}
                    className={`
                      w-6 h-6 rounded-full border-2 flex-shrink-0
                      ${
                        filters?.colors?.includes(color?.id)
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }
                    `}
                    style={{ backgroundColor: color?.hex }}
                  />
                  <span className="text-sm text-text-primary flex-1">
                    {color?.label}
                  </span>
                  <span className="text-xs text-text-secondary">
                    ({color?.count})
                  </span>
                </div>
              ))}
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
                <span className="text-sm text-text-secondary">
                  ({room?.count})
                </span>
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
                <span className="text-sm text-text-secondary">
                  ({brand?.count})
                </span>
              </div>
            ))}
          </FilterSection>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
