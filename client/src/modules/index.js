import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counter from './counter'

console.log('И здесь мы')
export default (history) => combineReducers({
  counter,
  router: connectRouter(history)
})
