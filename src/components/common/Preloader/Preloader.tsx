import styles from "./Preloader.module.css"
import preloader from "../../../assets/images/preloader.svg";
import React from "react";

export const Preloader: React.FC = () => <div className={styles.spinnerContainer}>
    <img src={preloader} alt={"Preloader spinner"}/>
</div>;