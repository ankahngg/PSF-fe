import styles from './App.module.scss';
import Home from './part/Home'
import Layout from './part/Layout'
import Statistic from './part/Statistic'
import Login from './part/Login'
import { Route,Routes,Navigate } from 'react-router-dom';
import { useStore } from './store';

function App() {
  const [gbs,patch] = useStore();
  return (
      <Routes>
        <Route path="LOGIN" element={gbs.UserId == '' ? <Login /> : <Navigate to="/HOME" /> }/>
        <Route path="/" element={gbs.UserId != '' ? <Layout /> : <Navigate to="/LOGIN" />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="HOME" element={<Home />} />
          <Route path="STATISTIC" element={<Statistic />} />
        </Route>  
      </Routes>
      
  )
}

export default App;
