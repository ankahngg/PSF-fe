import {useSelector,useDispatch} from 'react-redux';
import { dataSlice } from '../../redux/data/dataSlice';
import { stateSlice } from '../../redux/state/stateSlice';

function Lab() {
    const dispatch = useDispatch();
    
    const data = useSelector((st) => st.data);
   console.log(data);
    
    function handleAdd() {
        dispatch(dataSlice.actions.addNote({
            date : '27-7-2023',
            money : '277',
            kind : 'in',
            note : 'buy book'
        }))
    }
    function handleRemove() {
        dispatch(dataSlice.actions.removeNote({
            id : 2,
            date : '27-7-2023',
            money : '277',
            kind : 'in',
            note : 'buy book'
        }))
    }
    
    return (
        <>
            <h1>lab</h1>
            <button onClick={() => handleAdd()}>add</button>\
            <button onClick={() => handleRemove()}>remove</button>
        </>
    );
}

export default Lab;