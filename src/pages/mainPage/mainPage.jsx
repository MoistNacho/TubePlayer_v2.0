import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import VideoList from "../../components/videoList/VideoList";
import styles from "./mainPage.module.css";
import axios from "axios";

const youtubeKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const MainPage = ({ modal }) => {
	const [videos, setVideos] = useState([]);
	const [nextToken, setNextToken] = useState(null);

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_YOUTUBE_API_URL}videos?part=statistics&part=snippet&regionCode=KR&chart=mostPopular&maxResults=16&key=${youtubeKey}`
			)
			.then((response) => {
				setVideos(response.data.items);
				setNextToken(response.data.nextPageToken);
			})
			.catch((err) => console.error(err));
	}, []);

	const fetchVideos = () => {
		if (!nextToken) return;

		axios
			.get(
				`${process.env.REACT_APP_YOUTUBE_API_URL}videos?
				part=statistics&part=snippet&regionCode=KR&chart=mostPopular&maxResults=8&key=${youtubeKey}&
				pageToken=${nextToken}`
			)
			.then((response) => {
				if (response.data.items.length <= 0) return;

				const newArr = [...videos, ...response.data.items];
				setVideos(newArr);
				setNextToken(response.data.nextPageToken);
			})
			.catch((err) => console.error(err));
	};

	return (
		<main className={styles.mainWrap}>
			<VideoList videos={videos} fetchVideos={fetchVideos} modal={modal} />
		</main>
	);
};

export default MainPage;
