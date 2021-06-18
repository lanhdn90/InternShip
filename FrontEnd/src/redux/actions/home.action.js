import {
    GET_COMPANY_LIST_HOME,
    GET_COURSE_LIST_HOME,
  } from '../constants';

export const getCompanyListHomeAction = (par) => {
    return {
        type: GET_COMPANY_LIST_HOME,
        payload: par,
    }
}

export const getCourseListHomeActin = (params) => {
    return {
      type: GET_COURSE_LIST_HOME,
      payload: params,
    }
  }

// export const createSchoolAction = (par)=>{
//   return{
//     type: SET_SCHOOL,
//     payload: par,
//   }
// }

// export const setLogoSchoolAction = (par)=>{
//   return{
//     type: SET_LOGO_SCHOOL,
//     payload: par,
//   }
// }

// export const activeSchoolAction = (par)=>{
//   return{
//     type: ACTIVE_SCHOOL,
//     payload: par,
//   }
// }

// export const extendSchoolAction = (par)=>{
//   return{
//     type: EXTEND_SCHOOL,
//     payload: par,
//   }
// }

// export const updateSchoolAction = (par)=>{
//   return{
//     type: UPDATE_SCHOOL,
//     payload: par,
//   }
// }

// export const deleteSchoolAction = (par)=>{
//   return{
//     type: DELETE_SCHOOL,
//     payload: par,
//   }
// }

// export const searchSchoolListAction = (par)=>{
//   return{
//     type: SEARCH_SCHOOL_LIST,
//     payload: par,
//   }
// }