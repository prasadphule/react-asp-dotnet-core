
import { combineReducers, createSlice } from '@reduxjs/toolkit'

//initial state
export const initialStateObjectType = {
    objectTypeId: 0,
    objectTypeName: "",
    description: "",
    level: 0
}

//object type slice
export const objectTypeSlice = createSlice({
    name: 'objectType',
    initialState: initialStateObjectType,
    reducers: {
        setObjectType: (state, action) => action.payload,
    },
})

export const objectTypeListslice = createSlice({
    name: 'objectTypeList',
    initialState: [],
    reducers: {
        setObjectTypeList: (state, action) => action.payload,
    },
})

//actions 
export const { setObjectType } = objectTypeSlice.actions;
export const { setObjectTypeList } = objectTypeListslice.actions;

//selector
export const selectObjectType = state => state.objectType.item;
export const selectObjectTypeList = state => state.objectType.list;

//reducer
const objectTypeReducer = combineReducers({
    item: objectTypeSlice.reducer,
    list: objectTypeListslice.reducer
})

export default objectTypeReducer;