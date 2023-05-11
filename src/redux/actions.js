import { SET_FAVORITE_LIST_DATA, SET_LOGIN, SET_LOGIN_USER_DATA, SET_LOGOUT, ADD_NOTIFICATION_DATA } from "./types";

//Define your action create that set your loading state.
const loginUser = (user) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: SET_LOGIN,
        payload: user,
    };
}

const logoutUser = () => {
    return {
        type: SET_LOGOUT,
    };
}

const setLoggedInUserData = (data) => {
    return {
        type: SET_LOGIN_USER_DATA,
        payload: data
    };
}

const setFavoriteList = (data) => {
    return {
        type: SET_FAVORITE_LIST_DATA,
        payload: data
    };
}

const addNotificationList = (data) => {
    return {
        type: ADD_NOTIFICATION_DATA,
        payload: data
    };
}

export {
    loginUser,
    logoutUser,
    setLoggedInUserData,
    setFavoriteList,
    addNotificationList
}