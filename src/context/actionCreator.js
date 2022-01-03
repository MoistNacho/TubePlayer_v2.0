import { ACTIVATION, DEACTIVATION, RESET } from "./actionTypes";

export const activation = () => ({ type: ACTIVATION });
export const deactivation = () => ({ type: DEACTIVATION });
export const reset = () => ({ type: RESET });
