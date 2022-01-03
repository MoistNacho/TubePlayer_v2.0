import React, { useEffect, useState } from "react";
import VideoList from "../../components/videoList/VideoList";
import styles from "./searchPage.module.css";
import axios from "axios";

const youtubeKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const SearchPage = ({ useQuery, modal }) => {
	const [videos, setVideos] = useState([]);
	const [nextToken, setNextToken] = useState(null);
	const query = useQuery().get("search");

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_YOUTUBE_API_URL}search?part=snippet&q=${query}&maxResults=8&type=video&key=${youtubeKey}`
			)
			.then((response) => {
				setVideos(response.data.items);
				setNextToken(response.data.nextPageToken);
			})
			.catch((err) => console.error(err));
	}, [query]);

	const fetchVideos = () => {
		if (!nextToken) return;

		axios
			.get(
				`${process.env.REACT_APP_YOUTUBE_API_URL}search?part=snippet&q=${query}&type=video&maxResults=4&key=${youtubeKey}&pageToken=${nextToken}`
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
			<VideoList
				videos={videos}
				fetchVideos={fetchVideos}
				isSearched={true}
				modal={modal}
			/>
		</main>
	);
};

export default SearchPage;
