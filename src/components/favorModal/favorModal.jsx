import React, { useEffect, useState } from "react";
import styles from "./favorModal.module.css";
import closeIcon from "../../design/svg/close.svg";
import axios from "axios";
import LoadingSpinner from "../common/loadingSpinner/loadingSpinner";
import trashIcon from "../../design/svg/trash.svg";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

const FavorModal = ({ modal, closeModal }) => {
	const navigate = useNavigate();

	const [videos, setVideos] = useState(null);

	useEffect(() => {
		if (modal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		if (modal && localStorage.getItem("favorList")) {
			const favorList = localStorage.getItem("favorList").split(",");

			const fetchVideo = async () => {
				let newArr = await Promise.all(
					favorList.map((item) =>
						axios
							.get(
								`${process.env.REACT_APP_YOUTUBE_API_URL}videos?part=statistics&part=snippet&id=${item}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
							)
							.then((response) => {
								return response.data.items[0];
							})
							.catch((err) => {
								console.error(err);
							})
					)
				);
				newArr[0] && setVideos(newArr);
			};

			fetchVideo();
		} else {
			setVideos([]);
		}
	}, [modal]);

	const handlePage = (id) => {
		navigate({
			pathname: "/watch",
			search: `?${createSearchParams({
				id: id,
			})}`,
		});
	};

	const deleteFavor = (id) => {
		if (localStorage.getItem("favorList")) {
			const favorList = localStorage.getItem("favorList").split(",");

			const newFavor = favorList.filter((item) => item !== id);
			const newVideos = videos.filter((video) => video.id !== id);

			localStorage.setItem("favorList", newFavor);
			setVideos(newVideos);
		}
	};

	return (
		<main className={`${styles.modalWrap} ${!modal ? styles.disable : ""}`}>
			<div className={styles.background} onClick={closeModal}></div>
			<article className={styles.modalBox}>
				<section className={styles.header}>
					<button onClick={closeModal}>
						<img src={closeIcon} alt="close_img" />
					</button>
				</section>
				<section className={styles.body}>
					{videos ? (
						videos.length > 0 ? (
							<ul className={styles.videoList}>
								{videos.map((video, index) => {
									return (
										<li key={index}>
											<div
												className={styles.imgWrap}
												onClick={() => {
													handlePage(video.id);
												}}
											>
												<img
													src={video?.snippet.thumbnails.high.url}
													alt="thumbnail_img"
												/>
											</div>
											<div
												className={styles.infoWrap}
												onClick={() => {
													handlePage(video.id);
												}}
											>
												<h6>{video?.snippet.title}</h6>
												<span>{video?.snippet.channelTitle}</span>
											</div>
											<div className={styles.btnWrap}>
												<button
													className={styles.deleteBtn}
													onClick={() => {
														deleteFavor(video.id);
													}}
												>
													<img src={trashIcon} alt="trash_icon" />
												</button>
											</div>
										</li>
									);
								})}
							</ul>
						) : (
							<div className={styles.none}>
								<p className={styles.title}>You don't have any saved</p>
								<p className={styles.sub}>
									Nothing find in your local storage, try clicking the like!
								</p>
							</div>
						)
					) : (
						<div className={styles.loadingWrap}>
							<LoadingSpinner dark={true} />
						</div>
					)}
				</section>
			</article>
		</main>
	);
};

export default FavorModal;
