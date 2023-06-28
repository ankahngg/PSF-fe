import Row1 from '../../components/Row1';
import LeftBar from '../../components/LeftBar';
import ShowHistory from '../../components/ShowHistory';
import RightBar from '../../components/RightBar';
import React from 'react';
import styles from './Table.module.scss'
import {stateSlice} from '../../redux/state/stateSlice';
import {useSelector,useDispatch} from 'react-redux';

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
        <div className={styles.gridContainer}>
          <div className={styles.Month+" "+styles.gridItems}>THÁNG {state.CrMonth}</div>
          <div className={styles.Nhap+" "+styles.gridItems}>NHẬP LIỆU</div>
          <div className={styles.Row1+" "+styles.gridItems}><Row1 /></div>
          <div className={styles.LeftBar+" "+styles.gridItemsz}><LeftBar /></div>
          <div className={styles.ShowHistory+" "+styles.gridItems}><ShowHistory /></div>
          <div className={styles.RightBar+" "+styles.gridItems}><RightBar /></div>
        </div>
      </div>
    )
    
  }
  
  export default Table;