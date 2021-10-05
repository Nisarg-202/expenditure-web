import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import ExpenseReducer from './ExpenseReducer';

export default combineReducers({
  Auth: AuthReducer,
  Expense: ExpenseReducer,
});
