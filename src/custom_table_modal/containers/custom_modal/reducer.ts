import { handleActions, Action } from "redux-actions";
import { SHOW_MODAL, HIDE_MODAL, SAVE_CHANGE_DATA, DELETE_ITEM_DATA } from "./constants";

const initialState: any = {
    visible: false,
    dataSource: [{
        id: 1,
        name: 'Monica',
        age: 20,
        address: 'London, Park Lane no. 0'
    }, {
        id: 2,
        name: 'kingbora',
        age: 19,
        address: 'London, Park Lane no. 2'
    }, {
        id: 3,
        name: 'Kydice',
        age: 30,
        address: 'London, Park Lane no. 1'
    }, {
        id: 4,
        name: 'Lydia',
        age: 24,
        address: 'London, Park Lane no. 4'
    }]
};

export const customModalReducer = handleActions({
    [SHOW_MODAL]: (state: any, action: Action<any>) => {
        return Object.assign({}, state, {
            visible: true
        });
    },
    [HIDE_MODAL]: (state: any, action: Action<any>) => {
        return Object.assign({}, state, {
            visible: false
        });
    },
    [SAVE_CHANGE_DATA]: (state: any, action: Action<any>) => {
        const { index, record } = action.payload;
        const dataSource = state.dataSource.concat();
        if (dataSource[index].id === record.id) {
            dataSource[index] = record;
        } else {
            const flagIndex = dataSource.findIndex((item: any) => item.id === record.id);
            if (flagIndex > -1) {
                dataSource[flagIndex] = record;
            }
        }

        return Object.assign({}, state, {
            dataSource
        });
    },
    [DELETE_ITEM_DATA]: (state: any, action: Action<any>) => {
        const { record, index } = action.payload;
        const dataSource = state.dataSource.concat();
        if (dataSource[index].id === record.id) {
            dataSource.splice(index, 1);
        } else {
            const flagIndex = dataSource.findIndex((item: any) => item.id === record.id);
            if (flagIndex > -1) {
                dataSource.splice(flagIndex, 1);
            }
        }

        return Object.assign({}, state, {
            dataSource: dataSource
        });
    }
}, initialState);