import React from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { videoDate } from "../../services";
import reactParse from "html-react-parser";
import styles from "./SearchedVideo.module.css";
import Favorite from "../common/favorite/favorite";

const SearchedVideo = ({ modal, video }) => {
	const data = video.snippet;
	const videoId = video.id.videoId || video.id;
	const navigate = useNavigate();

	const handlePage = () => {
		navigate({
			pathname: "/watch",
			search: `?${createSearchParams({
				id: videoId,
			})}`,
		});
	};

	return (
		<li className={styles.video}>
			<div className={styles.imgWrap} onClick={handlePage}>
				<img src={data.thumbnails.high.url} alt="" />
			</div>
			<div className={styles.infoWrap}>
				<div onClick={handlePage}>
					<h5 className={styles.title}>{reactParse(data.title)}</h5>
					<span className={styles.nameDate}>
						{data.channelTitle.length > 14
							? data.channelTitle.substring(0, 14) + "... "
							: data.channelTitle}{" "}
						• {videoDate(video.snippet.publishedAt)}
					</span>
					<p className={styles.desc}>{data.description}</p>
				</div>
				<article className={styles.favorWrap}>
					<Favorite videoId={videoId} modal={modal} />
				</article>
			</div>
		</li>
	);
};

export default SearchedVideo;
