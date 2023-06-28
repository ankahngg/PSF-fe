import Table from '../Table';
import MobileTable from '../MobileTable';
import YearChoosen from '../YearChoosen';
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import BicycleLoader from '../../components/BicyleLoader';

import styles from './Home.module.scss'

function Home() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.state);

    return (
        <>

            {state.Loader && <BicycleLoader /> }
            
            <div className={styles.container}>
                <div className={styles.transButton}>
                    <button className={styles.transYear+" "+(state.CrState=='year'?styles.onFocus:styles.unFocus)} 
                    onClick={()=>dispatch(stateSlice.actions.setCrState('year'))}>NĂM</button>
                    <button className={styles.transMonth+" "+(state.CrState=='month'?styles.onFocus:styles.unFocus)} 
                    onClick={()=>dispatch(stateSlice.actions.setCrState('month'))}>THÁNG</button>
                </div>  
                {
                    
                    (
                    state.CrState == 'month' ?
                    (state.WindowSize <= 700?<MobileTable />:<Table />)
                    : 
                    <YearChoosen />
                    )
                }
                
            </div>
        </>
    );
}

export default Home;