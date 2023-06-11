import { useEffect, useState } from 'react';
import styles from './YearChoosen.module.scss';
import { actions, useStore } from '../../store';
import axios from 'axios';
import online_png from '../../file/online.png';

const date = new Date();
const year = date.getFullYear();
const len = 5;



function YearChoosen() {
    const [gbs,dispatch] = useStore();
    const [YearState,SetYearState] = useState(year);
    const listYears = [];
    const listMonth = [];
    
    for(let i=1;i<=len;i++) listYears.push(year-i+1);
    for(let i=1;i<=12;i++) listMonth.push(i);

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }


    async function getdata(month,year,userid) {
        // if(gbs.YearData[`year${year}`][`month${month}`] != -1) return;
        // const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/monthsdata?year=${year}&month=${month}&id=${userid}`);
        // const data = res.data;
        // if(data == "khong co du lieu" || (year == gbs.Year && month > gbs.Month)) 
        //     dispatch(actions.setYearData({
        //         year : `year${year}`,
        //         month : `month${month}`,
        //         in : '...',
        //         out : '...'
        //     }))
           
        // else 
        //     dispatch(actions.setYearData({
        //         year : `year${year}`,
        //         month : `month${month}`,
        //         in : data[0]['MONTH_IN'],
        //         out : data[0]['MONTH_OUT']
        //     }))
    }

    function handleClick(val) {
        if(gbs.YearData[`year${YearState}`][`month${val}`].in == '...') return;

        dispatch(actions.setCrYear(YearState));
        dispatch(actions.setCrMonth(val));
        dispatch(actions.setCrRange('month'));
        dispatch(actions.setCrKind('out'));
        if(val == gbs.Month && YearState == gbs.Year) dispatch(actions.setCrDateth(gbs.Dateth));
        else {
            const day = daysInMonth(val,YearState);
            dispatch(actions.setCrDateth(`${day}-${val}-${year}`));
        }
        dispatch(actions.setCrState('month'));
    }

    useEffect(() => {
        for(let i=1;i<=12;i++) getdata(i,YearState,gbs.UserId)
    },[YearState])


    return (
        <div className={styles.container}>
            <div className={styles.row1}>
                <label>NĂM</label>
                <select name="year" className={styles.yearOption} 
                onChange={(e) => SetYearState(e.target.value)}>
                {
                    listYears.map((value,index) =>{ 
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
                        listMonth.map((value,index) => {
                            return (
                                <div key={index} 
                                className={styles.grid_items+(gbs.CrYear == YearState && gbs.CrMonth == value ? " "+styles.onFocus:"")}
                                onClick={() => handleClick(value)}>
                                    {(gbs.Year == YearState && gbs.Month == value ? <img src={online_png}/> : <div></div>)}
                                    <div className={styles.thang}>
                                        THÁNG {value}
                                    </div>
                                    <div>
                                        <span>CHI :</span> 
                                        <span className={styles.moneyOut}> {gbs.YearData[`year${YearState}`][`month${value}`].out}k</span>
                                    </div>
                                    <div>
                                        <span>THU :</span> 
                                        <span className={styles.moneyIn}> {gbs.YearData[`year${YearState}`][`month${value}`].in}k</span>
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