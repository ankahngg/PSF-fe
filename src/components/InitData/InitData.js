import { useEffect } from "react";
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {stateSlice} from '../../redux/state/stateSlice';
import {dataSlice} from '../../redux/data/dataSlice';

function InitData() {
    const dispatch = useDispatch();
    const year = useSelector((state) => state.state.Year);
    const id = useSelector((state) => state.state.UserId);

    useEffect(() => {
        function handleWindowResize() {
            dispatch(stateSlice.actions.setWindowSize(window.innerWidth))
        }
        window.addEventListener('resize', handleWindowResize);

        async function fetchData() {
            dispatch(stateSlice.actions.setLoader(true));
            let len=1;
            for(let i=year; i >= year-len+1;i--) 
                for(let j=1;j<=12;j++) {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/?year=${i}&month=${j}&id=${id}`);
                    if(res.data != 'khong co du lieu') {
                        
                        for(let val of res.data) {
                            dispatch(dataSlice.actions.addNote(
                                {
                                    id : val.ID,
                                    date : val.DATE,
                                    money : val.MONEY,
                                    kind : val.KIND.toLowerCase(),
                                    note : val.NOTE
                                }
                            ))
                        }
                    }
                }  
            //await sleep(2000);
            dispatch(stateSlice.actions.setLoader(false));
        }
        fetchData();
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
   
}

export default InitData;