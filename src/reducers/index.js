import { combineReducers } from 'redux';
import manualFormReducer from './manualFormReducer';
import globe from './globe';

export default combineReducers({
    voteOption:globe,
    manualFormReducer: manualFormReducer,
})