import styles from './App.module.scss';
import Home from './part/Home'
import Layout from './part/Layout'
import Statistic from './part/Statistic'
import Login from './part/Login'
import { Route,Routes,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {
  const state = useSelector((state) => state.state);
  return (
   
      <Routes>
        <Route path="LOGIN" element={state.UserId == '' ? <Login /> : <Navigate to="/HOME" /> }/>
        <Route path="/" element={state.UserId != '' ? <Layout /> : <Navigate to="/LOGIN" />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="HOME" element={<Home />} />
          <Route path="STATISTIC" element={<Statistic />} />
        </Route>  
      </Routes>
      
  )
}

export default App;
