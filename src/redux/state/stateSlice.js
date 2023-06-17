import { createSlice } from "@reduxjs/toolkit";


const dayLeft = function () {
    const date = new Date();
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate() - date.getDate() + 1;
}

const date = new Date();
const Week = Math.ceil(date.getDate() / 7);
const Year = date.getFullYear();
const Month = date.getMonth() + 1;
const Dateth = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
const Leftth = dayLeft();



export const stateSlice = createSlice({
    name: 'state',
    initialState: {


        Week, // Week now
        Month, // Month now
        Year, // Year now
        Dateth, // Date now
        Leftth, // Day left

        CrKind: 'out',
        CrRange: `week${Week}`,
        CrWeek : Week,
        CrYear: Year,
        CrMonth: Month,
        CrState : 'month',
        CrDateth : Dateth,

        Loader: 0,
        Render: 0,

        UserId: (localStorage.getItem('id') ? localStorage.getItem('id') : ''),

        WindowSize : window.innerWidth,
    },
    reducers: {
        setCrKind : (state,action) => {
            state.CrKind = action.payload;
        },
        setCrRange : (state,action) => {
            state.CrRange = action.payload;
        },
        setCrYear : (state,action) => {
            state.CrYear = action.payload;
        },
        setCrMonth : (state,action) => {
            state.CrMonth = action.payload;
        },
        setCrWeek : (state,action) => {
            state.CrWeek = action.payload;
        },
        setCrDateth : (state,action) => {
            state.CrDateth = action.payload;
        },
        setCrState : (state,action) => {
            state.CrState = action.payload;
        },
        setLoader : (state,action) => {
            state.Loader = action.payload;
        },
        setRender : (state,action) => {
            state.Render = !state.Render;
        },
        setWindowSize : (state,action) => {
            state.WindowSize = action.payload;
        },
        setUserId : (state,action) => {
            state.UserId = action.payload;
        }

    }
})



