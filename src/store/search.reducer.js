const searchReducer = (state={
    title: ''
}, action) => {
    switch (action.type) {
        case "ADD_SEARCHED_TITLE" :
            return {
                ...state,
                title: action.title
            }
        default :
            return state
    }
}

export default searchReducer