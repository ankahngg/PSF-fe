import Header from '../../components/Header'
import Navigate from '../../components/Navigate';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import MobileHeader from '../../components/MobileHeader';
import { useState,useEffect } from 'react';
import { actions, useStore } from '../../store';

function Layout() {
    const [gbs,dispatch] = useStore();
    useEffect(() => {
        function handleWindowResize() {
            dispatch(actions.setWindowSize(window.innerWidth))
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

    if(gbs.WindowSize <= 800)
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