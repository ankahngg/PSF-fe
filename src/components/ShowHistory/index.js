import React, { useEffect, useState } from 'react';
import styles from './ShowHistory.module.scss';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import {dataSlice} from '../../redux/data/dataSlice';
import { listSelector } from '../../redux/selector';


function ShowHistory() {
    const dispatch = useDispatch();
    const dt = useSelector(listSelector);
    const [list,setList] = useState();
    const state = useSelector((state) => state.state);

    useEffect(() =>{
        setList(dt);
    },[dt])
   
   
    function handleClick(i) {
        let tmp;
        if (i === 'giam') {
          tmp = [...list].sort((a, b) => b.money - a.money);
        } else if (i === 'tang') {
          tmp = [...list].sort((a, b) => a.money - b.money);
        } else {
          tmp = [...list].sort((a, b) => a.id - b.id);
        }
        setList(tmp);
    }
   
      
    function handleRemove(dt) {
        const data = {
            year : state.CrYear,
            month : state.CrMonth,
            week : state.CrWeek,
            range : state.CrRange,
            date : dt.date,
            id : state.UserId,
            ID : dt.id,
            kind : dt.kind,
        }
       
        
        dispatch(stateSlice.actions.setLoader(true));
        axios.post(`${process.env.REACT_APP_API_URL}/crud/remove`,data)
            .then((res) => {
                dispatch(dataSlice.actions.removeNote(dt))
                dispatch(stateSlice.actions.setLoader(false));
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                
                <div className={styles.sortButton}>
                    <span>SẮP XẾP</span>
                    <button onClick={() => handleClick('giam')}>GIẢM</button>
                    <button onClick={() => handleClick('tang')}>TĂNG</button>
                    <button onClick={() => handleClick('tg')}>TG</button>
                </div>
            </div>
            <div className={styles.history}></div>
                <div className={styles.gridContainer}>
                   
                    <div className={styles.fwb+" "+styles.gridItems}>Ngày</div>
                    <div className={styles.fwb+" "+styles.gridItems}>Tiền</div>
                    <div className={styles.fwb+" "+styles.gridItems}>Ghi chú</div>
                    <div></div>
                
                    {
                        list &&
                        list.map(function(value,index) {
                            return (
                                <>
                                    <div className={styles.gridItems}>{value.date}</div>
                                    <div className={styles.gridItems+" "+(value.kind == 'out'?styles.moneyOut:styles.moneyIn)}>
                                    {value.money}k</div>
                                    <div className={styles.gridItems}>{value.note}</div>
                                    <div>
                                        <button 
                                        onClick={() => handleRemove(value)}>
                                        X
                                        </button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
       

    )
}

export default ShowHistory;