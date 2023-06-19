import styles from './Header.module.scss'
import account_img from '../../file/account.png';
import logout_img from '../../file/logout_img.png';
import {useNavigate}  from 'react-router-dom';
import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import { dataSlice } from '../../redux/data/dataSlice';

function Header() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);
    

    const navigate = useNavigate();
    function handleLogout() {
        dispatch(stateSlice.actions.setUserId(''));
        localStorage.clear();
        dispatch(dataSlice.actions.clearNote());
        navigate('/LOGIN');
    }

    return (
        <div>
            <div className={styles.left}>LOGO ..</div>
            <div className={styles.right}>
                <div className={styles.date}>{state.Dateth} |</div>
                XIN CHÀO {localStorage.getItem('name')} !
                <img src={account_img}/>
                <img src={logout_img} onClick={() => handleLogout()}/>
            </div>
        </div>
    );
}

export default Header;