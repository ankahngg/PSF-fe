import Table from '../Table';
import YearChoosen from '../YearChoosen';

import styles from './Home.module.scss'
import { actions, useStore } from '../../store';

function Home() {
    const [gbs,dispatch] = useStore();
    return (
        <div className={styles.container}>
            <div className={styles.transButton}>
                <button className={styles.transYear+" "+(gbs.CrState=='year'?styles.onFocus:styles.unFocus)} 
                onClick={()=>dispatch(actions.setCrState('year'))}>NĂM</button>
                <button className={styles.transMonth+" "+(gbs.CrState=='month'?styles.onFocus:styles.unFocus)} 
                onClick={()=>dispatch(actions.setCrState('month'))}>THÁNG</button>
            </div>  
            {
                (gbs.CrState == 'month' ? <Table /> : <YearChoosen />)
            }
            
        </div>
      );
}

export default Home;