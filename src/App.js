import styles from './App.module.scss';
import Table from './part/Table'
import Layout from './part/Layout'
import Statistic from './part/Statistic'
import Login from './part/Login'
import { Route,Routes,Navigate } from 'react-router-dom';
import { useStore } from './store';

function App() {
  const [gbs,patch] = useStore();

  return (
      <Routes>
        <Route path="LOGIN" element={!gbs.Token ? <Login /> : <Navigate to="/HOME" /> }/>
        <Route path="/" element={gbs.Token ? <Layout /> : <Navigate to="/LOGIN" />}>
          <Route path="*" element={<Table />} />
          <Route index element={<Table />} />
          <Route path="HOME" element={<Table />} />
          <Route path="STATISTIC" element={<Statistic />} />
        </Route>  
      </Routes>
  )
}

export default App;
