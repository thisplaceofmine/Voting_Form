import voting from '../api/voting';
import history from '../history';
import _ from 'lodash'

import {
    CREATE_FORM,
    EDIT_FORM,
    FETCH_FORM,
    FETCH_FORM_LIST,
    DELETE_FORM
} from './type';


export const createForm = (formData) => async dispatch => {
    const response = await voting.post('/voting', { ...formData });
    dispatch({ type: CREATE_FORM, payload: response.data });
    history.push('/');
};

export const fetchForm = (id) => async dispatch => {
    const response = await voting.get(`/voting/${id}`);
    dispatch({ type: FETCH_FORM, payload: response.data });
};

export const fetchFormList = () => async dispatch => {
    const response = await voting.get('/voting');
    dispatch({ type: FETCH_FORM_LIST, payload: response.data });
}

export const editForm = (id, formData) => async dispatch => {
    const response = await voting.patch(`/voting/${id}`, formData);
    dispatch({ type: EDIT_FORM, payload: response.data });
};

export const deleteForm = (id) => async dispatch => {
    await voting.delete(`/voting/${id}`)
    dispatch({ type: DELETE_FORM, payload: id });
}