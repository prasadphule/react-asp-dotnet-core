import axios from 'axios'
import { setObjectType, setObjectTypeList } from 'features/objectType/objectTypeSlice'

//thunk middleware
export const getObjectTypeAll = () => async (dispatch) => {
    try {
        const response = await axios.get('ObjectType')
        if (response.status === 200) {
            dispatch(setObjectTypeList(response.data))
        }
        else {
            console.log("server side error.")
        }
    }
    catch (error) {
        console.log("server side error.")
    }
};

export const getObjectTypeById = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`ObjectType/${id}`)
        if (response.status === 200) {
            dispatch(setObjectType(response.data))
        }
        else {
            console.log("server side error.")
        }
    }
    catch (error) {
        console.log("server side error.")
    }
};

export const saveObjectType = (data) => async (dispatch) => {
    try {
        if (data.objectTypeId) {
            const response = await axios.put(`objectType/${data.objectTypeId}`, data);
            if (response.status === 200) {
                dispatch(setObjectType(response.data))
            }
            else {
                console.log("server side error.")
            }
        }
        else {
            const response = await axios.post("objectType", data);
            if (response.status === 201) {
                dispatch(setObjectType(response.data))
            }
            else {
                console.log("server side error.")
            }
        }
    }
    catch (error) {
        console.log("server side error.")
    }
};

export const deleteObjectTypeById = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`ObjectType/${id}`)
        if (response.status === 200) {
            }
        else {
            console.log("server side error.")
        }
    }
    catch (error) {
        console.log("server side error.")
    }
};
