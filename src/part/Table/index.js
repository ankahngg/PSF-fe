import Row1 from '../../components/Row1';
import LeftBar from '../../components/LeftBar';
import ShowHistory from '../../components/ShowHistory';
import RightBar from '../../components/RightBar';
import React from 'react';
import styles from './Table.module.scss'

function Table() {
    return (
      <div className={styles.container}>
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