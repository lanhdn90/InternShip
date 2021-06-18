import {
    GET_LEADER_LIST,
    SET_LEADER,
    SET_PAGINATION_LEADER,
    ACTIVE_LEADER,
    UPDATE_LEADER,
    GET_COURSE_LEADER_LIST,
    GET_LEADERS,
    DELETE_LEADER,
  } from '../constants';

export const getLeaderListAction = (par) => {
console.log("🚀 ~ file: manager.action.js ~ line 7 ~ getLeaderListAction ~ par", par)
    return {
        type: GET_LEADER_LIST,
        payload: par,
    }
}

export const createLeaderAction = (par) => {
    return {
        type: SET_LEADER,
        payload: par,
    }
}
export const setPageLeaderAction = (params) => {
    return {
      type: SET_PAGINATION_LEADER,
      payload: params,
    }
  }

  export const activeLeaderAction = (par)=>{
    return{
      type: ACTIVE_LEADER,
      payload: par,
    }
  }

  export const getCourseLeaderAction = (par)=>{
    return{
      type: GET_COURSE_LEADER_LIST,
      payload: par,
    }
  }


  export const updateLeaderAction = (par)=>{
    return{
      type: UPDATE_LEADER,
      payload: par,
    }
  }
  
  export const getLeaderSelectAction = (par)=>{
    return{
      type: GET_LEADERS,
      payload: par,
    }
  }

  export const deleteLeaderAction = (par)=>{
    return{
      type: DELETE_LEADER,
      payload: par,
    }
  }



