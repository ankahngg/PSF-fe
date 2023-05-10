import styles from './RightBar.module.scss';
import { useState, useEffect, useContext } from 'react';
import { CurrentContext } from '../../provider/CurentContext';
import axios from 'axios';

function RightBar() {
    const context = useContext(CurrentContext);
    const [MoneyInput,SetMoneyInput] = useState('');
    const [NoteInput,SetNoteInput] = useState('');
    const [Error,SetError] = useState(0);

    function Log() {
        if(Error == 1) return <p style={{color:"red"}}>THÔNG TIN NHẬP KHÔNG HỢP LỆ</p>
        else if(Error == 2) return <p style={{color:"green"}}>THÀNH CÔNG</p>
    }

    function handleError() {
        SetError(1);
    }

    function handleValid() {
        SetError(2);
        
        const data = {
            kind : (MoneyInput[0] == '-' ? 'out' : 'in'),
            id : context.Weekth,
            date : context.Dateth,
            MoneyInput : +MoneyInput.substr(1,MoneyInput.length-1),
            NoteInput
        }
        axios.post('http://localhost:4000/api/add',data)
            .then(res => {
                console.log(res);
                context.reRender();
                SetMoneyInput('');
                SetNoteInput('');

            })
            .catch(err => {
                console.log(err);
            })
    }

    function isAllNumber() {
        var str = MoneyInput.substr(1,MoneyInput.length-1);
        return !isNaN(+str);
    }

    function handleClick() {
        if(!MoneyInput.length) {handleError(); return;}
        if(MoneyInput[0] != '-' && MoneyInput[0] != '+') {handleError(); return;}
        if(MoneyInput.length == 1) {handleError(); return;}
        if(MoneyInput[1] == '0') {handleError(); return;}

        if(NoteInput.length > 30) {handleError(); return;}
        if(!isAllNumber()) {handleError(); return;}


        handleValid();
    }

    function handleMoneyChange(e) {
        SetMoneyInput(e.target.value);
        SetError(0);
    }

    function handleNoteChange(e) {
        SetNoteInput(e.target.value);
        SetError(0);
    }

    return (
        <div className={styles.container}>
            <div className={styles.instruction}>
                <div>- : TIÊU</div>
                <div>+ : KIẾM</div>
            </div>
            <div className={styles.input}>
                <div className={styles.moneyInput}>
                    <span>TIỀN</span>
                    <input type="text" 
                        value={MoneyInput}
                        onChange={(e) => handleMoneyChange(e)}></input>k
                </div>
                <div className={styles.noteInput}>
                    <span>GHI CHÚ</span>
                    <textarea type="text" 
                        value={NoteInput}
                        onChange={(e) => handleNoteChange(e)}></textarea>
                </div>
            </div>

            <div className={styles.submit}>
                <button onClick={() => handleClick()}>GHI NHẬN</button>
                <Log />    
            </div>
        </div>
    )
}

export default RightBar;