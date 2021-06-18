import {
    GET_TASK_LIST_SUCCESS,
    GET_TASK_LIST_FAIL,
    SET_PAGINATION,
    GET_TASKS_SUCCESS,
    GET_QUESTION_LIST_SUCCESS,
    GET_QUESTION_LIST_FAIL,
    GET_COURSE_LIST_SUCCESS,
    GET_COURSE_LIST_FAIL,
    GET_COURSE_TASK_SUCCESS,
    SET_COURSE_ID ,
    GET_NEW_TASK_LIST_SUCCESS,
    RESET_NEW_TASK_LIST,
    GET_INTERNS_NO_COURSE_SUCCESS,


    GET_NEW_COURSE_LIST_SUCCESS,
    GET_COMPANY_OR_SCHOOL_SUCCESS,
    GET_FACULTY_OF_SCHOOL_SUCCESS,
    GET_COMPANY_OR_FACULTY_SUCCESS,
    SET_PAGINATION_ONE,
    GET_INTERNS_HAVE_COURSE_SUCCESS,
  } from '../constants';

const initialState ={
    pagination: {},
    paginationOne: {},
    leaderInfo: {
        logo: '',
    },
    QuestionInfo: {
    },
    visible: false,
    courseId:'',

    taskList: [],
    selectTask: [],
    questionList: [],
    courseList:[],
    courseWithTaskList: [],
    organizationList: [],
    companyOrFaculty: [],
    facultyList: [],

    notInCourseWithTask: [],
    internsNoCourse: [],
    internsHaveCourse: [],
}
function leaderReducer (state = initialState, action){
    switch(action.type){
        case GET_TASK_LIST_SUCCESS:{
            return{
                ...state,
                taskList: [
                    ...action.payload.newList,
                ],
                pagination: {
                    ...action.payload.pagination,
                   total: action.payload.count}
            };
        }
        case GET_TASK_LIST_FAIL:{
            return state;
        }
        case SET_PAGINATION:{
            return{
                ...state,
                pagination: action.payload
            };
        }
        case SET_PAGINATION_ONE:{
            return{
                ...state,
                paginationOne: action.payload
            };
        }
        case GET_NEW_TASK_LIST_SUCCESS:{
            return{
                ...state,
                notInCourseWithTask: action.payload
            };
        }
        case RESET_NEW_TASK_LIST:{
            return{
                ...state,
                notInCourseWithTask: [],
                taskList: [],
            };
        }
        case GET_TASKS_SUCCESS:{
            return{
                ...state,
                selectTask: [
                    ...action.payload,
                ],
            };
        }
        case GET_QUESTION_LIST_SUCCESS:{
            return{
                ...state,
                questionList: [
                    ...action.payload.newList,
                ],
                pagination: {
                    ...action.payload.pagination,
                   total: action.payload.count}
            };
        }
        case GET_QUESTION_LIST_FAIL:{
            return state;
        }
        case GET_COURSE_LIST_SUCCESS:{
            return{
                ...state,
                courseList: [
                    ...action.payload.newList,
                ],
                pagination: {
                    ...action.payload.pagination,
                   total: action.payload.count
                },
            }
        }
        case SET_COURSE_ID :{
            return{
                ...state,
                courseId: action.payload
            };
        }
        case GET_COURSE_LIST_FAIL:{
            return state;
        }
        case GET_COURSE_TASK_SUCCESS:{
            return{
                ...state,
                courseWithTaskList: [
                    ...action.payload,
                ],
            };
        }
        case GET_COMPANY_OR_FACULTY_SUCCESS:{
            return{
                ...state,
                companyOrFaculty: [
                    ...action.payload,
                ],
            };
        }
        case GET_INTERNS_NO_COURSE_SUCCESS:{
            return{
                ...state,
                internsNoCourse: [
                    ...action.payload.newList,
                ],
                pagination: {
                    ...action.payload.pagination,
                   total: action.payload.data.count}
            };
        }
        case GET_INTERNS_HAVE_COURSE_SUCCESS:{
            return{
                ...state,
                internsHaveCourse: [
                    ...action.payload.newList,
                ],
                paginationOne: {
                    ...action.payload.pagination,
                   total: action.payload.data.count}
            };
        }
        case GET_NEW_COURSE_LIST_SUCCESS:{
            return{
                ...state,
                courseList: [
                    ...action.payload
                ],
            };
        }
        case GET_COMPANY_OR_SCHOOL_SUCCESS:{
            return{
                ...state,
                organizationList: [
                    ...action.payload
                ],
            };
        }
        case GET_FACULTY_OF_SCHOOL_SUCCESS:{
            return{
                ...state,
                facultyList: [
                    ...action.payload,
                ],
            };
        }
        default: {
            return state;
        }
    }
}

export default leaderReducer;