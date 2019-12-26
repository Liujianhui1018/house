import {createStore,combineReducers, applyMiddleware}  from 'redux';
import createSagaMiddleware from 'redux-saga';

import mySaga from '../saga';

import reduces from '../reducers/index';

const sagaMiddleware = createSagaMiddleware()




//用createStore创建store，如果有多个Reducers方法，先用combineReducers进行方法的合并
const store = createStore(combineReducers(reduces),applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)

export default store;