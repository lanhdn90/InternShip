import {
    GET_FACULTY_LIST,
    SET_PAGINATION_FACULTY,
    ACTIVE_FACULTY,
    SEARCH_FACULTY_LIST,
    SET_FACULTY,
    UPDATE_FACULTY,
    DELETE_FACULTY,
  } from '../constants';

export const getFacultyListAction = (par) => {
    return {
        type: GET_FACULTY_LIST,
        payload: par,
    }
}

export const setPageFacultyTable = (params) => {
    return {
      type: SET_PAGINATION_FACULTY,
      payload: params,
    }
  }

export const createFacultyAction = (par)=>{
  return{
    type: SET_FACULTY,
    payload: par,
  }
}

export const activeFacultyAction = (par)=>{
  return{
    type: ACTIVE_FACULTY,
    payload: par,
  }
}

export const updateFacultyAction = (par)=>{
  return{
    type: UPDATE_FACULTY,
    payload: par,
  }
}

export const deleteFacultyAction = (par)=>{
  return{
    type: DELETE_FACULTY,
    payload: par,
  }
}

export const searchFacultyListAction = (par)=>{
  return{
    type: SEARCH_FACULTY_LIST,
    payload: par,
  }
}