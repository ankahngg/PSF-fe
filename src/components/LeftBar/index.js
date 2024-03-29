import React from 'react';
import styles from './LeftBar.module.scss';
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import { moneyOutSelector, moneyInSelector } from '../../redux/selector';
import green_arrow from '../../file/green_arrow.png';
import red_arrow from '../../file/red_arrow.png';


import Chi from './Chi.png';
import Thu from './Thu.png'


function LeftBar() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);
   
    const MoneyOut = useSelector(moneyOutSelector);
    const MoneyIn = useSelector(moneyInSelector);


    function handleClick(i) {
        function daysInMonth (month, year) {
            return new Date(year, month, 0).getDate();
        }

        dispatch(stateSlice.actions.setCrRange("month"));
        if(i == 1) dispatch(stateSlice.actions.setCrKind("out"));
        else dispatch(stateSlice.actions.setCrKind("in"));

        if(state.Year == state.CrYear && state.Month == state.CrMonth) 
            dispatch(stateSlice.actions.setCrDateth(state.Dateth));
        else {
            const day = daysInMonth(state.CrMonth,state.CrYear);
            dispatch(stateSlice.actions.setCrDateth(`${day}-${state.CrMonth}-${state.CrYear}`));
        }
    }

    function get(range,kind) {
        var classes = styles.tem;
        classes += " " + styles[kind];
        if(kind != 'in') classes += " " + styles.bdbottom;
        if(range == state.CrRange && kind == state.CrKind) classes += " " + styles.focus;
        
        return classes;
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid_items + " " + styles.row1}>
                <div className={styles.tem2}>
                    <div>
                        Còn
                    </div>
                    <div>
                        {
                            (state.CrMonth == state.Month && state.CrYear == state.Year ? state.Leftth : 0)
                        }
                    </div>
                    <div>
                        Ngày
                    </div>
                </div>
                <div className={styles.tem3}>
                    {(MoneyIn-MoneyOut >= 0 ? <img src={green_arrow} /> : <img src={red_arrow} />)}
                    <div>{Math.abs(MoneyIn-MoneyOut)}k</div>
                    
                </div>
            </div>
            <div className={styles.grid_items + " " +get('month','out')} onClick={()=>handleClick(1)}>
                <div>
                    Đã
                </div>
                <div className={styles.moneyOut}>
                    {MoneyOut}k
                </div>
                <img className={styles.chi} src={Chi} />
                <div>
                    Tiêu
                </div>
            </div>
            <div className={styles.grid_items + " " +get('month','in')} onClick={()=>handleClick(2)}>
                <div>
                    Đã
                </div>
                <div className={styles.moneyIn}>
                    {MoneyIn}k
                </div>
                <img className={styles.thu} src={Thu} />
                <div>
                    Kiếm
                </div>
            </div>

        </div>
    )
}

export default LeftBar;