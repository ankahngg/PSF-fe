import Row1 from '../../components/Row1';
import LeftBar from '../../components/LeftBar';
import ShowHistory from '../../components/ShowHistory';
import RightBar from '../../components/RightBar';
import React from 'react';
import styles from './MobileTable.module.scss'
import {stateSlice} from '../../redux/state/stateSlice';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../../components/Loader';
function MobileTable() {
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
                {state.CrMonth}-{state.CrYear}
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
            <tr>
                <td className={styles.LeftBar}><LeftBar /></td>
                <td className={styles.Row1}><Row1 /></td>
                <td><RightBar /></td>
            </tr>
            <tr>
                <td colSpan={3}> <ShowHistory /></td>
            </tr>
        </table>

        {/* <table>
          <tr><Row1 /></tr>
          <tr>
            <td><LeftBar /></td>
            <td colSpan={5} className={styles.TopAlign}><ShowHistory /></td>
            <td className={styles.TopAlign}><RightBar /></td>
          </tr> 
        </table> */}
    </div>
    )
  }
  
  export default MobileTable;