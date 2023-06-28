import React from 'react';
import styles from './Row1.module.scss';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import { weekSelectorOut } from '../../redux/selector';
import online from './online.png';

function Row1() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    function get(range,kind) {
        if (range == state.CrRange && kind == state.CrKind) return styles.onFocus + " " + styles.week;
        else return styles.week;
    }

    function handleClick(range,kind,data,number) {
        if(data == '...') return;

        dispatch(stateSlice.actions.setCrWeek(number));
        dispatch(stateSlice.actions.setCrRange(range));
        dispatch(stateSlice.actions.setCrKind(kind));


        if(state.Year == state.CrYear && state.Month == state.CrMonth && state.Week == number) 
            dispatch(stateSlice.actions.setCrDateth(state.Dateth));
        else {
            const sl = daysInMonth(state.CrMonth,state.CrYear);
            const day = Math.min(7*number,sl);
            dispatch(stateSlice.actions.setCrDateth(`${day}-${state.CrMonth}-${state.CrYear}`));
        }
    }

    function Week({ number }) {
        const range = `week${number}`;
        const kind = `out`;
        const day = daysInMonth(state.CrMonth,state.CrYear);

        let sum = useSelector((state) => weekSelectorOut(state,number));
        if(state.CrYear == state.Year && state.CrMonth > state.Month) sum = '...';
        if(state.CrYear == state.Year && state.CrMonth == state.Month && number > state.Week) sum = '...';
        if(Math.ceil(day/7) < number) sum = '...';

        if(state.WindowSize <= 800) 
        return (
            <tr 
            onClick={() => handleClick(range,kind,sum,number)}>
                <div className={get(range,kind)}>

                    <div>TUẦN {number}</div>
                    {
                        (sum == '...' ? <div>{sum}</div> : <div className={styles.moneyOut}>{sum}k</div>)
                    }
                    {  
                        (number == state.Week && state.Month == state.CrMonth && state.Year == state.CrYear)  && <img src={online} />
                    }
                </div>
            </tr>
        )
        else 
        return (
            <div className={get(range,kind)} 
            onClick={() => handleClick(range,kind,sum,number)}>
                <div>TUẦN {number}</div>
                {
                    (sum == '...' ? <div>{sum}</div> : <div className={styles.moneyOut}>{sum}k</div>)
                }
                {  
                    (number == state.Week && state.Month == state.CrMonth && state.Year == state.CrYear)  && <img src={online} />
                }
            </div>
        )
    }
    
    return (
        <div className={styles.container}>
            <Week number={1}  />
            <Week number={2}  />
            <Week number={3}  />
            <Week number={4}  />
            <Week number={5}  />
        </div>
    )
}

export default Row1;