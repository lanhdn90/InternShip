import {
    GET_INTERN_INFO,
    GET_QUESTION_TEST,
    UPDATE_QUESTION_TEST,
    UPDATE_INTERN_INFO
  } from '../constants';

export const getInternInfoAction = (par) => {
    return {
        type: GET_INTERN_INFO,
        payload: par,
    }
}

export const getQuestionTestAction = (params) => {
    return {
      type: GET_QUESTION_TEST,
      payload: params,
    }
  }

export const updateQuestionTestAction = (par)=>{
  return{
    type: UPDATE_QUESTION_TEST,
    payload: par,
  }
}

export const updateInternInfAction = (par)=>{
  return{
    type: UPDATE_INTERN_INFO,
    payload: par,
  }
}

// export const setLogoCompanyAction = (par)=>{
//   return{
//     type: SET_LOGO_COMPANY,
//     payload: par,
//   }
// }

// export const activeCompanyAction = (par)=>{
//   return{
//     type: ACTIVE_COMPANY,
//     payload: par,
//   }
// }

// export const extendCompanyAction = (par)=>{
//   return{
//     type: EXTEND_COMPANY,
//     payload: par,
//   }
// }

// export const updateCompanyAction = (par)=>{
//   return{
//     type: UPDATE_COMPANY,
//     payload: par,
//   }
// }

// export const deleteCompanyAction = (par)=>{
//   return{
//     type: DELETE_COMPANY,
//     payload: par,
//   }
// }

// export const searchCompanyListAction = (par)=>{
//   return{
//     type: SEARCH_COMPANY_LIST,
//     payload: par,
//   }
// }