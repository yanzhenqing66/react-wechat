import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
// import {persiststor} from './redux/store'
// import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.render(
  (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persiststor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  ),
  document.getElementById('root')
)