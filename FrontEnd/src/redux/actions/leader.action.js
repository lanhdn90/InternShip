import {
  GET_TASKS,
  GET_TASK_LIST,
  SET_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SEARCH_TASK_LIST,
  SET_PAGINATION,
  GET_QUESTION_LIST,
  SET_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  SEARCH_QUESTION_LIST,
  GET_COURSE_LIST,
  SET_COURSE,
  ACTIVE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  GET_COURSE_WITH_TASK_LIST,
  SET_COURSE_ID,

  GET_NEW_TASK_LIST,
  RESET_NEW_TASK_LIST,
  UPDATE_COURSE_WITH_TASK,

  GET_INTERNS_NO_COURSE,
  GET_INTERNS_HAVE_COURSE,
  SET_INTERNS_NO_COURSE,
  GET_NEW_COURSE_LIST,
  UPDATE_INTERNS_NO_COURSE,
  UPDATE_INTERNS_NO_COURSE_LIST,
  GET_COMPANY_OR_SCHOOL,
  GET_INTERNS_NO_COURSE_SCHOOL,
  GET_FACULTY_OF_SCHOOL,
  DELETE_INTERN,
  GET_COMPANY_OR_FACULTY,
  SET_PAGINATION_ONE,
  ACTIVE_USERNAME,
  GET_INTERNS_HAVE_COURSE_SCHOOL,
} from '../constants';

export const createTaskAction = (par)=>{
  return{
    type: SET_TASK,
    payload: par,
  }
}

export const getTaskListAction = (par)=>{
  return{
    type: GET_TASK_LIST,
    payload: par,
  }
}

export const deleteTaskAction = (par)=>{
  return{
    type: DELETE_TASK,
    payload: par,
  }
}

export const updateTaskAction = (par)=>{
  return{
    type: UPDATE_TASK,
    payload: par,
  }
}

export const searchTaskAction = (par)=>{
    return{
      type: SEARCH_TASK_LIST,
      payload: par,
    }
  }

export const selectTasksAction = (par)=>{
    return{
      type: GET_TASKS,
      payload: par,
    }
}

export const getQuestionListAction = (par)=>{
  console.log("🚀 ~ file: leader.action.js ~ line 14 ~ question ~ par", par)
    return{
      type: GET_QUESTION_LIST,
      payload: par,
    }
  }

export const setPageTableAction = (par)=>{
    return{
      type: SET_PAGINATION,
      payload: par,
    }
}

export const setQuestionAction = (par)=>{
    return{
      type: SET_QUESTION,
      payload: par,
    }
}

export const deleteQuestionAction = (par)=>{
  return{
    type: DELETE_QUESTION,
    payload: par,
  }
}

export const searchQuestionAction = (par)=>{
  return{
    type: SEARCH_QUESTION_LIST,
    payload: par,
  }
}

export const updateQuestionAction = (par)=>{
  return{
    type: UPDATE_QUESTION,
    payload: par,
  }
}

export const getCourseListAction = (par)=>{
  return{
    type: GET_COURSE_LIST,
    payload: par,
  }
}

export const setCourseAction = (par)=>{
    return{
      type: SET_COURSE,
      payload: par,
    }
  }

  
  export const updateCourseAction = (par)=>{
    return{
      type: UPDATE_COURSE,
      payload: par,
    }
  }

  export const deleteCourseAction = (par)=>{
    return{
      type: DELETE_COURSE,
      payload: par,
    }
  }

  export const activeCourseAction = (par)=>{
    return{
      type: ACTIVE_COURSE,
      payload: par,
    }
  }

  export const getCourseWithTaskListAction = (par)=>{
    return{
      type: GET_COURSE_WITH_TASK_LIST,
      payload: par,
    }
  }

  export const setCourseWithTaskListAction = (par)=>{
    return{
      type: SET_COURSE_ID,
      payload: par,
    }
  }

  export const getNewTaskListAction = (par)=>{
    return{
      type:  GET_NEW_TASK_LIST,
      payload: par,
    }
  }

  export const resetNewTaskListAction = (par)=>{
    return{
      type:  RESET_NEW_TASK_LIST,
      payload: par,
    }
  }

  export const updateCourseWithTaskAction = (par)=>{
    return{
      type: UPDATE_COURSE_WITH_TASK,
      payload: par,
    }
  }

  export const getInternNoCourseListAction = (par)=>{
    return{
      type: GET_INTERNS_NO_COURSE,
      payload: par,
    }
  }


  export const getNewCourseListAction = (par)=>{
    return{
      type: GET_NEW_COURSE_LIST,
      payload: par,
    }
  }

  export const updateInternNoCourseAction = (par)=>{
    return{
      type: UPDATE_INTERNS_NO_COURSE,
      payload: par,
    }
  }

  export const updateInternNoCourseListAction = (par)=>{
    return{
      type: UPDATE_INTERNS_NO_COURSE_LIST,
      payload: par,
    }
  }

  export const getCompanyOrSchoolAction = (par)=>{
    return{
      type: GET_COMPANY_OR_SCHOOL,
      payload: par,
    }
  }

  export const getInternNoSchoolAction = (par)=>{
    return{
      type: GET_INTERNS_NO_COURSE_SCHOOL,
      payload: par,
    }
  }

  export const getFacultyOfSchoolAction = (par)=>{
    return{
      type: GET_FACULTY_OF_SCHOOL,
      payload: par,
    }
  }

  export const deleteInternAction = (par)=>{
    return{
      type: DELETE_INTERN,
      payload: par,
    }
  }

  export const getCompanyOrFacultyAction = (par)=>{
    return{
      type: GET_COMPANY_OR_FACULTY,
      payload: par,
    }
  }

  export const createInternAction = (par)=>{
    return{
      type: SET_INTERNS_NO_COURSE,
      payload: par,
    }
  }

  export const getInternHaveCourseListAction = (par)=>{
    return{
      type: GET_INTERNS_HAVE_COURSE,
      payload: par,
    }
  }

  export const setPageOneTableAction = (par)=>{
    return{
      type: SET_PAGINATION_ONE,
      payload: par,
    }
}

export const activeUserNameAction = (par)=>{
  return{
    type: ACTIVE_USERNAME,
    payload: par,
  }
}


export const getInternSchoolAction = (par)=>{
  return{
    type: GET_INTERNS_HAVE_COURSE_SCHOOL,
    payload: par,
  }
}


