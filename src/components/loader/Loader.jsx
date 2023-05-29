import styles from "./loader.module.css";


export default function Loader() {
    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                <div className={styles.ldsRoller}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}