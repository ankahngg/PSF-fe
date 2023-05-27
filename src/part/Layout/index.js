import Header from '../../components/Header'
import Navigate from '../../components/Navigate';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';

function Layout() {

    return (
        <>
            <div className={styles.layout}>
                <Header />
                <Navigate />
            </div>
            <div className={styles.main}>
                <Outlet />
            </div>
        </>
    );
}

export default Layout;