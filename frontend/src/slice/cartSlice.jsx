import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingItem = state.items.find(
        (item) => item._id === productToAdd._id
      );
      const quantityToAdd = productToAdd.quantity || 1;
      const available = Number(productToAdd.so_luong ?? Infinity);

      if (existingItem) {
        const newQty = existingItem.quantity + quantityToAdd;
        if (newQty > available) {
          existingItem.quantity = available;
          toast.error(
            `Không thể thêm quá ${available} "${productToAdd.ten_san_pham}".`
          );
        } else {
          existingItem.quantity = newQty;
          toast.info(
            `Đã cập nhật số lượng "${productToAdd.ten_san_pham}" trong giỏ hàng`
          );
        }
      } else {
        if (quantityToAdd > available) {
          state.items.push({ ...productToAdd, quantity: available });
          toast.error(
            `Chỉ còn ${available} "${productToAdd.ten_san_pham}" trong kho. Đã thêm ${available}.`
          );
        } else {
          state.items.push({ ...productToAdd, quantity: quantityToAdd });
          toast.success(`Đã thêm "${productToAdd.ten_san_pham}" vào giỏ hàng!`);
        }
      }
    },

    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item._id !== productIdToRemove
      );
      toast.error("Đã xóa sản phẩm khỏi giỏ hàng.");
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        const available = Number(item.so_luong ?? Infinity);
        if (item.quantity < available) {
          item.quantity += 1;
        } else {
          toast.warn(
            `Chỉ còn ${available} sản phẩm "${item.ten_san_pham}" trong kho.`
          );
        }
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        const available = Number(item.so_luong ?? Infinity);
        if (quantity < 1) return;
        if (quantity > available) {
          item.quantity = available;
          toast.error(
            `Chỉ còn ${available} sản phẩm "${item.ten_san_pham}" trong kho.`
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
