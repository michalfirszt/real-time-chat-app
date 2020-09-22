import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Chat from "../../components/chat/Chat";

const Home = () => {
    let history = useHistory();
    let isLoggedIn = sessionStorage.getItem("apiToken");

    useEffect(() => {
        if (!isLoggedIn) {
            history.push("/login");
        }
    }, []);

    return isLoggedIn ? (
        <div className="row">
            <div className="col-12">
                <Chat />
            </div>
        </div>
    ) : (
        <div></div>
    );
}

export default Home;
