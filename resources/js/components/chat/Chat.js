import React, { Component } from "react";
import axios from "axios";

import ChatForm from "../chat-form/ChatForm";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            websocket: new WebSocket("ws://localhost:8080"),
            messages: [],
        };

        this.messagesEnd = React.createRef();
        this.onMessage = this.onMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.state.websocket.onopen = this.onOpen;
        this.state.websocket.onclose = this.onClose;
        this.state.websocket.onerror = this.onError;
        this.state.websocket.onmessage = this.onMessage;

        this.getMessages();
    }

    getMessages() {
        axios.get('/api/messages', {
            params: {
                "api_token": sessionStorage.getItem("apiToken"),
            }
        }).then(response => {
            this.setState({
                messages: response.data,
            });

            this.messagesEnd.current.scrollIntoView({behavior: "auto"});
        });
    }

    onOpen(event) {
        console.log("connected");
    }

    onClose(event) {
        console.log("disconnected");
    }

    onError(event) {
        console.log(event);
    }

    onMessage(event) {
        let data = JSON.parse(event.data);

        switch (data.type) {
            case "message": {
                let newMessages = [...this.state.messages, data.message];

                this.setState({
                    messages: newMessages,
                });

                this.messagesEnd.current.scrollIntoView({behavior: "smooth"});
                break;
            }

            default: {
                break;
            }
        }
    }

    selectMessages() {
        return (
            this.state.messages.map(message => {
                return (
                    <li key={message.id} className="my-4">
                        <div className="font-weight-bold">
                            {message.user.name}
                        </div>
                        <div>
                            {message.content}
                        </div>
                        <hr />
                    </li>
                );
            })
        );
    }

    sendMessage(message) {
        this.state.websocket.send(
            JSON.stringify({
                "type": "message",
                "message": message,
                "apiToken": sessionStorage.getItem("apiToken"),
            })
        );
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card chat-card">
                        <div className="card-header">
                            Chat
                        </div>
                        <div className="card-body">
                            <ul>
                                {this.selectMessages()}
                            </ul>
                            <div ref={this.messagesEnd}></div>
                        </div>
                        <div className="card-footer">
                            <ChatForm sendMessage={this.sendMessage} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;
