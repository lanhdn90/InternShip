import {
    GET_COMPANY_LIST_HOME_SUCCESS,
    GET_COURSE_LIST_HOME_SUCCESS,
  } from '../constants';
const initialState ={
    companyList: [],
    DataCourse:[],
    // SchoolInfo: {
    //     logo: '',
    // },
    pagination: {current: 1, pageSize: 10, total: 0},
    // visible: false,
}

function homeReducer (state = initialState, action){
    switch(action.type){
        case GET_COMPANY_LIST_HOME_SUCCESS:{
            return{
                ...state,
                companyList: [
                    ...action.payload.newList,
                ]
            };
        }
        case GET_COURSE_LIST_HOME_SUCCESS:{
            return{
                ...state,
                DataCourse: [
                    ...action.payload,
                ]
            };
        }
        default: {
            return state;
        }
    }
}

export default homeReducer;