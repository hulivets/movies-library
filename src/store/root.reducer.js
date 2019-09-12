import { combineReducers } from 'redux'
import requestReducer from './request.reducer'
import searchReducer from './search.reducer'
const rootReducer = combineReducers({
    request: requestReducer,
    search: searchReducer
})

export default rootReducer