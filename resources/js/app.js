import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

require("./bootstrap");
import Routes from "./Routes";
import Store from "./store/Store";

const App = () => {
    return (
        <Provider store={Store}>
            <Router>
                <div className="container mt-4">
                    <Routes />
                </div>
            </Router>
        </Provider>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
