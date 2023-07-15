import { useEffect, useState } from 'react';
import styles from './YearChoosen.module.scss';
import online_png from '../../file/online.png';
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import green_arrow from '../../file/green_arrow.png';
import red_arrow from '../../file/red_arrow.png';
import black_arrow from '../../file/black_arrow.png';


const date = new Date();
const year = date.getFullYear();
const len = 1;



function YearChoosen() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);
    const data = useSelector((state) => state.data);

   
    const [YearState, SetYearState] = useState(state.CrYear);
    const listYears = [];
    const listMonth = [];

    for (let i = 1; i <= len; i++) listYears.push(year - i + 1);
    for (let i = 1; i <= 12; i++) listMonth.push(i);

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    } 

    function handleClick(month,val) {
        if (val == '...') return;

        dispatch(stateSlice.actions.setCrYear(YearState));
        dispatch(stateSlice.actions.setCrMonth(month));
        dispatch(stateSlice.actions.setCrRange('month'));
        dispatch(stateSlice.actions.setCrKind('out'));
        if (month == state.Month && YearState == state.Year) dispatch(stateSlice.actions.setCrDateth(state.Dateth));
        else {
            const day = daysInMonth(month, YearState);
            dispatch(stateSlice.actions.setCrDateth(`${day}-${month}-${year}`));
        }
        dispatch(stateSlice.actions.setCrState('month'));
    }

    function GetArrow(moneyIn,moneyOut){
        if(moneyIn == '...') return <img src={black_arrow} />
        if( moneyIn-moneyOut >= 0) return <img src={green_arrow} /> 
        else return <img src={red_arrow} />
    }

    return (
        <div className={styles.container}>
            <div className={styles.row1}>
                <label>NĂM</label>
                <select name="year" className={styles.yearOption}
                    onChange={(e) => SetYearState(e.target.value)}
                    value={YearState}
                    >
                    {
                        listYears.map((value, index) => {
                            return (<option key={index} value={value}>{value}</option>)
                        })
                    }
                </select>
            </div>
            <div className={styles.row2}>
                <h1>{YearState}</h1>
            </div>

            <div className={styles.row3}>
                
                <div className={styles.grid_container}>
                    {
                        listMonth.map((value, index) => {
                            let moneyIn = data[`year${YearState}`][`month${value}`].in;
                            let moneyOut = data[`year${YearState}`][`month${value}`].out;
                            if(YearState == state.Year && value > state.Month) 
                                moneyIn = moneyOut = '...';

                            return (
                                <div key={index}
                                className={styles.grid_items + (state.CrYear == YearState && state.CrMonth == value ? " " + styles.onFocus : "")}
                                onClick={() => handleClick(value,moneyIn)}>
                                    <div className={styles.thang}>
                                        THÁNG {value}
                                        {(state.Year == YearState && state.Month == value ? <img className={styles.online} src={online_png} /> : <div></div>)}
                                    </div>

                                    <div className={styles.main}>
                                        <div className={styles.left_part}>
                                            <div>   
                                                <span className={styles.moneyOut}> {moneyOut}k</span>
                                            </div>
                                            <div>
                                                <span className={styles.moneyIn}> {moneyIn}k</span>
                                            </div>
                                        </div>

                                        <div className={styles.right_part}>
                                            {GetArrow(moneyIn,moneyOut)}
                                            <div>
                                                {(moneyIn != '...' ? `${Math.abs(moneyIn-moneyOut)}k` : '...')}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default YearChoosen;