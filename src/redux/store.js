import { configureStore } from '@reduxjs/toolkit'
import {dataSlice} from './data/dataSlice'
import {stateSlice} from './state/stateSlice'
import {chartSlice} from './chart/chartSlice'

const store = configureStore({
    reducer : {
        data : dataSlice.reducer,
        state : stateSlice.reducer,
        chart : chartSlice.reducer
    }
})

export default store;