import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "../reducers/user-reducer";
import groupReducer from "../reducers/group-reducer";
import courseReducer from "../reducers/course-reducer";

const reducers = combineReducers({
    userReduser: userReducer,
    groupReducer: groupReducer,
    courseReducer: courseReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;