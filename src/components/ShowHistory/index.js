import React, { useEffect, useState } from 'react';
import styles from './ShowHistory.module.scss';
import axios from 'axios';
import { useStore, actions } from '../../store';



function ShowHistory() {

    const [gbs,dispatch] = useStore();
    const [list,setList] = useState([]);
   
    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API_URL}/api/${gbs.currentState}`)
            .then((res) => {
                setList(res.data);
            })
            .catch(() => {
                setList([]);
            })
    },[gbs])

    function handleClick(i) {
        let tmp;
        if (i === 'giam') {
          tmp = [...list].sort((a, b) => b.MONEY - a.MONEY);
        } else if (i === 'tang') {
          tmp = [...list].sort((a, b) => a.MONEY - b.MONEY);
        } else {
          tmp = [...list].sort((a, b) => a.ID - b.ID);
        }
        setList(tmp);
    }
      

    function handleRemove(dt) {
        dispatch(actions.setLoader(true));
        axios.post(`${process.env.REACT_APP_API_URL}/crud/remove`,dt)
            .then((res) => {
                dispatch(actions.setLoader(false));
                dispatch(actions.setRender());
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.date}>
                    {gbs.Dateth}
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