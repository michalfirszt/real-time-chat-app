import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

require("./bootstrap");
import Routes from "./Routes";

const App = () => {
    return (
        <Router>
            <div className="container mt-4">
                <Routes />
            </div>
        </Router>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
