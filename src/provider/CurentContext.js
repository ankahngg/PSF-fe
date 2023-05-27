import { createContext, useState } from "react";

const dayLeft = function() {
    const date = new Date();
    const d = new Date(date.getFullYear(), date.getMonth()+1,0);
    return d.getDate() - date.getDate() + 1;
}
const CurrentContext = createContext();
const date = new Date();
const Weekth = Math.ceil(date.getDate() / 7);
const Month = date.getMonth() + 1;
const Dateth = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
const Leftth = dayLeft();

const LogState = 4;
const SetLogState = 12;

function CurentProvider({children}) {
    const [Current, setCurrent] = useState("week"+Weekth+"_out");
    const [Render, setRender] = useState(0);
    const [State,setState] = useState('tg');
    const [Loader,setLoader] = useState(false);
    
    const updateCurrent = (k) => {
        setCurrent(k);
    }
    const reRender = () => {
        setRender(!Render);
    }


    const value = {
        Loader,
        setLoader,
        State,
        Render,
        Weekth,
        Month,
        Dateth,
        Leftth,
        Current,
        updateCurrent,
        reRender,
        setState,
        LogState,
        SetLogState
    }

    return (
        <CurrentContext.Provider value={value}>
            {children}
        </CurrentContext.Provider>
    )
}

export {CurrentContext, CurentProvider}