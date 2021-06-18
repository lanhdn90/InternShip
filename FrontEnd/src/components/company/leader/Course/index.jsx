import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Drawer, Form, Button, Col, Row, Input, DatePicker,message, InputNumber, Modal, TextArea} from 'antd';
import Cookie from '../../../../utils/cookie.js';
import { PlusOutlined } from '@ant-design/icons';
import CourseTable from './CourseTable.jsx';
import TasksTable from './TasksTable.jsx';
import TestComponent from './Updata.jsx';
import {
  getCourseListAction,
  setCourseAction,
  getNewTaskListAction,
  resetNewTaskListAction,
  updateCourseWithTaskAction,
  updateCourseAction,
  getCourseWithTaskListAction,

} from '../../../../redux/actions'
import moment from 'moment';
function Course(props) {
  const cookie = new Cookie();
  const userName = cookie.get("userInfo");
  const personInfo = userName.personId;
  const person = personInfo._id;
  const {
    courseList, 
    getCourseList,
    isShow,
    createCourse,
    updateCourse,
    courseId,
    getNewTaskList,
    resetNewTaskList,
    updateCourseWithTask,
    courseWithTaskList,
    getCourseWithTaskList,
    pagination,
  } = props;
  const [form] = Form.useForm();
  const [state, setState] = useState({ visible: false });
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [editCourse, setEditCourse] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCourseWithTasks, setNewCourseWithTasks] = useState([]);
  const [manage, setManage] = useState(false)


  useEffect(async() => {
    if(personInfo.roleId === "6045cf1c83a38015cc63ccc3"){
      await getCourseList({current: 1, pageSize: 10, total: 0, person }) 
    }else{
      await getCourseList({current: 1, pageSize: 10, total: 0, company: personInfo.companyId })
      setManage(true) 
    } 
  }, [])

  useEffect(() => {
    if(courseId !==""){
      getCourseWithTaskList(courseId)
      getNewTaskList({person, courseId});
    }
}, [courseId])

  useEffect(() => {
    form.resetFields()
  }, [editCourse._id])

  const handleClick = (val) => {
    courseId = val;
  };

  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const showEdit = (val) => {
    const newValue = {
      ...val,
      startDay: moment(val.startDay),
    }
    setEditCourse(newValue);
    setIsShowEdit(true);
    showDrawer()
}

  const onClose = () => {
    setState({
      visible: false,
    });
    setIsShowEdit(false);
    setEditCourse({});
    form.resetFields();
  };

  const addTodo = (values) => {
    if(personInfo.roleId === "6045cf1c83a38015cc63ccc3"){
      values.personId  = personInfo._id
    }
    values.companyId = personInfo.companyId;
    if(isShowEdit){
        const par = {
          pagination,
          courseInf: values,
          courseId: editCourse._id,
        }
        updateCourse(par)
    }else{
      createCourse(values);
    }
    onClose();
    success();
  }

  const success = () => {
    if(isShowEdit){
      message.success('Edit Course success');
    }else{
      message.success('Create Course success');
    }
  };

  const renderHeaderCourse = () => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <Button type="primary" onClick={showDrawer} disabled={manage? true : false}>
            <PlusOutlined /> New Course
          </Button>
        </div>
        <Drawer
          title={isShowEdit ? "Edit Leader" : "Create a new Leader"}
          width={720}
          onClose={onClose}
          visible={state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={() => form.submit()} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form
            form={form}
            initialValues={isShowEdit ? editCourse : {}}
            layout="vertical"
            hideRequiredMark
            onFinish={(values) => addTodo(values)}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="courseName"
                  label="Khóa học: "
                  rules={[{ required: true, message: 'Please enter course name' }]}
                >
                  <Input placeholder="Please enter course name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="startDay"
                  label="Ngày bắt đầu: "
                >
                  <DatePicker/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                    name="expiryDate"
                    label="Thời gian: "
                    rules={[
                      {
                        required: true,
                        message: 'please enter expiryDate',
                      },
                    ]}
                    
                  >
                    <InputNumber  placeholder="please enter expiryDate" />
                  </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Ghi chứ: "
                  rules={[{ required: true, message: 'Please enter description' }]}
                >
                  <Input.TextArea placeholder="Please enter description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    )
  }

//modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {

    setIsModalVisible(false);
  };

  const handleOk = () => {
    updateCourseWithTask({courseId, newCourseWithTasks, person })
    resetNewTaskList();
    setIsModalVisible(false);
  };

  const renderModal=()=>{
    return(
      <>
      <Modal 
       title="Cập nhật danh sách môn học" 
       visible={isModalVisible}
       onOk={handleOk} 
       onCancel={handleCancel}
       width={1000}
       >
        <TestComponent
        setNewCourseWithTasks={setNewCourseWithTasks}
        />
      </Modal>

      </>
    );
  }

  return (
      <Row style={{ padding: 5,  height: "calc(100vh - 74px)" }} className={isShow ? 'hidden' : 'show'}>
        <Col span={15}>
          <div style={{ padding: 10 }}>
            <div className='heading' > DANH SÁCH KHÓA HỌC</div>
            {renderHeaderCourse()}
            <CourseTable
              courseList={courseList}
              personInfo={personInfo}
              getCourseList={getCourseList}
              showEdit={showEdit}
              handleClick={handleClick}
              manage={manage}
            />
          </div>
        </Col>
        <Col span={9}>
          <div className='heading' > DANH SÁCH BÀI HỌC</div>
          <Button type="primary" onClick={showModal} disabled={manage? true : false}>
            Update
          </Button>
          {renderModal()}
          <TasksTable
            courseId={courseId}
            courseWithTaskList={courseWithTaskList}
          />
        </Col>
      </Row>
  );
}
const mapStateToProps = (state) => {
    const { courseList,  courseId, pagination ,courseWithTaskList} = state.leaderReducer;
    return {
      courseWithTaskList: courseWithTaskList,
      courseList: courseList,
      courseId: courseId,
      pagination: pagination,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getCourseList: (params) => dispatch(getCourseListAction(params)),
      createCourse: (params) => dispatch(setCourseAction(params)),
      updateCourse: (params) => dispatch(updateCourseAction(params)),
      getCourseWithTaskList: (params) => dispatch(getCourseWithTaskListAction(params)),
      updateCourseWithTask: (params) => dispatch(updateCourseWithTaskAction(params)),
      getNewTaskList: (params) => dispatch(getNewTaskListAction(params)),
      resetNewTaskList: (params) => dispatch(resetNewTaskListAction(params)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Course);