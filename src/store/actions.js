import * as actions from './constants';

export const setRender = payload => ({
    type : actions.SET_RENDER,
    payload
})

export const setLoader = payload => ({
    type : actions.SET_LOADER,
    payload
})

export const setUserId = payload => ({
    type : actions.SET_USERID,
    payload
})

export const setCrMonth = payload => ({
    type : actions.SET_CURRENT_MONTH,
    payload
})

export const setCrYear = payload => ({
    type : actions.SET_CURRENT_YEAR,
    payload
})

export const setCrRange = payload => ({
    type : actions.SET_CURRENT_RANGE,
    payload
})

export const setCrKind = payload => ({
    type : actions.SET_CURRENT_KIND,
    payload
})

export const setCrState = payload => ({
    type : actions.SET_CURRENT_STATE,
    payload
})

export const setCrDateth = payload => ({
    type : actions.SET_CURRENT_DATETH,
    payload
})
export const setWindowSize = payload => ({
    type : actions.SET_WINDOW_SIZE,
    payload
})
export const setYearData = payload => ({
    type : actions.SET_YEAR_DATA,
    payload
})