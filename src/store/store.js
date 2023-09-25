// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import employeeReducers from '../Reducer/EmployeeReducer';

const rootReducer = combineReducers({
  employees: employeeReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
