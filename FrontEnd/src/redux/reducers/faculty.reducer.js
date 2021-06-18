import {
    GET_FACULTY_LIST_SUCCESS,
    GET_FACULTY_LIST_FAIL,
    SET_PAGINATION_FACULTY,
    SET_LOGO_FACULTY,
  } from '../constants';
const initialState ={
    facultyList: [],
    SchoolInfo: {
        logo: '',
    },
    pagination: {current: 1, pageSize: 10, total: 0},
    visible: false,
}

function facultyReducer (state = initialState, action){
    switch(action.type){
        case GET_FACULTY_LIST_SUCCESS:{
            return{
                ...state,
                facultyList: [
                    ...action.payload.newList,
                ],
                pagination: {
                    ...action.payload.pagination,
                   total: action.payload.count}
            };
        }
        case GET_FACULTY_LIST_FAIL:{
            return state;
        }
        case SET_PAGINATION_FACULTY:{
            return{
                ...state,
                pagination: action.payload
            };
        }
        case SET_LOGO_FACULTY:{
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

export default facultyReducer;