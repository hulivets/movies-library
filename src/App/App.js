import React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import rootReducer from '../store/root.reducer'
import Header from './Header/Header';
import Main from './Main/Main';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter basename="/">
                <div>
                    <Header />
                    <Main />
                </div>
            </BrowserRouter>
        </Provider>
  );
}

export default App;
