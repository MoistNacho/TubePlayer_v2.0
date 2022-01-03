import React, { useEffect, useState } from "react";
import styles from "./WatchVideo.module.css";
import axios from "axios";
import reactParse from "html-react-parser";
import { convertCount, videoDate } from "../../services";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import commaNumber from "comma-number";
import SubVideoList from "../subVideoList/subVideoList";

const WatchVideo = ({ videoId }) => {
	const navigate = useNavigate();
	const [videoInfo, setVideoInfo] = useState(null);
	const [isLongDesc, setIsLongDesc] = useState(false);
	const [moreDesc, setMoreDesc] = useState(false);
	const [subQuery, setSubQuery] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		axios
			.get(
				`${process.env.REACT_APP_YOUTUBE_API_URL}videos?part=statistics&part=snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
			)
			.then((response) => {
				const info = {
					...response.data.items[0].snippet,
					...response.data.items[0].statistics,
				};

				if ((info.description.match(/\n/g) || []).length > 3) {
					setIsLongDesc(true);
				}
				setVideoInfo(info);
				setSubQuery({
					tag: info.tags && info.tags[0],
					categoryId: info.categoryId,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}, [videoId]);

	return (
		<>
			<section className={styles.section}>
				<article className={styles.videoWrap}>
					<iframe
						type="text/html"
						className={styles.player}
						title="yotube player"
						src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
						allow="autoplay;"
					></iframe>
				</article>
				{videoInfo && (
					<div className={styles.info}>
						{videoInfo.tags?.length > 0 && (
							<ul className={styles.tagList}>
								{videoInfo.tags.map((tag, index) => {
									if (index > 3) {
										return null;
									}
									return (
										<li
											key={tag}
											onClick={() => {
												navigate({
													pathname: "/result",
													search: `?${createSearchParams({
														search: tag,
													})}`,
												});
											}}
										>
											#{tag}
										</li>
									);
								})}
							</ul>
						)}
						<h4 className={styles.title}>{videoInfo.title}</h4>
						<span className={styles.viewDate}>{`조회수 ${commaNumber(
							videoInfo.viewCount
						)}회 • ${videoDate(videoInfo.publishedAt)}`}</span>
						<hr />
						<div className={styles.subInfo}>
							<span>[{videoDate(videoInfo.channelTitle)}]</span>

							<span>좋아요 {convertCount(videoInfo.likeCount)}회</span>
						</div>
						<p
							className={`${styles.description} ${
								isLongDesc && !moreDesc ? styles.folded : ""
							}`}
						>
							{reactParse(videoInfo.description.replace(/\n/gi, "<br />"))}
						</p>
						{isLongDesc && (
							<button
								className={styles.descBtn}
								onClick={() => {
									setMoreDesc((i) => !i);
								}}
							>
								{moreDesc ? "- 간략히" : "+ 더보기"}
							</button>
						)}
					</div>
				)}
			</section>
			{subQuery && (
				<SubVideoList
					tag={subQuery.tag}
					categoryId={subQuery.categoryId}
					videoId={videoId}
				/>
			)}
		</>
	);
};

export default WatchVideo;
