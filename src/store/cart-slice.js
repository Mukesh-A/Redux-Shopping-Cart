import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemList: [],
    totalQuantity: 0,
    showCart: false,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      // console.log(newItem);
      //to check item available
      const exisitingItem = state.itemList.find(
        (item) => item.id === newItem.id
      );
      if (exisitingItem) {
        exisitingItem.quantity++;
        exisitingItem.totalPrice += newItem.price;
      } else {
        state.itemList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart(state, action) {
      const removeItemId = action.payload;

      const removeItem = state.itemList.find(
        (item) => item.id === removeItemId
      );
      // console.log(check);
      if (removeItem.quantity === 1) {
        // this will filter out the current id from the array (this id product will be not displayed)
        state.itemList = state.itemList.filter(
          (item) => item.id !== removeItemId
        );
        state.totalQuantity--;
      } else {
        removeItem.quantity--;
        removeItem.totalPrice -= removeItem.price;
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice;
