import styles from './Login.module.scss';
import React, { useState, useEffect } from 'react';
import picture_login from '../../file/Picture_login.png';
import password_login from '../../file/password_login.png';
import user_login from '../../file/user_login.png';
import {useNavigate}  from 'react-router-dom';
import { actions, useStore } from '../../store';


function Login() {
    const [gbs,patch] = useStore();
    const navigate = useNavigate();
    const [UserName,SetUserName] = useState();
    const [Password,SetPassword] = useState();

    
    useEffect(() => {
        document.body.style.backgroundColor = "#f2f0e0";
        return () => {
            document.body.style.backgroundColor = "transparent ";
        }
    },[]);

    function handleLogin() {
        if(UserName == 'khang' && Password == '123') {
            localStorage.setItem("username","khang");
            localStorage.setItem("password",'123');
            patch(actions.setToken(true));
            navigate('/HOME');
        }
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
                        <input type="text" onChange={(e)=>SetUserName(e.target.value)}/>
                      
                    </div>
                    <div className={styles.password}>
                        <img src={password_login} />
                        <input type="password" onChange={(e)=>SetPassword(e.target.value)}/>
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
            </div>
        </div>
        
    );
}

export default Login;