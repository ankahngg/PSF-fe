import styles from './RightBar.module.scss';
import { useState } from 'react';
import Loader from '../Loader';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import {dataSlice} from '../../redux/data/dataSlice';

function RightBar() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);
    const noteId = useSelector((state) => {
        const year = `year${state.state.CrYear}`;
        const month = `month${state.state.CrMonth}`;
        const l = state.data[year][month].list.length;
        if(l == 0) return 1;
        return state.data[year][month].list[l-1].id+1;
    })

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
        dispatch(stateSlice.actions.setLoader(true));

        function daysInMonth (month, year) {
            return new Date(year, month, 0).getDate();
        }

        const data = {
            year : state.CrYear,
            month : state.CrMonth,
            range : state.CrRange,
            id : state.UserId,
            date: state.CrDateth,
            kind : (MoneyInput[0] == '-' ? 'OUT' : 'IN'),
            MoneyInput : +MoneyInput.substr(1,MoneyInput.length-1),
            NoteInput,
            noteId,
        }
        axios.post(`${process.env.REACT_APP_API_URL}/crud/add`,data)
            .then(res => {
                dispatch(stateSlice.actions.setLoader(false));
                SetError(2);
                SetMoneyInput('');
                SetNoteInput('');
                dispatch(dataSlice.actions.addNote({
                    id : noteId,
                    date : data.date,
                    money : data.MoneyInput,
                    kind : data.kind.toLowerCase(),
                    note : data.NoteInput
                }));
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
        // validator
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
        (state.CrYear == state.Year ?
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
        :
        <div></div>
        )
    )
}

export default RightBar;