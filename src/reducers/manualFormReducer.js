import _ from 'lodash';
import {
    CREATE_FORM,
    FETCH_FORM,
    FETCH_FORM_LIST,
    EDIT_FORM,
    DELETE_FORM
} from '../actions/type';



export default (state={}, action)=>{
    switch(action.type){
        case CREATE_FORM:
        case FETCH_FORM:
        case EDIT_FORM:
            return {...state, [action.payload.id]: action.payload};
        case FETCH_FORM_LIST:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case DELETE_FORM:
            return _.omit(state, action.payload);    
        
        default:
                return state;
    }
}