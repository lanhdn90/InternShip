import {
    GET_COMPANY_LIST_SUCCESS,
    GET_COMPANY_LIST_FAIL,
    SET_PAGINATION_COMPANY,
    SET_LOGO_COMPANY,
  } from '../constants';
const initialState ={
    companyList: [],
    companyInfo: {
        logo: '',
    },
    pagination: {current: 1, pageSize: 10, total: 0},
    visible: false,
}

function companyReducer (state = initialState, action){
    switch(action.type){
        case GET_COMPANY_LIST_SUCCESS:{
            return{
                ...state,
                companyList: [
                    ...action.payload.newList,
                ],
                pagination: {
                    ...action.payload.pagination,
                   total: action.payload.count}
            };
        }
        case GET_COMPANY_LIST_FAIL:{
            return state;
        }
        case SET_PAGINATION_COMPANY:{
            return{
                ...state,
                pagination: action.payload
            };
        }
        case SET_LOGO_COMPANY:{
            return{
                ...state,
                companyInfo: {
                    ...state.companyInfo,
                    logo: action.payload, 
                }
            };
        }
        default: {
            return state;
        }
    }
}

export default companyReducer;