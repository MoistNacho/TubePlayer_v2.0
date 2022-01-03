import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { videoDate, convertCount } from "../../services";
import Favorite from "../common/favorite/favorite";
import styles from "./Video.module.css";

const Video = ({ video, modal }) => {
	const data = video.snippet;
	const videoId = video.id.videoId || video.id;
	const navigate = useNavigate();
	const favorRef = useRef(null);
	const [preview, setPreview] = useState(false);
	const [mouseDelay, setMouseDelay] = useState(null);

	const handlePage = () => {
		navigate({
			pathname: "/watch",
			search: `?${createSearchParams({
				id: video.id.videoId || video.id,
			})}`,
		});
	};

	return (
		<li
			className={`${styles.video} ${preview ? styles.preview : ""}`}
			onMouseEnter={() => {
				setMouseDelay(
					setTimeout(() => {
						setPreview(true);
					}, 300)
				);
			}}
			onMouseLeave={() => {
				clearTimeout(mouseDelay);
				setPreview(false);
			}}
		>
			<article className={styles.item} onClick={handlePage}>
				{preview ? (
					<div className={styles.ytContainer}>
						<iframe
							src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&color=white&start=10&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						></iframe>
					</div>
				) : (
					<div className={styles.img}>
						<img src={data.thumbnails.high.url} alt="" />
					</div>
				)}
				<div className={styles.infoWrap}>
					<h5 className={styles.title}>{data.title}</h5>
					<div className={styles.bottom}>
						<article
							className={styles.favorWrap}
							onClick={(e) => {
								e.stopPropagation();
							}}
							ref={favorRef}
						>
							<Favorite videoId={videoId} modal={modal} />
						</article>
						<div className={styles.subInfo}>
							<span className={styles.name}>{data.channelTitle}</span>
							<span className={styles.date}>
								{video.statistics
									? `조회수 ${convertCount(video.statistics.viewCount)}회 • `
									: null}
								{videoDate(video.snippet.publishedAt)}
							</span>
						</div>
					</div>
				</div>
			</article>
		</li>
	);
};

export default Video;
