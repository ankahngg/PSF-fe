import { useSelector } from "react-redux";
import styles from './BarChart.module.scss';
import {Bar} from "react-chartjs-2"
import { chartDataSelector } from "../../redux/selector";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


function BarChart() {
    const state = useSelector(state => state.chart);
    const data = useSelector(chartDataSelector);
    

    const data1 = {
        labels : ['Tuần 1','Tuần 2','Tuần 3','Tuần 4','Tuần 5'],
        datasets : [
            {
                label : `Chi Tháng ${state.CrMonth}`,
                data : [data.week[1].out,data.week[2].out,data.week[3].out,data.week[4].out,data.week[5].out],
                backgroundColor : "#ff7377",
                barThickness :50,
            },
            
    ]
    }

    const option = {
       
        scales : {
            y : {
                title : {
                    display : true,
                    text : "Đơn vị nghìn đồng",
                }
            },
            x : {
                ticks : {
                    font : {
                        size : 15
                    }
                } 
            }
        },
        plugins : {
            datalabels: {
                font : {
                    size : 15
                }
            }
        }
     
    }

    const data2 = {
        labels : [`Tổng Tháng ${state.CrMonth}`],
        datasets : [
            {
                label : 'THU',
                data : [data.month_in],
                backgroundColor : "#90ee90",
                barThickness: 50,
                
            },
            {
                label : 'CHI',
                data : [data.month_out],
                backgroundColor : "#ff7377",
                barThickness: 50,
                

            },
        ],
    }

    return (
        <div className={styles.container}>
            <div className={styles.chart2}>
                <Bar data={data2} plugins={[ChartDataLabels]} options={option} />
            </div>
            <div className={styles.chart1}>
                <Bar data={data1} plugins={[ChartDataLabels]} options={option}/>
            </div>
        </div>  
    );
}

export default BarChart;