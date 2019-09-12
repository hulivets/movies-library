import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './common/style/base.css'
import './common/style/reset.css'
import App from './App/App'

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
