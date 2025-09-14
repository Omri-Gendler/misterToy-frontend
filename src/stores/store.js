import { combineReducers, compose, legacy_createStore as createStore } from "redux"
// import { userReducer } from "./reducers/user.reducer.js"
import { AppReducer } from '../reducers/toy.reducer.js'
import { userReducer } from "../reducers/user.reducer.js"
// const { createStore, compose, combineReducers } = Redux

const rootReducer = combineReducers({
    toyModule: AppReducer,
    userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
