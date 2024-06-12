import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        subTotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        count: 0
    },
    reducers: {
      increment: (state, action) => {
        const item = state.cartItems.findIndex((i) => i.id === action.payload);
        if (item !== -1) {
            state.cartItems[item].quantity += 1;
        }
    },
    decrement: (state, action) => {
        const item = state.cartItems.findIndex((i) => i.id === action.payload);
        if (item !== -1 && state.cartItems[item].quantity > 1) {
            state.cartItems[item].quantity -= 1;
        }
    }
    ,
        deleteHandler: (state, action) => {
          state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
        },
        calculatePrice: (state) => {
          let sum = 0;
          state.cartItems.forEach(i => sum += i.price * i.quantity); 
          state.subTotal = sum;
          state.shipping = state.subTotal > 100 ? 0 : 20;
          state.tax = Math.floor( (state.subTotal * 0.2 > 50 ? 0 : state.subTotal * 0.2).toFixed(2));
          state.total  = Number(state.subTotal) + Number(state.shipping) + Number(state.tax); 
           
        },
        addToCart: (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.id === item.id);
      
            if (isItemExist) {
              state.cartItems.forEach((i) => {
                if (i.id === item.id) i.quantity ++;
              });
            } else {
              state.cartItems.push(item);
            }
        }
    }
});

export const { increment,deleteHandler, decrement, addToCart,calculatePrice } = cartReducer.actions;

export default cartReducer.reducer;
