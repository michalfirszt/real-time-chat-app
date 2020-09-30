import { createStore } from "redux";
import RoorReducer from "./RoorReducer";

const Store = createStore(
    RoorReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
