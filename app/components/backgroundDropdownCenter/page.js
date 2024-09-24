import style from "./BackgroundDropdownCenter.module.css";


const BackgroundDropdownCenter = (props) =>{
    return(
        <div className={style.backgroundDropdown}>
            {props.children}
        </div>
    )
}

export default BackgroundDropdownCenter;