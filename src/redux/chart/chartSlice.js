import { createSlice } from "@reduxjs/toolkit";
const date = new Date();
const Year = date.getFullYear();
const Month = date.getMonth() + 1;

const init = {
    Month,
    Year,
    CrMonth : Month,
    CrYear  : Year
}

export const chartSlice = createSlice({
    name:'chart',
    initialState : init,
    reducers : {
        setCrMonth  : (state,action) => {
            state.CrMonth = action.payload;
        },
        setCrYear : (state,action) => {
            state.CrYear = action.payload;
        },
    }
})