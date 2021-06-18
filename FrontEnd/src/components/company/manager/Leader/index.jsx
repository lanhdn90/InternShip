import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Drawer, Form, Button, Col, Row, Input, 
  message, DatePicker, InputNumber, Modal} from 'antd';
import Cookie from '../../../../utils/cookie.js';
import { PlusOutlined } from '@ant-design/icons';
import LeaderTable from './LeaderTable.jsx';
import CourseTable from './CourseTable.jsx';
import {
  getLeaderListAction, 
  setPageLeaderAction, 
  createLeaderAction,
  updateLeaderAction,
  getCourseLeaderAction,
} from '../../../../redux/actions'
import moment from 'moment';
function LeaderManage(props) {
  const cookie = new Cookie();
  const userName = cookie.get("userInfo");
  const personInfo = userName.personId;
  const person = personInfo._id;
  const {
    leaderList,
    getLeaderList,
    createLeader,
    courseList, 
    getCourseLeader,
    updateLeader,
    isShow,
    pagination,
  } = props;
  const [form] = Form.useForm();
  const [state, setState] = useState({ visible: false });
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [editLeader, setEditLeader] = useState({});
  const [leaderId, setLeaderId] = useState('')
  
  
  useEffect(async() => {
    getLeaderList({current: 1, pageSize: 10, total: 0});
  }, [])
  
  useEffect(() => {
    if(leaderList.length !== 0){
      setLeaderId(leaderList[0]._id)
    }
}, [leaderList])

  useEffect(() => {
    form.resetFields()
  }, [editLeader._id])

  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const showEdit = (val) => {
  console.log("🚀 ~ file: index.jsx ~ line 59 ~ showEdit ~ val", val)
    const newValue = {
      ...val,
      startDay: moment(val.startDay),
    }
    setEditLeader(newValue);
    setIsShowEdit(true);
    showDrawer()
}

  const onClose = () => {
    setState({
      visible: false,
    });
    setIsShowEdit(false);
    setEditLeader({});
    form.resetFields();
  };

  const addTodo = (values) => {
    if(isShowEdit){
      const personInf = {
        ...editLeader,
        ...values,
        companyId: editLeader.companyId._id,
        userId: editLeader._id,
      }      
      updateLeader({personInf})
      getLeaderList(pagination);    
    }else{
      values.companyId = userName.personId.companyId;
      values.roleId = "6045cf1c83a38015cc63ccc3";
      createLeader(values);    
      getLeaderList({current: 1, pageSize: 10, total: 0});
    }
    success()
    onClose();
  }

  const success = () => {
    if(isShowEdit){
      message.success('Edit Question success');
    }else{
      message.success('Create Question success');
    }
  };

  const renderHeaderCourse = () => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <Button type="primary" onClick={showDrawer}>
            <PlusOutlined /> New Leader
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
            initialValues={isShowEdit ? editLeader : {}}
            layout="vertical"
            hideRequiredMark
            onFinish={(values) => addTodo(values)}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input placeholder="Please enter your name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please enter your address' }]}
                >
                  <Input placeholder="Please enter your address" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                  <Input placeholder="Please enter your phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: 'please enter your Email',
                      },
                    ]}
                  >
                    <Input placeholder="please enter your Email" />
                  </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    )
  }



  return (
      <Row style={{ padding: 5 }} className={isShow ? 'hidden' : 'show'}>
        <Col span={16}>
          <div style={{ padding: 10 }}>
            <div className='heading' > DANH SÁCH HƯỚNG DẪN</div>
            {renderHeaderCourse()}
            <LeaderTable
              leaderList={leaderList}
              getLeaderList={getLeaderList}
              setLeaderId={setLeaderId}
              showEdit={showEdit}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className='heading' style={{marginTop: 10, marginBottom: 48}} > DANH SÁCH KHÓA HỌC</div>
          <CourseTable
            courseList={courseList}
            leaderId={leaderId}
            getCourseLeader={getCourseLeader}
            
          />
        </Col>
      </Row>
  );
}
const mapStateToProps = (state) => {
    const {courseList, leaderList, pagination} = state.managerReducer;
    const { userInfo} = state.userReducer;

    return {
      courseList: courseList,
      leaderList: leaderList,
      userInfo: userInfo,
      pagination: pagination,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getLeaderList: (params) => dispatch(getLeaderListAction(params)),
        setPage: (params) => dispatch(setPageLeaderAction(params)),  
        createLeader: (params) => dispatch(createLeaderAction(params)),
        updateLeader: (params) => dispatch(updateLeaderAction(params)),
        getCourseLeader: (params) => dispatch(getCourseLeaderAction(params)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LeaderManage);