import {createStore, applyMiddleware} from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import rootReducer from '../reducers/index'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
export const middleware = []

if (process.env.NODE_ENV !== 'production') {
  middleware.push(reduxImmutableStateInvariant())
}
middleware.push(thunk)

export default function configureStore () {
  const store = createStore(connectRouter(history)(rootReducer), composeWithDevTools(applyMiddleware(...middleware, routerMiddleware(history))))
  return store
}
