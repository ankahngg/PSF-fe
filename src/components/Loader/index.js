import styles from './Loader.module.scss';

function Loader() {

    return (
        <div className={styles.loaderContainer}>
           
            <div className={styles.loader}></div>

        </div>
    )
}

export default Loader;