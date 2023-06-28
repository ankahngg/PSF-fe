
export function moneyOutSelector(state) {
    const year = `year${state.state.CrYear}`;
    const month = `month${state.state.CrMonth}`;

    return state.data[year][month].out;

}

export function moneyInSelector(state) {
    const year = `year${state.state.CrYear}`;
    const month = `month${state.state.CrMonth}`;

    return state.data[year][month].in;
}

export function listSelector(state) {
    const year = `year${state.state.CrYear}`;
    const month = `month${state.state.CrMonth}`;
    const kind = state.state.CrKind;
    const range = state.state.CrRange;
    const week = state.state.CrWeek;

    let list;

    if(range == 'month')
        list = state.data[year][month].list.filter((val) =>{
            return val.kind == kind;
        })
    else 
        list = state.data[year][month].list.filter((val) =>{
            const arr = val.date.split('-');
            const day = arr[0];
            return (val.kind == kind && Math.ceil(1.0*day/7) == week);
        })
        
    
    return list;
}

export function monthSelectorOut(state) {
    const year = `year${state.state.CrYear}`;
    const month = `month${state.state.CrMonth}`;

}

export function weekSelectorOut(state,id) {
    const year = `year${state.state.CrYear}`;
    const month = `month${state.state.CrMonth}`;
    const list = state.data[year][month].list.filter((val) => {
        const arr = val.date.split('-');
        const day = arr[0];
        return (val.kind == 'out' && Math.ceil(1.0*day/7) == id)
    });
   
    const sum = list.reduce((total,val) => {
        return total + (+val.money);
    },0)

    return sum;
}

export function chartDataSelector(state) {
        
    if(state.chart.CrMonth != 13) {
        const year = `year${state.chart.CrYear}`;
        const month = `month${state.chart.CrMonth}`;
        const data = state.data[year][month];
        const week_in = [0,0,0,0,0,0];
        const week_out = [0,0,0,0,0,0];
        const month_in = data.in;
        const month_out = data.out;

        
        for(var val of data.list) {
            const arr = val.date.split('-');
            const day = arr[0];
            const k = Math.ceil(1.0*day/7);
            
            if(val.kind == 'out') week_out[k] += val.money;
            else week_in[k] += val.money;
        } 

        const week = [
            {
                in : 0,
                out : 0
            },
            {
                in : week_in[1],
                out : week_out[1]
            },
            {
                in : week_in[2],
                out : week_out[2]
            },
            {
                in : week_in[3],
                out : week_out[3]
            },
            {
                in : week_in[4],
                out : week_out[4]
            },
            {
                in : week_in[5],
                out : week_out[5]
            },
        ]
       

        return {
            week,
            month_in,
            month_out
        }
    }
    else {

    }
 }

export function chartDataYearSelector(state) {
    const data = state.data;
    const year = `year${state.chart.CrYear}`;
    const months_data = [];
    for(let i=1;i<=12;i++) {
        let month = `month${i}`;
        months_data.push({
            in : data[year][month].in,
            out : data[year][month].out,
        })
    }

    return months_data;

}