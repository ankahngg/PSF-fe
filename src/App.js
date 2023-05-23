import styles from './App.module.scss';
import Table from './part/Table'
import Layout from './part/Layout'
import Statistic from './part/Statistic'
import Login from './part/Login'
import React from 'react';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    true ? <Login /> :
    <div className={styles.wrapper}>
      <Layout />
      
      <div className={styles.main}>
        <Routes>
          <Route path="HOME" element={<Table />} />
          <Route path="*" element={<Table />} />
          <Route path="STATISTIC" element={<Statistic />} />
        </Routes>
      </div>

    </div>
  )
}

export default App;
