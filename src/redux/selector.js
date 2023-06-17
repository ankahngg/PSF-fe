
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