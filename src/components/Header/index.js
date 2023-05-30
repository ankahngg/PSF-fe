import styles from './Header.module.scss'
import account_img from '../../file/account.png';
import logout_img from '../../file/logout_img.png';
import {useNavigate}  from 'react-router-dom';
import React from 'react';
import { actions, useStore } from '../../store';


function Header() {
    const [gbs,patch] = useStore();
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.clear();
        patch(actions.setToken(false));
        navigate('/LOGIN');
    }

    return (
        <React.Fragment>
            <div className={styles.left}>LOGO ..</div>
            <div className={styles.right}>
                XIN CHÀO USER !
                <img src={account_img}/>
                <img src={logout_img} onClick={() => handleLogout()}/>
            </div>
        </React.Fragment>
    );
}

export default Header;