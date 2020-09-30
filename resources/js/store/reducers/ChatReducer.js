export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_MESSAGES = "ADD_MESSAGES";

const initialState = {
    messages: [],
};

const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGES: {
            const newMessages = [...state.messages, ...action.payload];

            return {
                ...state,
                messages: newMessages,
            };
        } 

        case ADD_MESSAGE: {
            const newMessages = [...state.messages, action.payload];

            return {
                ...state,
                messages: newMessages,
            };
        }
            
        default: {
            console.warn(`Unknown action ${action.type}`);

            return {...state};
        }
    }
}

export default ChatReducer;
