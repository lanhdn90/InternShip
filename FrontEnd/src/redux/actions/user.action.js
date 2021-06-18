import {
    CHECK_USER,
    LOGOUT_USER,
    SET_IMAGE,
    UPDATE_USER,
    GET_PERSON_INFO,
    CHANGE_USER,
    SET_USER,
  } from '../constants';
  
  export const loginUser = (params) => {
      return {
        type: CHECK_USER,
        payload: params,
      }
    }
    
    export const logout = (params) => {
      return {
        type: LOGOUT_USER,
        payload: params,
      }
    }
    export const getUserName = (params) => {
      return {
        type: CHECK_USER,
        payload: params,
      }
    }
    
    export const setImagePersonAction = (params) => {
      return {
        type: SET_IMAGE,
        payload: params,
      }
    }

    export const updateUserNameAction = (params) => {
      return {
        type: UPDATE_USER,
        payload: params,
      }
    }

    export const getPersonInfoAction = (params) => {
      return {
        type: GET_PERSON_INFO,
        payload: params,
      }
    }

    export const changeUserNameAction = (params) => {
      return {
        type: CHANGE_USER,
        payload: params,
      }
    }

    export const createUserNameAction = (params) => {
      return {
        type: SET_USER,
        payload: params,
      }
    }




