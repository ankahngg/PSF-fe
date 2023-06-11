import styles from './RightBar.module.scss';
import { useState } from 'react';
import { useStore, actions } from '../../store';
import Loader from '../Loader';
import axios from 'axios';

function RightBar() {
    const [gbs,dispatch] = useStore();
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
        dispatch(actions.setLoader(true));

        function daysInMonth (month, year) {
            return new Date(year, month, 0).getDate();
        }

        const data = {
            year : gbs.CrYear,
            month : gbs.CrMonth,
            range : gbs.CrRange,
            id : gbs.UserId,
            date: gbs.CrDateth,
            kind : (MoneyInput[0] == '-' ? 'OUT' : 'IN'),
            MoneyInput : +MoneyInput.substr(1,MoneyInput.length-1),
            NoteInput
        }
        axios.post(`${process.env.REACT_APP_API_URL}/crud/add`,data)
            .then(res => {
                dispatch(actions.setLoader(false));
                SetError(2);
                SetMoneyInput('');
                SetNoteInput('');
                dispatch(actions.setRender());
                const val = gbs.YearData[`year${gbs.CrYear}`][`month${gbs.CrMonth}`];
                if(data.kind == '-') val.out += data.MoneyInput;
                else val.in += data.MoneyInput;
                dispatch(actions.setYearData({year:gbs.CrYear,month:gbs.CrMonth,in:val.in,out:val.out}));
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
            
            {(gbs.Loader) ? <Loader /> : <div></div>}
        </div>
    )
}

export default RightBar;