import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import agent from "../../ApiMiddleWare/Agent";
import { Basket } from "../../Models/basket";
import axios from "axios";
import BasketPage from "./BasketPage";

interface BasketState {
  basket: Basket | null;
  status: string;
  totalAmount: number;
  loading: boolean;
  error: string;
}

const initialState: BasketState = {
  basket: null,
  totalAmount: 0,
  status: "idle",
  loading: false,
  error: "",
};

export const fetchBasket = createAsyncThunk("basket/fetchBasket", async (_,thunkApi) => {
  try {
    return await agent.Basket.get().then((response) => response);
  } catch (error:any) {
    console.log("Error while fetching-->", error);
    return thunkApi.rejectWithValue({error:error.data})
  }
});

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity?: number }
>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkApi) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>("basket/removeBasketItemAsync", async ({ productId, quantity },thunkApi) => {
  try {
    await agent.Basket.deleteItem(productId, quantity);
  } catch (error:any) {
   return thunkApi.rejectWithValue({error:error.data})
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },

    // removeItem: (state, action) => {
    //Using below code in extra reducers
    // const { productId, quantity } = action.payload;
    // const itemIndex = state.basket?.items.findIndex(
    //   (i) => i.productId === productId
    // );

    // if (itemIndex === -1 || itemIndex === undefined) return;
    // state.basket!.items[itemIndex].quantity -= quantity;
    // if (state.basket?.items[itemIndex].quantity === 0)
    //   state.basket.items.splice(itemIndex, 1);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBasket.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchBasket.fulfilled, (state, action) => {
      state.loading = false;
      state.basket = action.payload;
      state.error = "";
    });

    builder.addCase(fetchBasket.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.error.message;
      console.log(action.payload)
    });

    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      // console.log(action);
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });

    builder.addCase(addBasketItemAsync.rejected, (state,action) => {
      state.status = "idle";
     
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });

    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );

      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket?.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
      state.status = "idle";
    });

    builder.addCase(removeBasketItemAsync.rejected, (state,action) => {
      state.status = "idle";
      console.log(action.payload)
    });
  },
});

export const { setBasket } = basketSlice.actions;
