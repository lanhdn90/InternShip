import {
    GET_COMPANY_LIST,
    SET_PAGINATION_COMPANY,
    SET_COMPANY,
    SET_LOGO_COMPANY,
    ACTIVE_COMPANY,
    EXTEND_COMPANY,
    UPDATE_COMPANY,
    DELETE_COMPANY,
    SEARCH_COMPANY_LIST,
  } from '../constants';

export const getCompanyListAction = (par) => {
    return {
        type: GET_COMPANY_LIST,
        payload: par,
    }
}

export const setPageCompanyTable = (params) => {
    return {
      type: SET_PAGINATION_COMPANY,
      payload: params,
    }
  }

export const createCompanyAction = (par)=>{
  return{
    type: SET_COMPANY,
    payload: par,
  }
}

export const setLogoCompanyAction = (par)=>{
  return{
    type: SET_LOGO_COMPANY,
    payload: par,
  }
}

export const activeCompanyAction = (par)=>{
  return{
    type: ACTIVE_COMPANY,
    payload: par,
  }
}

export const extendCompanyAction = (par)=>{
  return{
    type: EXTEND_COMPANY,
    payload: par,
  }
}

export const updateCompanyAction = (par)=>{
  return{
    type: UPDATE_COMPANY,
    payload: par,
  }
}

export const deleteCompanyAction = (par)=>{
  return{
    type: DELETE_COMPANY,
    payload: par,
  }
}

export const searchCompanyListAction = (par)=>{
  return{
    type: SEARCH_COMPANY_LIST,
    payload: par,
  }
}