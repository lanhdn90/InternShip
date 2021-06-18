import {
    GET_SCHOOL_LIST,
    SET_PAGINATION_SCHOOL,
    SET_SCHOOL,
    SET_LOGO_SCHOOL,
    ACTIVE_SCHOOL,
    EXTEND_SCHOOL,
    UPDATE_SCHOOL,
    DELETE_SCHOOL,
    SEARCH_SCHOOL_LIST,
  } from '../constants';

export const getSchoolListAction = (par) => {
    return {
        type: GET_SCHOOL_LIST,
        payload: par,
    }
}

export const setPageSchoolTable = (params) => {
    return {
      type: SET_PAGINATION_SCHOOL,
      payload: params,
    }
  }

export const createSchoolAction = (par)=>{
  return{
    type: SET_SCHOOL,
    payload: par,
  }
}

export const setLogoSchoolAction = (par)=>{
  return{
    type: SET_LOGO_SCHOOL,
    payload: par,
  }
}

export const activeSchoolAction = (par)=>{
  return{
    type: ACTIVE_SCHOOL,
    payload: par,
  }
}

export const extendSchoolAction = (par)=>{
  return{
    type: EXTEND_SCHOOL,
    payload: par,
  }
}

export const updateSchoolAction = (par)=>{
  return{
    type: UPDATE_SCHOOL,
    payload: par,
  }
}

export const deleteSchoolAction = (par)=>{
  return{
    type: DELETE_SCHOOL,
    payload: par,
  }
}

export const searchSchoolListAction = (par)=>{
  return{
    type: SEARCH_SCHOOL_LIST,
    payload: par,
  }
}