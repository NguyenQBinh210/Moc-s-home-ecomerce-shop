import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../../components/AppIcon";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

const SearchBar = ({ onSearch, searchQuery, suggestions = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery || "");
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const popularSearches = [
    "Ghế sofa da",
    "Bàn làm việc gỗ",
    "Tủ quần áo hiện đại",
    "Giường ngủ cao cấp",
    "Kệ sách gỗ tự nhiên",
    "Bàn ăn gia đình",
    "Ghế văn phòng ergonomic",
    "Tủ trang trí phòng khách",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef?.current &&
        !containerRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    setShowSuggestions(value?.length > 0);
  };

  const handleSearch = (query = localQuery) => {
    if (query?.trim()) {
      onSearch(query?.trim());
      setShowSuggestions(false);
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleFocus = () => {
    setIsExpanded(true);
    if (localQuery?.length > 0) {
      setShowSuggestions(true);
    }
  };

  const clearSearch = () => {
    setLocalQuery("");
    onSearch("");
    inputRef?.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div
        className={`
        relative flex items-center bg-background border border-border rounded-xl
        transition-all duration-300 shadow-warm
        ${
          isExpanded
            ? "ring-2 ring-primary/20 border-primary/30"
            : "hover:border-primary/50"
        }
      `}
      >
        <div className="flex items-center pl-4">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>

        <Input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm sản phẩm, danh mục, thương hiệu..."
          value={localQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          className="flex-1 border-0 bg-transparent focus:ring-0 text-base"
        />

        <div className="flex items-center pr-2 space-x-2">
          {localQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              iconName="X"
              className="text-text-secondary hover:text-text-primary"
            />
          )}

          <Button
            variant="default"
            size="sm"
            onClick={() => handleSearch()}
            iconName="Search"
            className="px-4"
          >
            Tìm
          </Button>
        </div>
      </div>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (isExpanded || localQuery?.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-warm-lg z-50 max-h-96 overflow-y-auto">
          {/* Search Results */}
          {suggestions?.length > 0 && (
            <div className="p-4 border-b border-border">
              <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
                Gợi ý tìm kiếm
              </h4>
              <div className="space-y-2">
                {suggestions?.slice(0, 5)?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-surface transition-colors text-left"
                  >
                    <Icon
                      name="Search"
                      size={16}
                      className="text-text-secondary"
                    />
                    <span className="text-text-primary">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
              Tìm kiếm phổ biến
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {popularSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface transition-colors text-left"
                >
                  <Icon name="TrendingUp" size={16} className="text-accent" />
                  <span className="text-text-primary text-sm">{search}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Categories */}
          <div className="p-4 border-t border-border">
            <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
              Danh mục nhanh
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Ghế Sofa",
                "Bàn Làm Việc",
                "Giường Ngủ",
                "Tủ Quần Áo",
                "Kệ Sách",
              ]?.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSuggestionClick(category)}
                  className="px-3 py-1 bg-surface hover:bg-primary/10 rounded-full text-sm text-text-primary transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
