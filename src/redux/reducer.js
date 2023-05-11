import { SET_FAVORITE_LIST_DATA, SET_LOGIN, SET_LOGIN_USER_DATA, SET_LOGOUT, ADD_NOTIFICATION_DATA } from "./types";

//Define your initialState
const initialState = {
    isAuthenticated: false,
    loggedInUser: null,
    favoriteList: [],
    notifications: []
}

//Define your reducer that will return the initialState by default
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOGIN: 
        return {...state, isAuthenticated: true};
        case SET_LOGOUT:
        return {...state, isAuthenticated: false, loggedInUser: null};
        case SET_LOGIN_USER_DATA:
        return {...state, isAuthenticated: true, loggedInUser: action.payload};
        case SET_FAVORITE_LIST_DATA: 
        return {...state, favoriteList: action.payload}
        case ADD_NOTIFICATION_DATA: 
        return {...state, notifications: [...state.notifications, action.payload]}
        default: 
        return state;
    }
}

export default reducer;
