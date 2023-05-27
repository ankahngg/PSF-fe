import styles from './Navigate.module.scss';
import home_logo from '../../file/home_logo.png';
import statistic_logo from '../../file/statistic_logo.png';
import { Link } from "react-router-dom";

import React, { useState } from 'react';

function getPage() {
    if(window.location.pathname == "/STATISTIC") return 2;
    else return 1;
}

function Navigate() {
    const [State,SetState] = useState(getPage());
    const [Hover,SetHover] = useState(0);

    function handleClick(i) {
        SetState(i);
    }

    return (
        <div className={styles.container}>
            <Link to="/HOME">
                <div className={styles.home} 
                    onClick={() => handleClick(1)}
                    onMouseEnter={() => SetHover(1)}
                    onMouseLeave={() => SetHover(0)}
                >
                    <div className={styles.logo + " " + (State==1 || Hover==1 ? styles.onFocus : styles.lol)}>
                        <img src={home_logo} />
                    </div>
                    <div>HOME</div>
                </div>
            </Link>
            <Link to="/STATISTIC">

                <div className={styles.statistic} 
                    onClick={() => handleClick(2)}
                    onMouseEnter={() => SetHover(2)}
                    onMouseLeave={() => SetHover(0)}
                >
                    <div className={styles.logo + " "+ (State==2 || Hover==2 ? styles.onFocus : styles.lol)}>
                        <img src={statistic_logo} />
                    </div>
                    <div>STATISTIC</div>

                </div>
            </Link>
        </div>
      );
}

export default Navigate;