import Header from '../../components/Header'
import Navigate from '../../components/Navigate';
import styles from './Layout.module.scss';

function Layout() {
    return (
        <div className={styles.layout}>
            <Header />
            <Navigate />
        </div>
    );
}

export default Layout;