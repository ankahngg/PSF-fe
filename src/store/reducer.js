import * as types from './constants';

const dayLeft = function () {
    const date = new Date();
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate() - date.getDate() + 1;
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

const date = new Date();
const Week = Math.ceil(date.getDate() / 7);
const Year = date.getFullYear();
const Month = date.getMonth() + 1;
const Dateth = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
const Leftth = dayLeft();


const len = 5;
const YearData = {};

for(let i=Year; i >= Year-len+1; i--) {
    YearData[`year${i}`] = {}
    for(let j=1;j<=12;j++) YearData[`year${i}`][`month${j}`] = {in:-1,out:-1}
}

const initState = {
    YearData
}

const initState = {
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

    
        
};


function reducer(state = initState, action) {
    
    switch (action.type) {

        case types.SET_LOADER:
            return {
                ...state,
                Loader: action.payload
            }

        case types.SET_RENDER:
            return {
                ...state,
                Render: !state.Render
            }

        case types.SET_USERID:
            return {
                ...state,
                UserId: action.payload
            }
        case types.SET_CURRENT_MONTH:
            return {
                ...state,
                CrMonth: action.payload
            }
        case types.SET_CURRENT_YEAR:
            return {
                ...state,
                CrYear: action.payload
            }

        case types.SET_CURRENT_RANGE:
            return {
                ...state,
                CrRange: action.payload
            }
            
        case types.SET_CURRENT_KIND:
            return {
                ...state,
                CrKind: action.payload
            }
        
        case types.SET_CURRENT_WEEK:
        return {
            ...state,
            CrWeek: action.payload
        }

        case types.SET_CURRENT_STATE:
        return {
            ...state,
            CrState: action.payload
        }

        case types.SET_CURRENT_DATETH:
        return {
            ...state,
            CrDateth: action.payload
        }

        case types.SET_WINDOW_SIZE:
        return {
            ...state,
            WindowSize: action.payload
        }

        case types.SET_YEAR_DATA:
            const payload = action.payload;
            const tmp = {...state.YearData};
            tmp[payload.year][payload.month] = {
                in : payload.in,
                out : payload.out
            }
            tmp[payload.stt] = {
                in : payload.in,
                in : payload.out
            }
            return {
                ...state,
                YearData: tmp
            }


        default:
            throw new Error('invalid action');
    }
}

export default reducer;
export { initState };