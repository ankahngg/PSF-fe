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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/months_data`)
            .then(({data}) => {
                setWeek1(data[0]['WEEK1_OUT']);
                setWeek2(data[0]['WEEK2_OUT']);
                setWeek3(data[0]['WEEK3_OUT']);
                setWeek4(data[0]['WEEK4_OUT']);
                setWeek5(data[0]['WEEK5_OUT']);
            })
        }
    ,[gbs.Render])   


    function get(id) {
        if (id == gbs.currentState) return styles.onFocus + " " + styles.week;
        else return styles.week;
    }

    function handleClick(id) {
        dispatch(actions.setCurrentState(id));
        dispatch(actions.setSortState('tg'));
    }

    function Week({ number, data }) {
        
        const id = `week${number}_out`; 

        return (
            <td className={get(id)} onClick={() => handleClick(id)}>
                <div>TUẦN {number}</div>
                {
                    (number > gbs.Weekth) ? (<div>...</div>) : (<div>{data}k</div>)
                }
                {  
                    number == gbs.Weekth && <img src={online} />
                }
            </td>
        )
    }
    
    return (
        <React.Fragment>
            <td className={styles.month}>
                THÁNG {gbs.Month}
            </td>

            <Week number={1} data={Week1} />
            <Week number={2} data={Week2} />
            <Week number={3} data={Week3} />
            <Week number={4} data={Week4} />
            <Week number={5} data={Week5} />

            <td className={styles.month}>NHẬP LIỆU</td>
        </React.Fragment>
    )
}

export default Row1;