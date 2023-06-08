import Row1 from '../../components/Row1';
import LeftBar from '../../components/LeftBar';
import ShowHistory from '../../components/ShowHistory';
import RightBar from '../../components/RightBar';
import React from 'react';
import styles from './Table.module.scss'
import { useStore, actions} from '../../store';

function Table() {
    const [gbs,dispatch] = useStore();

    function handleClick() {
      dispatch(actions.setCrYear(gbs.Year));
      dispatch(actions.setCrMonth(gbs.Month));
      dispatch(actions.setCrRange('month'));
      dispatch(actions.setCrKind('out'));
      dispatch(actions.setCrDateth(gbs.Dateth));
    }

    return (
      <div className={styles.container}>
        <div className={styles.row0}>
                <div className={styles.yearDisplay}>
                {gbs.CrYear}
                </div>
                {(
                  gbs.Year != gbs.CrYear || gbs.Month != gbs.CrMonth ? 
                  <button onClick={() => handleClick()}>Quay trở về hiện tại</button>
                  :
                  <div></div>
                )}
        </div>
        <table>
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