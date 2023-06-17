import Row1 from '../../components/Row1';
import LeftBar from '../../components/LeftBar';
import ShowHistory from '../../components/ShowHistory';
import RightBar from '../../components/RightBar';
import React from 'react';
import styles from './Table.module.scss'
import {stateSlice} from '../../redux/state/stateSlice';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../../components/Loader';

function Table() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);

    function handleClick() {
      dispatch(stateSlice.actions.setCrYear(state.Year));
      dispatch(stateSlice.actions.setCrMonth(state.Month));
      dispatch(stateSlice.actions.setCrRange('month'));
      dispatch(stateSlice.actions.setCrKind('out'));
      dispatch(stateSlice.actions.setCrDateth(state.Dateth));
    }


    return (
      <div className={styles.container}>
       
        <div className={styles.row0}>
                <div className={styles.yearDisplay}>
                {state.CrYear}
                </div>
                {(
                  state.Year != state.CrYear || state.Month != state.CrMonth ? 
                  <button onClick={() => handleClick()}>Quay trở về hiện tại</button>
                  :
                  <div></div>
                )}
        </div>
        <table className={styles.tableContainer}>
          {state.Loader && <Loader />}
          <tr><Row1 /></tr>
          <tr>
            <td><LeftBar /></td>
            <td colSpan={5} className={styles.TopAlign}><ShowHistory /></td>
            <td className={styles.TopAlign}><RightBar /></td>
          </tr> 
        </table>
      </div>
    )
    
  }
  
  export default Table;