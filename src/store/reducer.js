import * as types from './constants';



const dayLeft = function() {
    const date = new Date();
    const d = new Date(date.getFullYear(), date.getMonth()+1,0);
    return d.getDate() - date.getDate() + 1;
}

const date = new Date();
const Weekth = Math.ceil(date.getDate() / 7);
const Month = date.getMonth() + 1;
const Dateth = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
const Leftth = dayLeft();


const initState = {
    date,
    Weekth,
    Month,
    Dateth,
    Leftth,
    Render : 0,
    sortState : "tg",
    currentState : "week"+Weekth+"_out",
    Loader : 0,
    Token : (localStorage.getItem("email") != null)
};


function reducer(state,action) {
    switch(action.type) {
        case types.SET_CURRENT_STATE:
            return {
                ...state,
                currentState : action.payload
            }

        case types.SET_SORT_STATE:
            return {
                ...state,
                sortState : action.payload
            }
        
        case types.SET_LOADER:
            return {
                ...state,
                Loader : action.payload
            }
        
        case types.SET_RENDER:
            return {
                ...state,
                Render : !state.Render
            }

        case types.SET_TOKEN:
            return {
                ...state,
                Token : action.payload
            }
        
        default:
            throw new Error('invalid action');
    }
}

export default reducer;
export {initState};