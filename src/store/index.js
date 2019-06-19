import { combineReducers } from 'redux';

import jokes from './reducers/jokes';
import category from './reducers/category';

export default combineReducers({
    jokes,
    category
})