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
        axios.get(`${process.env.REACT_APP_API_URL}/api/months_data`)
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
        if(i == 1) {
            dispatch(actions.setCurrentState("month_out"));
            dispatch(actions.setSortState("tg"));
        }
        else {
            dispatch(actions.setCurrentState("month_in"));
            dispatch(actions.setSortState("tg"));
        }
    }

    function get(id) {
        var classes = styles.tem;
        classes += " " + styles[id];
        if(id != "month_in") classes += " " + styles.bdbottom;
        if(id == gbs.currentState) classes += " " + styles.focus;
        
        return classes;
    }

    return (
        <React.Fragment>
            <div className={get("day_left")}>
                <div>
                    Còn
                </div>
                <div>
                    {gbs.Leftth}
                </div>
                <div>
                    Ngày
                </div>
            </div>
            <div className={get("month_out")} onClick={()=>handleClick(1)}>
                <div>
                    Đã
                </div>
                <div>
                    {moneyOut}k
                </div>
                <img className={styles.chi} src={Chi} />
                <div>
                    Tiêu
                </div>
            </div>
            <div className={get("month_in")} onClick={()=>handleClick(2)}>
                <div>
                    Đã
                </div>
                <div>
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