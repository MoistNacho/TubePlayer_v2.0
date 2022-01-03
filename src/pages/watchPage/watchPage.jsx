import React from "react";
import WatchVideo from "../../components/watchVideo/WatchVideo";
import styles from "./watchPage.module.css";

const WatchPage = ({ useQuery }) => {
	const query = useQuery().get("id");
	return (
		<main className={styles.mainWrap}>
			<WatchVideo videoId={query} />
		</main>
	);
};

export default WatchPage;
