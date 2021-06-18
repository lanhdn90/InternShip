import {
    GET_LEADER_LIST_SUCCESS,
    GET_LEADER_LIST_FAIL,
    SET_PAGINATION_LEADER,
    SET_LOGO_LEADER,
    GET_COURSE_LEADER_LIST_SUCCESS,
    GET_LEADERS_SUCCESS,
  } from '../constants';
const initialState ={
    leaderSelect: [],
    leaderList: [],
    courseList:[],
    leaderInfo: {
        logo: '',
    },
    pagination: {current: 1, pageSize: 10, total: 0},
    visible: false,
}

function managerReducer (state = initialState, action){
    switch(action.type){
        case GET_LEADER_LIST_SUCCESS:{
            return{
                ...state,
                leaderList: [
                    ...action.payload.newList,
                ],
                pagination: {
                    ...action.payload.pagination,
                   total: action.payload.count}
            };
        }
        case GET_LEADERS_SUCCESS:{
            return {
                ...state,
                leaderSelect: [...action.payload]
            };
        }
        case GET_LEADER_LIST_FAIL:{
            return state;
        }
        case SET_PAGINATION_LEADER:{
            return{
                ...state,
                pagination: action.payload
            };
        }
        case SET_LOGO_LEADER:{
            return{
                ...state,
                leaderInfo: {
                    ...state.leaderInfo,
                    logo: action.payload, 
                }
            };
        }
        
        case GET_COURSE_LEADER_LIST_SUCCESS:{
            return{
                ...state,
                courseList: [...action.payload]
            };
        }
        default: {
            return state;
        }
    }
}

export default managerReducer;