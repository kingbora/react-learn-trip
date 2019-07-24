import { createAction } from "redux-actions";
import { SHOW_MODAL, HIDE_MODAL, SAVE_CHANGE_DATA, DELETE_ITEM_DATA } from "./constants";

// 展示弹窗
export const showModal = createAction(SHOW_MODAL);
// 隐藏弹窗
export const hideModal = createAction(HIDE_MODAL);

export const saveChangeData = createAction<any>(SAVE_CHANGE_DATA);
export const deleteItemData = createAction<any>(DELETE_ITEM_DATA);