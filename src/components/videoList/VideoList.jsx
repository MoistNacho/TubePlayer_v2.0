import React from "react";
import Video from "../videoItem/Video";
import styles from "./VideoList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchedVideo from "../videoItem/SearchedVideo";
import LoadingSpinner from "../common/loadingSpinner/loadingSpinner";

const VideoList = ({ modal, videos, fetchVideos, isSearched = false }) => {
	return videos.length > 0 ? (
		<InfiniteScroll
			className={styles.listWrap}
			dataLength={videos.length}
			next={fetchVideos}
			hasMore={true}
			endMessage={
				<p style={{ textAlign: "center" }}>
					<b>You have seen it all</b>
				</p>
			}
		>
			<ul className={`${styles.list} ${isSearched ? styles.searched : ""}`}>
				{videos.map((video) => {
					return isSearched ? (
						<SearchedVideo key={video.etag} video={video} modal={modal} />
					) : (
						<Video key={video.etag} video={video} modal={modal} />
					);
				})}
			</ul>
		</InfiniteScroll>
	) : (
		<div className={styles.loadingWrap}>
			<LoadingSpinner />
		</div>
	);
};

export default VideoList;
