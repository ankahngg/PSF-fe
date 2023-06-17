import { createSlice } from "@reduxjs/toolkit";

const date = new Date();
const Year = date.getFullYear();
const len = 5;
const YearData = {};

for(let i=Year; i >= Year-len+1; i--) {
    YearData[`year${i}`] = {}
    for(let j=1;j<=12;j++) {
        YearData[`year${i}`][`month${j}`] = {
            in:0,
            out:0,
            list : [
                // id:1,
                // date:'12-5-2022',
                // money:'100',
                // kind:'in',
                // note :'buy food'
            ]
        }
    }
}

export const dataSlice = createSlice({
    name: 'data',
    initialState : YearData,
    reducers : {
        addNote : (state,action) => {
            const payload = action.payload;
            const arr = payload.date.split('-');
            const CrYear = `year${arr[2]}`;
            const CrMonth = `month${arr[1]}`;
            const CrId =  state[CrYear][CrMonth].list.length;
            state[CrYear][CrMonth].list.push({
                id : payload.id,
                date : payload.date,
                money : payload.money,
                kind : payload.kind,
                note : payload.note
            })
            if(payload.kind == 'in') state[CrYear][CrMonth].in += +payload.money;
            else state[CrYear][CrMonth].out += +payload.money;
        },
        removeNote : (state,action) => {
            const payload = action.payload;
            const arr = payload.date.split('-');
            const CrYear = `year${arr[2]}`;
            const CrMonth = `month${arr[1]}`;
            const pos = state[CrYear][CrMonth].list.findIndex((val) => {return val.id == payload.id});
            state[CrYear][CrMonth].list.splice(pos,1);
            if(payload.kind == 'in') state[CrYear][CrMonth].in -= +payload.money;
            else state[CrYear][CrMonth].out -= +payload.money;
        }
    }
})