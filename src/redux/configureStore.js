import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ThunkMiddleware from 'redux-thunk';
import homeReducer from './home/home';

const reducer = combineReducers({
  homeReducer,
});

const store = createStore(reducer, applyMiddleware(ThunkMiddleware, logger));

export default store;
