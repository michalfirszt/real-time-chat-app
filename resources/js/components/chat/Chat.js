import React, { Component } from "react";
import axios from "axios";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            websocket: new WebSocket("ws://localhost:8080"),
            message: "",
            messages: [],
        };

        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    getMessages() {
        axios.get('/api/messages', {
            params: {
                "api_token": sessionStorage.getItem("apiToken"),
            }
        }).then(response => {
            this.setState({
                messages: response.data,
            })
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
                    <li key={message.id}>
                        {message.content}
                    </li>
                );
            })
        );
    }

    sendMessage(event) {
        event.preventDefault();

        this.state.websocket.send(
            JSON.stringify({
                "type": "message",
                "message": this.state.message,
            })
        );

        this.setState({
            message: "",
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            Chat
                        </div>
                        <div className="card-body">
                            <ul>
                                {this.selectMessages()}
                            </ul>
                        </div>
                        <div className="card-footer">
                            <form onSubmit={this.sendMessage}>
                                <div className="form-group">
                                    <input 
                                        name="message" 
                                        className="form-control" 
                                        onChange={this.handleChange} 
                                        value={this.state.message}
                                        placeholder="Type message here" 
                                        required/>
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="btn btn-primary" value="Send"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;
