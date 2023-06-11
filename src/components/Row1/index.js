import React from 'react';
import styles from './Row1.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useStore, actions } from '../../store';

import online from './online.png';

function Row1() {
    const [gbs,dispatch] = useStore();

    const [Week1, setWeek1] = useState([]);
    const [Week2, setWeek2] = useState([]);
    const [Week3, setWeek3] = useState([]);
    const [Week4, setWeek4] = useState([]);
    const [Week5, setWeek5] = useState([]);

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/monthsdata?year=${gbs.CrYear}&month=${gbs.CrMonth}&id=${gbs.UserId}`)
            .then(({data}) => {
                let sl = daysInMonth(gbs.CrMonth,gbs.CrYear);
                
                if(gbs.CrYear != gbs.Year || gbs.CrMonth != gbs.Month || 1 <= gbs.Week) 
                    setWeek1(data[0]['WEEK1_OUT']);
                else setWeek1('...');

                if(gbs.CrYear != gbs.Year || gbs.CrMonth != gbs.Month || 2 <= gbs.Week) 
                    setWeek2(data[0]['WEEK2_OUT']);
                else setWeek2('...');

                if(gbs.CrYear != gbs.Year || gbs.CrMonth != gbs.Month || 3 <= gbs.Week) 
                    setWeek3(data[0]['WEEK3_OUT']);
                else setWeek3('...');

                if(gbs.CrYear != gbs.Year || gbs.CrMonth != gbs.Month || 4 <= gbs.Week) 
                    setWeek4(data[0]['WEEK4_OUT']);
                else setWeek4('...');

                if((gbs.CrYear != gbs.Year || gbs.CrMonth != gbs.Month || 5 <= gbs.Week) && (Math.ceil(1.0*sl/7) == 5))
                    setWeek5(data[0]['WEEK5_OUT']);
                else setWeek5('...');
            })
        }
    ,[gbs.Render])   
    
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    function get(range,kind) {
        if (range == gbs.CrRange && kind == gbs.CrKind) return styles.onFocus + " " + styles.week;
        else return styles.week;
    }

    function handleClick(range,kind,data,number) {
        if(range == gbs.CrRange) return;
        if(data == '...') return;
        dispatch(actions.setCrRange(range));
        dispatch(actions.setCrKind(kind));


        if(gbs.Year == gbs.CrYear && gbs.Month == gbs.CrMonth && gbs.Week == number) 
            dispatch(actions.setCrDateth(gbs.Dateth));
        else {
            const sl = daysInMonth(gbs.CrMonth,gbs.CrYear);
            const day = Math.min(7*number,sl);
            dispatch(actions.setCrDateth(`${day}-${gbs.CrMonth}-${gbs.CrYear}`));
        }
    }

    function Week({ number, data }) {
        const range = `week${number}`;
        const kind = `out`;

        if(gbs.WindowSize <= 800) 
        return (
            <tr 
            onClick={() => handleClick(range,kind,data,number)}>
                <div className={get(range,kind)}>

                    <div>TUẦN {number}</div>
                    {
                        (data == '...' ? <div>{data}</div> : <div className={styles.moneyOut}>{data}k</div>)
                    }
                    {  
                        (number == gbs.Week && gbs.Month == gbs.CrMonth && gbs.Year == gbs.CrYear)  && <img src={online} />
                    }
                </div>
            </tr>
        )
        else 
        return (
            <td className={get(range,kind)} 
            onClick={() => handleClick(range,kind,data,number)}>
                <div>TUẦN {number}</div>
                {
                    (data == '...' ? <div>{data}</div> : <div className={styles.moneyOut}>{data}k</div>)
                }
                {  
                    (number == gbs.Week && gbs.Month == gbs.CrMonth && gbs.Year == gbs.CrYear)  && <img src={online} />
                }
            </td>
        )
    }
    
    return (
        <React.Fragment>
            {(gbs.WindowSize > 800?<td className={styles.month}>THÁNG {gbs.CrMonth}</td>:<></>)}

            <Week number={1} data={Week1} />
            <Week number={2} data={Week2} />
            <Week number={3} data={Week3} />
            <Week number={4} data={Week4} />
            <Week number={5} data={Week5} />

            {(gbs.WindowSize > 800?<td className={styles.month}>NHẬP LIỆU</td>:<></>)}
        </React.Fragment>
    )
}

export default Row1;