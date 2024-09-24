import styles from "./BackgroundDropdown.module.css";
import {ReactNode}from "react";


const BackgroundDropdown = (props) =>{
    return(
        <div className={styles.backgroundDropdown}>
            {props.children}
        </div>
    )
}

export default BackgroundDropdown;