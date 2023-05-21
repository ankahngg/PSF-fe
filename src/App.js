import styles from './App.module.scss';
import Table from './part/Table'
import Layout from './part/Layout'
import React from 'react';


function App() {
  return (
    <div className={styles.wrapper}>
      <Layout />
      <div className={styles.main}>
        <Table /> 
      </div>

    </div>
  )
}

export default App;
