import styles from './Login.module.scss';
import React, { useState, useEffect } from 'react';
import picture_login from '../../file/Picture_login.png';
import password_login from '../../file/password_login.png';
import user_login from '../../file/user_login.png';


function Login() {
    
    useEffect(() => {
        document.body.style.backgroundColor = "#f2f0e0";
        return () => {
            document.body.style.backgroundColor = "transparent ";
        }
    },[])

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
                        <input type="text" />
                      
                    </div>
                    <div className={styles.password}>
                        <img src={password_login} />
                        <input type="password" />
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
                    <button>ĐĂNG NHẬP</button>
                    <div>
                        <span>ĐĂNG KÍ</span>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Login;