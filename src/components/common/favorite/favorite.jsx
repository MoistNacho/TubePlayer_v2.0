import React, { useContext, useEffect, useState } from "react";
import { store } from "../../../context";
import {
	activation,
	deactivation,
	reset,
} from "../../../context/actionCreator";
import styles from "./favorite.module.css";
import favoriteIcon from "../../../design/svg/favorite.svg";
import favoriteLineIcon from "../../../design/svg/favorite-line.svg";

const Favorite = ({ modal, videoId }) => {
	const [isLike, setIsLike] = useState(false);
	const [, dispatch] = useContext(store);

	useEffect(() => {
		const favorList = localStorage.getItem("favorList");
		if (favorList && favorList.includes(videoId)) {
			setIsLike(true);
		} else {
			setIsLike(false);
		}
	}, [videoId, isLike, modal]);

	const handleSave = () => {
		if (localStorage.getItem("favorList")) {
			const prev = localStorage.getItem("favorList").split(",");

			if (prev.includes(videoId)) {
				const newArr = prev.filter((i) => i !== videoId);
				localStorage.setItem("favorList", newArr);
				setIsLike(false);
				dispatch(deactivation());
			} else {
				localStorage.setItem("favorList", [...prev, videoId]);
				setIsLike(true);
				dispatch(activation());
			}
		} else {
			localStorage.setItem("favorList", [videoId]);
			setIsLike(true);
			dispatch(activation());
		}
		setTimeout(() => {
			dispatch(reset());
		}, 1500);
	};

	return (
		<button
			className={styles.favorBtn}
			onClick={() => {
				handleSave();
			}}
		>
			<img src={isLike ? favoriteIcon : favoriteLineIcon} alt="favorIcon"></img>
		</button>
	);
};

export default Favorite;
