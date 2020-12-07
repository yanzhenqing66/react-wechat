import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import { persistStore, persistReducer } from 'redux-persist'
// import storageSession from 'redux-persist/lib/storage/session'
import reducers from './reducers'

// const persistConfig = {
//   key: 'root',
//   storage: storageSession,
//   blacklist: []
// }
// let myPersistReducer = persistReducer(persistConfig, reducers)

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

// export const persiststor = persistStore(store)
export default store