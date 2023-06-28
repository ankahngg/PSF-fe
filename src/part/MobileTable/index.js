import Row1 from '../../components/Row1';
import LeftBar from '../../components/LeftBar';
import ShowHistory from '../../components/ShowHistory';
import RightBar from '../../components/RightBar';
import React from 'react';
import styles from './MobileTable.module.scss'
import {stateSlice} from '../../redux/state/stateSlice';
import {useSelector,useDispatch} from 'react-redux';


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
        <div className={styles.row1}>
          <LeftBar />
          <RightBar />
        </div>
        <div>
          <Row1 />
          <ShowHistory />
        </div>
        
    </div>
    )
  }
  
  export default MobileTable;