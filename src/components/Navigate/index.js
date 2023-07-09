import styles from './Navigate.module.scss';
import home_logo from '../../file/home_logo.png';
import statistic_logo from '../../file/statistic_logo.png';
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import React, { useState } from 'react';



function Navigate() {
    const Tab = useSelector((state) => state.state.CrTab);
    const [Hover,SetHover] = useState(0);


    return (
        <div className={styles.container}>
            <Link to="/HOME">
                <div className={styles.home} 
                    onMouseEnter={() => SetHover(1)}
                    onMouseLeave={() => SetHover(0)}
                >
                    <div className={styles.logo + " " + (Tab=='#/HOME' || Hover==1 ? styles.onFocus : styles.lol)}>
                        <img src={home_logo} />
                    </div>
                    <div>HOME</div>
                </div>
            </Link>
            <Link to="/STATISTIC">

                <div className={styles.statistic} 
                    onMouseEnter={() => SetHover(2)}
                    onMouseLeave={() => SetHover(0)}
                >
                    <div className={styles.logo + " "+ (Tab=='#/STATISTIC' || Hover==2 ? styles.onFocus : styles.lol)}>
                        <img src={statistic_logo} />
                    </div>
                    <div>STATISTIC</div>

                </div>
            </Link>
        </div>
      );
}

export default Navigate;