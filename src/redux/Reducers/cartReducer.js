import { createSlice } from "@reduxjs/toolkit"

const intialState = {
    itemNumber: 0,
    laoding : false,
    errors : null
}
const cartSlice = createSlice({
    name: "cart",
    initialState: intialState,
    reducers: {
        addItem: (state, action) => {
            state.itemNumber = state.itemNumber + 1
        },
        removeItem: (state, action) => {
            state.itemNumber = state.itemNumber - 1
        },
    }
})
export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer