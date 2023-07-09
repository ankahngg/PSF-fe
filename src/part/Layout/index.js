import Header from '../../components/Header'
import Navigate from '../../components/Navigate';
import styles from './Layout.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);
    const year = useSelector((state) => state.state.Year);
    const id = useSelector((state) => state.state.UserId);
    
    async function fetchData() {
        dispatch(stateSlice.actions.setLoader(true));
        let len=1;
        for(let i=year; i >= year-len+1;i--) 
            for(let j=1;j<=12;j++) {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/?year=${i}&month=${j}&id=${id}`);
                if(res.data == 'hack cc') {localStorage.clear();return}
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
            dispatch(stateSlice.actions.setLoader(false));
        navigate('/HOME')
    }

    function handleWindowResize() {
        dispatch(stateSlice.actions.setWindowSize(window.innerWidth))
    }
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        fetchData();

        
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);  

    if(state.WindowSize <= 1200)
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