import styles from './Header.module.scss'
import account_img from '../../file/account.png';
import React from 'react';


function Header() {
    return (
        <React.Fragment>
            <div className={styles.left}>LOGO ..</div>
            <div className={styles.right}>
                XIN CHÀO USER !
                <img src={account_img}/>
            </div>
        </React.Fragment>
    );
}

export default Header;