"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the initial state using that type
export const cartSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
      // add to cart functionality
      add(state: any, action) {
        let uuid = Math.floor(1000 + Math.random() * 9000);
        let newobj = { ...action.payload, uuid };
        state.push(newobj);
      },
     // delete from cart
     remove(state: any, { payload }) {
      return state.filter((val: any) => val.uuid !== payload)
    },
     // addition of item
     addition(state: any, action) {
      let obj = state.find(
        (val: any) =>
          val.id == action.payload.id 
      )
      if (obj) {
        ++obj.qty
        let newState = state.filter((val: any) => val.id !== obj.id)
        state = [...newState, obj]
        return
      }
    },
    // subtraction of item
    subraction(state: any, action) {
      let obj = state.find(
        (val: any) =>
          val.id == action.payload.id      )
      if (obj !== undefined) {
        --obj.qty
        let newState = state.filter((val: any) => val.uuid !== obj.uuid)
        state = [...newState, obj]
        return
      }
    },
     // Action to clear the cart and remove order from localStorage
     removeOrderFromLocalStorage(state: any) {
      // Empty the cart in the Redux state
      state.length = 0;
      // Remove the cart details from localStorage
      localStorage.removeItem('cart');
    },
  }
})

export const {add,remove,addition,subraction,removeOrderFromLocalStorage} =  cartSlice.actions

export default cartSlice.reducer