import { useSelector } from "react-redux";
import styles from './BarChartYear.module.scss';
import {Bar} from "react-chartjs-2"
import { chartDataYearSelector } from "../../redux/selector";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


function BarChart() {
    const wsize = useSelector(state => state.state.WindowSize);
    const data = useSelector(chartDataYearSelector);
    
    let month_labels=[];
    for(let i=1;i<=12;i++) month_labels.push(`Tháng ${i}`);

    const data1 = {
        labels : month_labels,
        datasets : [
            {
                label : `Chi`,
                data : data.map((value,index) => value.out),
                backgroundColor : "#ff7377",
               
               
               
            },
            {
                label : `Thu`,
                data : data.map((value,index) => value.in),
                backgroundColor : "#90ee90",
                
                
               
            }
            
    ]
    }

    const option = {
        indexAxis: (wsize<=800?'y':'x'),
        maintainAspectRatio : false,
        scales : {
            x : {
                title : {
                    display : (wsize<=800),
                    text : "Đơn vị nghìn đồng",
                }
            },
            y : {
                title : {
                    display : !(wsize<=800),
                    text : "Đơn vị nghìn đồng",
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

    

    return (
        <div className={styles.container}>
            <Bar data={data1} plugins={[ChartDataLabels]} options={option}/>
        </div>  
    );
}

export default BarChart;