import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import styles from './ShowHistory.module.scss';
import { CurrentContext } from '../../provider/CurentContext';
import axios from 'axios';



function ShowHistory() {

    const context = useContext(CurrentContext); 

    const [list,setList] = useState([]);
   
    
    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API_URL}/api/${context.Current}_${context.State}`)
            .then((res) => {
                setList(res.data);
            })
            .catch(() => {
                setList([]);
            })
    },[context])

    function handleClick(i) {
        context.setState(i);
    }

    function handleRemove(dt) {
        axios.post(`${process.env.REACT_APP_API_URL}/api/remove`,dt)
            .then((res) => {
                context.reRender();
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.date}>
                    {context.Dateth}
                </div>
                <div className={styles.sortButton}>
                    <span>SẮP XẾP</span>
                    <button onClick={() => handleClick('giam')}>GIẢM</button>
                    <button onClick={() => handleClick('tang')}>TĂNG</button>
                    <button onClick={() => handleClick('tg')}>TG</button>
                </div>
            </div>
            <div className={styles.historyDisplay}>
                <table>
                    <tr>
                        <th>Ngày</th>
                        <th>Tiền</th>
                        <th className={styles.note}>Ghi chú</th>
                        <th></th>
                    </tr>
                    {
                        list.map(function(value,index) {
                            return (
                                <tr key={index}>
                                    <td>{value.DATE}</td>
                                    <td>{value.MONEY}k</td>
                                    <td className={styles.note}>{value.NOTE}</td>
                                    <td>
                                        <button 
                                        onClick={() => handleRemove(value)}>
                                        X
                                        </button>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>

    )
}

export default ShowHistory;