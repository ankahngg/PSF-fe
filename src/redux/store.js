import { configureStore } from '@reduxjs/toolkit'
import {dataSlice} from './data/dataSlice'
import {stateSlice} from './state/stateSlice'

const store = configureStore({
    reducer : {
        data : dataSlice.reducer,
        state : stateSlice.reducer,
    }
})

export default store;