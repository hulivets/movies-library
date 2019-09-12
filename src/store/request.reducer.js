const requestReducer = (state={
    movies: [],
    count: 0,
    onRemoveStatus: true,
    onPostStatus: false,
    sortDirection: 'asc'
}, action) => {
    switch (action.type) {
        case "MOVIE_REQUEST_SUCCESS" :
            return {
                ...state,
                movies: action.data,
            }
        case "MOVIE_REQUEST_ERROR" :
            return {
                ...state,
                movie: [],
            }
        case "NEW_REQUEST_ON_POST" :
            return {
                ...state,
                onPostStatus: !state.onPostStatus
                }
        case "NEW_REQUEST_ON_REMOVE" : 
                return {
                    ...state,
                    onRemoveStatus: !state.onRemoveStatus
                }
        case "SORT_DRECTION_ASC" :
            return {
                ...state,
                sortDirection: 'asc'
            }
        case "SORT_DRECTION_DESC" :
            return {
                ...state,
                sortDirection: 'desc'
            }    
        default : {
            return state
        }
    }
}

export default requestReducer