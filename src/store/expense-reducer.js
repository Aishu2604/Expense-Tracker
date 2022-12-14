import { createSlice } from "@reduxjs/toolkit";

const initialExpense = { expenses: [], premiumButton: false };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpense,
  reducers: {
    updateExpense(state, action) {
      state.expenses = action.payload;
    },
    setPremiumButton(state) {
      state.premiumButton = true;
    },
    unSetPremiumButton(state) {
      state.premiumButton = false;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
