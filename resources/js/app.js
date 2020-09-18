import React from "react";
import ReactDOM from "react-dom";

require("./bootstrap");

const App = () => {
    return (
        <div className="container">
            App
        </div>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
