import React, { useRef } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import favorIcon from "../../design/svg/favorList.svg";

const Header = ({ openModal }) => {
	const navigate = useNavigate();
	const inputRef = useRef();

	const handleSearch = (e) => {
		if (!inputRef.current.value) return;

		if (e.type === "click" || e.key === "Enter") {
			e.preventDefault();

			navigate({
				pathname: "/result",
				search: `?${createSearchParams({
					search: inputRef.current.value,
				})}`,
			});
			inputRef.current.value = "";
		}
	};

	return (
		<header className={styles.header}>
			<article className={styles.scope}>
				<div
					className={styles.logo}
					onClick={() => {
						navigate("/", { replace: true });
					}}
				>
					<i className={`${styles.logoIcon} fas fa-play-circle`}></i>
					<span className={styles.logoName}>TubePlayer</span>
				</div>
			</article>
			<article className={styles.searchBar}>
				<input
					ref={inputRef}
					className={styles.input}
					type="text"
					placeholder="검색"
					onKeyPress={handleSearch}
				></input>
				<button className={styles.btn} onClick={handleSearch}>
					<i className="fas fa-search"></i>
				</button>
			</article>
			<article>
				<butotn className={styles.saved} onClick={openModal}>
					<img src={favorIcon} alt="heart_img" />
					<span>Saved</span>
				</butotn>
			</article>
		</header>
	);
};

export default Header;
