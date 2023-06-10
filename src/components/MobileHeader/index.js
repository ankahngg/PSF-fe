import styles from './MobileHeader.module.scss';
import home_logo from '../../file/home_logo.png';
import statistic_logo from '../../file/statistic_logo.png';
import account_img from '../../file/account.png';
import logout_img from '../../file/logout_img.png';
import {useNavigate,Link}  from 'react-router-dom';
import { actions, useStore } from '../../store';

import React, { useState } from 'react';

function getPage() {
    if(window.location.pathname == "/STATISTIC") return 2;
    else return 1;
}

function MobileHeader() {
    const [State,SetState] = useState(getPage());
    const [Hover,SetHover] = useState(0);
    const [gbs,patch] = useStore();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        patch(actions.setUserId(''));
        navigate('/LOGIN');
    }

    function handleClick(i) {
        SetState(i);
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Link to="/HOME" className={styles.HOME}>
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
                <Link to="/STATISTIC" className={styles.STATISTIC}>

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
            <div className={styles.right}>
                <div className={styles.col1}>
                    <div className={styles.date}>{gbs.Dateth}</div>
                    <div className={styles.name}>{localStorage.getItem('name')} !</div>
                </div>
                <div className={styles.col2}>
                    <img src={account_img}/>
                    <img src={logout_img} onClick={() => handleLogout()}/>
                </div>
            </div>
        </div>
    );
}

export default MobileHeader;