import styles from './App.module.scss';
import Home from './part/Home'
import Layout from './part/Layout'
import Statistic from './part/Statistic'
import Login from './part/Login'
import { Route,Routes,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {
  const id = useSelector((state) => state.state.UserId);
  return (
        
        <Routes>
          <Route path="LOGIN" element={id == '' ? <Login /> : <Navigate to="/" /> }/>
          <Route path="/" element={id != '' ? <Layout /> : <Navigate to="/LOGIN" />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="HOME" element={<Home />} />
            <Route path="STATISTIC" element={<Statistic />} />
          </Route>  
        </Routes>
    
      
  )
}

export default App;
