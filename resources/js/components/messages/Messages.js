import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ADD_MESSAGES } from "../../store/reducers/ChatReducer";

const Messages = () => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.ChatReducer.messages);

    useEffect(() => {
        axios.get('/api/messages', {
            params: {
                "api_token": sessionStorage.getItem("apiToken"),
            }
        }).then(response => {
            dispatch({
                type: ADD_MESSAGES,
                payload: response.data
            });
        });
    }, []);

    const selectMessages = () => {
        return messages.map(message => {
            return (
                <li key={message.id}>
                    {message.content}
                </li>
            )
        })
    }

    return (
        <div>
            {selectMessages()}
        </div>
    )
}

export default Messages;
