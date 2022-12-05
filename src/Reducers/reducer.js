

const initialState = "" 

const userId = (state = initialState, action) => {
    switch (action.type){
        case "GET_USER" : return action.payload;

        default: return state;
    }
}

export default userId;