import styles from './Statistic.module.scss'
import {useSelector,useDispatch} from 'react-redux';
import BarChart from '../../components/BarChart';
import BarChartYear from '../../components/BarChartYear';
import { chartSlice } from '../../redux/chart/chartSlice';
import BicycleLoader from '../../components/BicyleLoader';
import { stateSlice } from '../../redux/state/stateSlice';
import { useEffect } from 'react';
import on_img from '../../file/online.png'

function Statistic() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.chart);
    const Loader = useSelector((state) => state.state.Loader);
    let year = [];
    let list = [];
    const len = 1; 

    for(let i=1;i<=12;i++) list.push(`THÁNG ${i}`);
    for(let i=1;i<=len;i++) year.push(state.Year-i+1);
    useEffect(() => {
        dispatch(chartSlice.actions.setCrMonth(state.Month));
        dispatch(chartSlice.actions.setCrYear(state.Year));
        dispatch(stateSlice.actions.setCrTab('#/STATISTIC'))

    },[])

    return (
        (Loader
        ?
        <BicycleLoader /> 
        : 
        <>
            <div className={styles.year_picker}>
                <select 
                    value={state.CrYear}
                    onChange={(e) => {
                        
                        dispatch(chartSlice.actions.setCrYear(e.target.value));
                        if(e.target.value != state.Year) dispatch(chartSlice.actions.setCrMonth(13));
                        else dispatch(chartSlice.actions.setCrMonth(state.Month));
                    }
                }>
                    {
                        year.map((value,index) => {
                            return <option key={index} value={value}>{value}</option>
                        })
                    }
                </select>
            </div>
            
            <div className={styles.year_chossen}>
                <div className={styles.year_state}>{state.CrYear}</div>
                <div className={styles.row1}>
                    <div className={styles.row1_left+" "+(state.CrMonth==13?styles.on_focus:'')}
                    onClick={() => dispatch(chartSlice.actions.setCrMonth(13))}
                    >CẢ NĂM</div>
                        {
                            list.map((value,index) => {
                                return (
                                <div  className={styles.row1_right+" "+(state.CrMonth==index+1?styles.on_focus:'')} key={index}
                                    onClick={() => dispatch(chartSlice.actions.setCrMonth(index+1))}>
                                    <div>{value}</div>
                                    {(index+1 == state.Month && state.CrYear == state.Year ? <img className={styles.on_img} src={on_img} />:<></>)}
                                </div>
                                )
                            })
                        }
                </div>
            </div>

             <div className={styles.chart_display}>
             {
                (state.CrMonth!=13?<BarChart />:<BarChartYear />)
             }
            </div>
        </>
        )
    );
}

export default Statistic;