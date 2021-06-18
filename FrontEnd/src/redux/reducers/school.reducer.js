import {
    GET_SCHOOL_LIST_SUCCESS,
    GET_SCHOOL_LIST_FAIL,
    SET_PAGINATION_SCHOOL,
    SET_LOGO_SCHOOL,
  } from '../constants';
const initialState ={
    listSchool: [],
    SchoolInfo: {
        logo: '',
    },
    pagination: {current: 1, pageSize: 10, total: 0},
    visible: false,
}

function schoolReducer (state = initialState, action){
    switch(action.type){
        case GET_SCHOOL_LIST_SUCCESS:{
            return{
                ...state,
                listSchool: [
                    ...action.payload.newList,
                ],
                pagination: {
                    ...action.payload.pagination,
                   total: action.payload.count}
            };
        }
        case GET_SCHOOL_LIST_FAIL:{
            return state;
        }
        case SET_PAGINATION_SCHOOL:{
            return{
                ...state,
                pagination: action.payload
            };
        }
        case SET_LOGO_SCHOOL:{
            return{
                ...state,
                SchoolInfo: {
                    ...state.SchoolInfo,
                    logo: action.payload, 
                }
            };
        }
        default: {
            return state;
        }
    }
}

export default schoolReducer;