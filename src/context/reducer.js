import { ACTIVATION, DEACTIVATION, RESET } from "./actionTypes";

export const reducer = (state, action) => {
	const { type } = action;
	switch (type) {
		case ACTIVATION:
			return { ...state, activate: "좋아요 목록에 추가 되었습니다" };
		case DEACTIVATION:
			return { ...state, activate: "좋아요 목록에 제거 되었습니다" };
		case RESET:
			return { ...state, activate: null };
		default:
			return state;
	}
};
