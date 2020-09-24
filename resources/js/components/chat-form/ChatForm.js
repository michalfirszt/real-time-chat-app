import React, { useState } from "react";

const ChatForm = ({sendMessage}) => {
    const [message, setMessage] = useState("");

    const submitForm = (event) => {
        event.preventDefault();

        sendMessage(message);

        setMessage("");
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <input 
                        name="message" 
                        className="form-control" 
                        onChange={(e) => setMessage(e.target.value)} 
                        value={message}
                        placeholder="Type message here" 
                        required/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Send"/>
                </div>
            </form>
        </div>
    );
}

export default ChatForm;
