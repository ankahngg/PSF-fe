import styles from './Loader.module.scss';

function Loader() {

    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
            <div className={styles.log}>Chờ tí</div>
        </div>
    )
}

export default Loader;