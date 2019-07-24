import { handleActions } from "redux-actions";

const initialState: any = {
    dataList: [{
        id: 1823,
        picUrl: "",
        foodName: "米饭",
        type: "noodles",
        price: 3,
        description: "选用优质东北查干湖大米"
    }, {
        id: 2931,
        picUrl: "",
        foodName: "土豆片",
        type: 'vegetables',
        price: 4.9,
        description: "主要原料：土豆"
    }, {
        id: 2019,
        picUrl: "",
        foodName: "娃娃菜",
        type: 'vegetables',
        price: 4.9,
        description: "主要原料：娃娃菜"
    }, {
        id: 8321,
        picUrl: "",
        foodName: "方便面",
        type: "noodles",
        price: 5.5,
        description: "主要原料：小麦"
    }, {
        id: 8321,
        picUrl: "",
        foodName: "藕片",
        type: 'vegetables',
        price: 5.5,
        description: "主要原料：小麦"
    }, {
        id: 2812,
        picUrl: "",
        foodName: "麻辣",
        type: 'taste',
        price: 1.2,
        description: "主要原料：调味料"
    }, {
        id: 3921,
        picUrl: "",
        foodName: "香辣",
        type: 'taste',
        price: 1.3,
        description: "主要原料：调味料"
    }, {
        id: 2812,
        picUrl: "",
        foodName: "微麻微辣",
        type: 'taste',
        price: 1,
        description: "主要原料：调味料"
    }, {
        id: 2812,
        picUrl: "",
        foodName: "牛肉卷",
        type: 'meat',
        price: 12,
        description: "主要原料：新鲜好肉"
    }, {
        id: 2231,
        picUrl: "",
        foodName: "毛肚",
        type: 'meat',
        price: 10,
        description: "主要原料：新鲜好肉"
    }, {
        id: 3011,
        picUrl: "",
        foodName: "里脊肉",
        type: 'meat',
        price: 8.9,
        description: "主要原料：新鲜好肉"
    }],
    shoppingCart: []
};

export const shoppingReducer = handleActions({
    
}, initialState);