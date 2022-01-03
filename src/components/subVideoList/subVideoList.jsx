import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { convertCount, videoDate } from "../../services";
import { createSearchParams } from "react-router-dom";
import reactParse from "html-react-parser";
import styles from "./subVideoList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

const SubVideoList = ({ tag, categoryId, videoId }) => {
	const navigate = useNavigate();
	const [videos, setVideos] = useState(null);
	const [nextToken, setNextToken] = useState(null);

	const query = tag
		? `search?part=snippet&q=${tag}&type=video&`
		: `videos?part=snippet&regionCode=KR&chart=mostPopular&videoCategoryId=${categoryId}&`;

	useEffect(() => {
		if (!categoryId) return;

		axios
			.get(
				`${process.env.REACT_APP_YOUTUBE_API_URL}${query}maxResults=10&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
			)
			.then((response) => {
				setVideos(response.data.items);
				setNextToken(response.data.nextPageToken);
				document.querySelector(".infinite-scroll-component").scrollTo(0, 0);
			})
			.catch((err) => console.error(err));
	}, [query, tag, categoryId]);

	const fetchVideos = () => {
		if (!nextToken) return;

		axios
			.get(
				`${process.env.REACT_APP_YOUTUBE_API_URL}${query}maxResults=4&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&pageToken=${nextToken}`
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
		videos && (
			<article className={`${styles.listWrap}`}>
				<ul className={styles.list} id="target">
					<InfiniteScroll
						className={styles.scrollWrap}
						dataLength={videos.length}
						next={fetchVideos}
						height={600}
						scrollableTarget="target"
						hasMore={true}
						endMessage={
							<p style={{ textAlign: "center" }}>
								<b>You have seen it all</b>
							</p>
						}
					>
						{videos.map((video, index) => {
							if (videoId === (video.id.videoId || video.id)) {
								return null;
							}

							const info = video.snippet;
							return (
								<li
									key={index}
									onClick={() => {
										navigate({
											pathname: "/watch",
											search: `?${createSearchParams({
												id: video.id.videoId || video.id,
											})}`,
										});
									}}
								>
									<div className={styles.imgWrap}>
										<img src={info.thumbnails.high.url} alt="thumbnail"></img>
									</div>
									<div className={styles.infoWrap}>
										<span className={styles.title}>
											{reactParse(info.title)}
										</span>
										<span className={styles.name}>{info.channelTitle}</span>
										<span className={styles.date}>
											{video.statistics
												? `조회수 ${convertCount(
														video.statistics.viewCount
												  )}회 • `
												: null}
											{videoDate(info.publishedAt)}
										</span>
									</div>
								</li>
							);
						})}
					</InfiniteScroll>
				</ul>
			</article>
		)
	);
};

export default SubVideoList;
