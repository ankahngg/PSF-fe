import styles from './Login.module.scss';
import React, { useState, useEffect } from 'react';
import picture_login from '../../file/Picture_login.png';
import password_login from '../../file/password_login.png';
import user_login from '../../file/user_login.png';
import {useNavigate}  from 'react-router-dom';
import { actions, useStore } from '../../store';
import axios from 'axios';


function Login() {
    const [gbs,patch] = useStore();
    const navigate = useNavigate();
    const [Email,SetEmail] = useState();
    const [Password,SetPassword] = useState();
    const [ErrorLog,SetErrorLog] = useState('');

    
    useEffect(() => {
        document.body.style.backgroundColor = "#f2f0e0";
        return () => {
            document.body.style.backgroundColor = "transparent ";
        }
    },[]);

    function Logger() {
        if(ErrorLog != '') return <div className={styles.wrong}>{ErrorLog}</div>
    }

    async function validPassword() {
        const dt = {Email,Password};
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/checkaccount`,dt)
        return res.data;
    }

    function validEmail() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) return true;
        else return false;
    }

    async function handleLogin() {
        
        if(!validEmail()) {SetErrorLog('Email không hợp lệ'); return;}
        
        let res = await validPassword();
        if(res != 'correct') {SetErrorLog(res); return;}
        
        localStorage.setItem("email",Email);
        patch(actions.setToken(true));
        navigate('/HOME');
    }

    return (
        
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={picture_login}/>
                <div className={styles.picture_title}>
                    <div>WELCOME</div>
                    <div>TO</div>
                    <div>MY WEBSITE</div>
                </div>
            </div>
            <div className={styles.right}>
                <p>Đăng nhập</p>
                <div className={styles.input}>
                    <div className={styles.username}>
                        <img src={user_login} />
                        <input type="text" 
                        placeholder='Email ...'
                        onChange={(e)=>SetEmail(e.target.value)}/>
                      
                    </div>
                    <div className={styles.password}>
                        <img src={password_login} />
                        <input type="password" 
                        placeholder='Mật khẩu ...'
                        onChange={(e)=>SetPassword(e.target.value)}/>
                    </div>
                    <div className={styles.option}>
                        <div>
                            <input type="checkbox" />
                            <label>Ghi nhớ</label>
                        </div>
                        <span>Quên mật khẩu</span>
                    </div>
                </div>
                <div className={styles.button}>
                    <button onClick={() => handleLogin()}>ĐĂNG NHẬP</button>
                    <div>
                        <span>ĐĂNG KÍ</span>
                    </div>
                </div>
                
                <Logger />
                
            </div>

        </div>
        
    );
}

export default Login;