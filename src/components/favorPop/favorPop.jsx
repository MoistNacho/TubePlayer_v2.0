import React from "react";
import styles from "./favorPop.module.css";

const FavorPop = ({ state }) => {
	return (
		<article className={`${styles.popWrap} ${state ? styles.on : ""}`}>
			<span>{state}</span>
		</article>
	);
};

export default FavorPop;
