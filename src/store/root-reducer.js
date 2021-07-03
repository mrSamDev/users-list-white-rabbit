import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import authentication from './auth/reducer';
import users from './users/reducers';

const rootReducer = combineReducers({authentication, users});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
