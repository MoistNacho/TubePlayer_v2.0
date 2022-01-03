export const videoDate = (date) => {
	const year = `${date.substring(0, 4)}년 `;
	const month = `${date.substring(5, 7)}월 `;
	const day = `${date.substring(8, 10)}일`;
	return year + month + day;
};

export const convertCount = (count) => {
	if (count > 10000) {
		const million = Math.floor(count / 10000);
		return `${million}만`;
	} else if (count > 1000) {
		const thousand = count / 1000;
		return `${thousand.toFixed(1)}천`;
	} else {
		return count;
	}
};
