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
      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        toast.info(
          `Đã cập nhật số lượng "${productToAdd.ten_san_pham}" trong giỏ hàng`
        );
      } else {
        state.items.push({ ...productToAdd, quantity: quantityToAdd });
        toast.success(`Đã thêm "${productToAdd.ten_san_pham}" vào giỏ hàng!`);
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
        item.quantity += 1;
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
      if (item && quantity >= 1) {
        item.quantity = quantity;
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
