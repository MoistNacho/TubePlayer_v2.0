import React from "react";
import styles from "./loadingSpinner.module.css";

const LoadingSpinner = ({ dark = false }) => {
	return <div className={`${styles.loader} ${dark ? styles.dark : ""}`}></div>;
};

export default LoadingSpinner;
