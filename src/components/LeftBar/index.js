import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import styles from './LeftBar.module.scss';
import { useStore, actions } from '../../store';

import Chi from './Chi.png';
import Thu from './Thu.png'


function LeftBar() {
    const [gbs, dispatch] = useStore();
    const [moneyIn, setmoneyIn] = useState();
    const [moneyOut, setmoneyOut] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/monthsdata?year=${gbs.CrYear}&month=${gbs.CrMonth}&id=${gbs.UserId}`)
            .then(({data}) => {

                // cal total month_money_out
                
                setmoneyIn(data[0]['MONTH_IN']);
                setmoneyOut(data[0]['MONTH_OUT']);
                
            })
            .catch((res) => {
                setmoneyOut(0);
                setmoneyIn(0);
            })
    },[gbs.Render])

    function handleClick(i) {
        function daysInMonth (month, year) {
            return new Date(year, month, 0).getDate();
        }

        if(i == 1) {
            dispatch(actions.setCrRange("month"));
            dispatch(actions.setCrKind("out"));
            if(gbs.Year == gbs.CrYear && gbs.Month == gbs.CrMonth) 
                dispatch(actions.setCrDateth(gbs.Dateth));
            else {
                const day = daysInMonth(gbs.CrMonth,gbs.CrYear);
                dispatch(actions.setCrDateth(`${day}-${gbs.CrMonth}-${gbs.CrYear}`));
            }
        }
        else {
            dispatch(actions.setCrRange("month"));
            dispatch(actions.setCrKind("in"));
            if(gbs.Year == gbs.CrYear && gbs.Month == gbs.CrMonth) 
                dispatch(actions.setCrDateth(gbs.Dateth));
            else {
                const day = daysInMonth(gbs.CrMonth,gbs.CrYear);
                dispatch(actions.setCrDateth(`${day}-${gbs.CrMonth}-${gbs.CrYear}`));
            }
        }

    }

    function get(range,kind) {
        var classes = styles.tem;
        classes += " " + styles[kind];
        if(kind != 'in') classes += " " + styles.bdbottom;
        if(range == gbs.CrRange && kind == gbs.CrKind) classes += " " + styles.focus;
        
        return classes;
    }

    return (
        <React.Fragment>
            <div className={get("day_left") + " " + styles.dayLeft}>
                <div>
                    Còn
                </div>
                <div>
                    {
                        (gbs.CrMonth == gbs.Month && gbs.CrYear == gbs.Year ? gbs.Leftth : 0)
                    }
                </div>
                <div>
                    Ngày
                </div>
            </div>
            <div className={get('month','out')} onClick={()=>handleClick(1)}>
                <div>
                    Đã
                </div>
                <div className={styles.moneyOut}>
                    {moneyOut}k
                </div>
                <img className={styles.chi} src={Chi} />
                <div>
                    Tiêu
                </div>
            </div>
            <div className={get('month','in')} onClick={()=>handleClick(2)}>
                <div>
                    Đã
                </div>
                <div className={styles.moneyIn}>
                    {moneyIn}k
                </div>
                <img className={styles.thu} src={Thu} />
                <div>
                    Kiếm
                </div>
            </div>

        </React.Fragment>
    )
}

export default LeftBar;