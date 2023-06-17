import Header from '../../components/Header'
import Navigate from '../../components/Navigate';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import MobileHeader from '../../components/MobileHeader';
import { useState,useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import {dataSlice} from '../../redux/data/dataSlice';
import axios from 'axios';

function sleep(ms) {
    return new Promise((resolve,reject) => {
        setTimeout(() => resolve(),ms);
    })
}

function Layout() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);
    const data = useSelector((state) => state.data);


    useEffect(() => {
        function handleWindowResize() {
            dispatch(stateSlice.actions.setWindowSize(window.innerWidth))
        }
        window.addEventListener('resize', handleWindowResize);

        async function fetchData() {
            dispatch(stateSlice.actions.setLoader(true));
            let len=5;
            for(let i=state.Year; i >= state.Year-len+1;i--) 
                for(let j=1;j<=12;j++) {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/?year=${i}&month=${j}&id=${state.UserId}`);
                    if(res.data != 'khong co du lieu') {
                        
                        for(let val of res.data) {
                            dispatch(dataSlice.actions.addNote(
                                {
                                    id : val.ID,
                                    date : val.DATE,
                                    money : val.MONEY,
                                    kind : val.KIND.toLowerCase(),
                                    note : val.NOTE
                                }
                            ))
                        }
                    }
                }  
            await sleep(2000);
            dispatch(stateSlice.actions.setLoader(false));
        }
        fetchData();
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    
      
    
     

    if(state.WindowSize <= 800)
    return (
        <>
            <div className={styles.layout}>
                <MobileHeader />
                
            </div>
            <div className={styles.main}>
                <Outlet />
            </div>
        </>
    )
    else 
    return (
        
        <>
            <div className={styles.layout}>
                <Header />
                <Navigate />
            </div>
            <div className={styles.main}>
                <Outlet />
            </div>
        </>
    );
}

export default Layout;