import * as actions from './constants';

export const setCurrentState = payload => ({
    type:actions.SET_CURRENT_STATE,
    payload
})

export const setSortState = payload => ({
    type : actions.SET_SORT_STATE,
    payload
})

export const setRender = payload => ({
    type : actions.SET_RENDER,
    payload
})

export const setLoader = payload => ({
    type : actions.SET_LOADER,
    payload
})

export const setToken = payload => ({
    type : actions.SET_TOKEN,
    payload
})