import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import { Drawer, Form, Button, Col, Row, Input, Table, Tooltip, Space, Select,
  Popconfirm, message, DatePicker } from 'antd';
import {
//   getCompanyListAction, 
//   setPageCompanyTable, 
//   activeCompanyAction,
//   deleteCompanyAction,
  updateInternNoCourseAction,
  updateInternNoCourseListAction,
  setPageTableAction,
  getInternNoSchoolAction,
  getCompanyOrSchoolAction,
  deleteInternAction,
  createInternAction,
} from '../../../../redux/actions'
import Moment from 'react-moment';
import moment from 'moment'


function NoCourse(props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const {
    setPage, 
    pagination,
    internsNoCourse,
    courseList,
    organizationList,
    getInternNoCourseList,
    updateInternNoCourse,
    updateInternNoCourseList,
    role,
    personInfo,
    getInternNoSchool,
    facultyList,
    getCompanyOrSchool,
    deleteIntern,
    createIntern,
    companyOrFaculty,
    } = props;
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [courseId, setCourseId] = useState('')
  const [faculty, setFaculty] = useState('')
  const [state, setState] = useState({ visible: false });
  const [editQuestion, setEditQuestion] = useState({});
  const [keySearch, setKeySearch] = useState('');
  const [isShowEdit, setIsShowEdit] = useState(false);    
  const columns = [
    {
      title: 'Họ và tên',
      width: 180,
      defaultSortOrder: 'descend',
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.fullName}>
        <a href={record.website} target="_blank">{record.fullName}</a>
      </Tooltip>
      ),
    },
    {
      title: 'Ngày sinh ',
      width: 110,
      ellipsis: {
        showTitle: false,
      },
      render: (record) => (
        <Space size="middle">
          <Moment   date={moment(record.birthday)}  format="DD/MM/YYYY"/>
        </Space>
      ),
    },
    {
      title: 'Địa chỉ',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (record) => (
        <Tooltip placement="topLeft" title={record.address}>
          {record.address}
        </Tooltip>
      ),
    },
    {
      title: 'Phone',
      width: 120,
      render: (record) => (
        <Tooltip placement="topLeft" title={record.phone}>
          {record.phone}
        </Tooltip>
      ),
    },
    {
      title: 'Email',
      width: 190,
      ellipsis: {
        showTitle: false,
      },
      render: (record) => (
        <Tooltip placement="topLeft" title={record.email}>
          {record
          .email}
        </Tooltip>
      ),
    },
    {
      title: 'Hành động',
      align: 'center',
      render: ( record) =>(
        role.isShow ?
        <Space size="middle">
          <Select defaultValue="--Course--" 
          style={{ width: 190 }} 
          onChange={(value)=>setCourseId(value)}>
            {courseList.map((item) =>
              <Option key={item.key} value={item.key}> {item.courseName}</Option>
            )}
          </Select>
          <Button onClick={()=>onUpdateIntern(record)} type="primary">Customized</Button>
        </Space>
        :
        <Space size="middle" style={{display:'flex', justifyContent: 'center'}}>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteIntern(record)}>
            <Button  type="danger">Delete</Button>
           </Popconfirm>
        </Space>
        
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPage(pagination);
    if(role.isShow){
      getInternNoCourseList({...pagination, courseVal:true, company: personInfo.companyId})
    }else if(role.valRole){
      getInternNoCourseList({...pagination, courseVal:true, faculty: personInfo.schoolId})
    }else if(faculty === ""){
      getInternNoSchool({...pagination, courseVal:true, company: personInfo.companyId})
    }else{
      getInternNoCourseList({...pagination, courseVal:true, faculty: faculty})
    }
   };
  
   const onUpdateIntern = (record) =>{
    const data = {
      pagination,
      internId: record.key,
      companyId: record.companyId,
      courseVal:true,
      internInf:{
        courseId: courseId
      }
    };
    updateInternNoCourse(data);
    console.log(record.key);
   }
 
   const onDeleteIntern = (record) =>{
    deleteIntern({ current: 1, pageSize: 10, total: 0, courseVal:true, faculty: personInfo.schoolId, internId: record.key})
    success()
   }

   const success = () => {
    message.success('Delete Intern success');
  };

  const addSuccess = () => {
    message.success('Create Intern success');
  };

   const start = () => {
     setLoading(true);
     const data = {
      pagination,
      courseId: courseId,
      courseVal:true,
      selectedRowKeys,
    };
     updateInternNoCourseList(data)
     setTimeout(() => {
       setSelectedRowKeys([])
       setLoading(false)
     }, 1000);
   };
 
   const onSelectChange = (selectedRowKeys) => {
     console.log('selectedRowKeys changed: ', selectedRowKeys);
     setSelectedRowKeys([...selectedRowKeys]);
   };
 
   const rowSelection = {
     selectedRowKeys,
     onChange: onSelectChange,
   };
   const hasSelected = selectedRowKeys.length > 0;
  
  const setFacultyOfSchool = (value) =>{
    getCompanyOrSchool({school: value});
    getInternNoCourseList({courseVal:true, current: 1, pageSize: 10, total: 0, faculty: value})
    setFaculty(value);
  }

  const setCompanyId = (value) =>{
    if(role.valRole){
      getInternNoCourseList({courseVal:true, current: 1, pageSize: 10, total: 0, faculty: personInfo.schoolId, company: value})
    }else{
      getInternNoCourseList({courseVal:true, current: 1, pageSize: 10, total: 0, faculty: faculty, company: value})
    }

  }

  useEffect(() => {
    form.resetFields();
}, [editQuestion._id])


const showDrawer = () => {
    setState({
        visible: true,
    });
};

const showEdit = (val) => {
    setIsShowEdit(true);
    showDrawer()
    setEditQuestion(val);
}

const onClose = () => {
    setState({
        visible: false,
    });
    setIsShowEdit(false);
    setEditQuestion({});
    form.resetFields();
};

const addIntern = (values) => {
  
  values.roleId = "6045cf1c83a38015cc63ccc6"
  values.birthday = values.birthday._d
  if(role.isShow){
    values.companyId = personInfo.companyId
  }else{
    values.schoolId = personInfo.schoolId
  }
  const par= {
    current: 1,
    pageSize: 10,
    internIfo: values,
    courseVal: true,
    role: personInfo.roleId,
  }
  createIntern(par)
  addSuccess()
  onClose();
}

const searchQuestionList = (val) => {
    setKeySearch(val)
}


  const renderDrawer = () =>{
    return(
      <Drawer
        title={isShowEdit ? "Edit Question" : "Create a new Question"}
        width={720}
        onClose={onClose}
        visible={state.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{textAlign: 'right',}} >
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
        // initialValues={isShowEdit ? editQuestion : {}}
        layout="vertical"
        hideRequiredMark
        onFinish={(values) => addIntern(values)}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='fullName'
              label="Họ và Tên: "
              rules={[{ required: true, message: 'Please enter Full Name' }]}
            >
              <Input placeholder="Please enter Full Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthday"
                label="Ngày sinh: "
              >
                <DatePicker/>
              </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="gender"
                    label="Giới Tính:"
                >
                  <Select 
                  defaultValue="--------Giới Tính--------" 
                  style={{ width: 200, textAlign: 'center'}} 
                  onChange={(value)=>setCourseId(value)}>
                    <Select.Option value="Male">Nam</Select.Option>
                    <Select.Option value="Female">Nữ</Select.Option>
                    <Select.Option value="Gay">Đồng tính</Select.Option>
                  </Select>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={24}>
                <Form.Item
                    name="address"
                    label="Địa chỉ: "
                    rules={[{ required: true, message: 'Please enter Address' }]}
                >
                    <Input.TextArea placeholder="Please enter Address" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone: "
                  rules={[{ required: true, message: 'Please enter Phone' }]}
                >
                  <Input placeholder="Please enter Phone" />
                </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email:"
                rules={[{ required: true, message: 'Please enter Email' }]}
              >
                <Input placeholder="Please enter Email" />
              </Form.Item>
            </Col>
        </Row>
        <Row gutter={16}>
          {!role.isShow && role.valRole? 
            <Col span={12}>
              <Form.Item
                name="companyId"
                label="Công ty : "
              >
                <Select
                  defaultValue={isShowEdit ? "editQuestion.taskId.taskName" : "--- Công ty ---"}
                  style={{width: 220, textAlign: 'center'}}
                >
                  {companyOrFaculty.map((item) => (
                  <Option key={item.key} value={item.key}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          :
            <Col span={12}>
              <Form.Item
                name="schoolId"
                label="Khóa - Nhà trường :"
              >
                <Select
                  defaultValue={isShowEdit ? "editQuestion.taskId.taskName" : "--- Khoa - Trường ---"}
                  style={{width: 220, textAlign: 'center'}}
                >
                  {companyOrFaculty.map((item) => (
                  <Option key={item.key} value={item.key}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          }
 
        </Row>
      </Form>
      </Drawer>
    );
  }


  return (
    <div>
      {role.isShow ?
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={showDrawer}>
          INSERT 
        </Button>
        <div style={{marginRight: 15}}>
          <Select 
          defaultValue="--------Course--------" 
          style={{ width: 220, textAlign: 'center', marginRight: 10, marginLeft: 10 }} 
          onChange={(value)=>setCourseId(value)}>
              {courseList.map(( item) =>
                <Option key={item.key} value={item.key}> {item.courseName}</Option>
              )}
          </Select>
          <Button type="primary" onClick={() => start()} disabled={!hasSelected} loading={loading}>
            CUSTOMIZED
          </Button>

        </div>
        {renderDrawer()}
      </div>
      : role.valRole?
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button type="primary" onClick={showDrawer}  style={{marginRight: 10 }} >
            INSERT
          </Button>
          <Select 
            defaultValue="--------Company--------" 
            style={{ width: 220, textAlign: 'center', marginRight: 10 }} 
            onChange={(value)=>setCompanyId(value)}>
              {organizationList.map(( item) =>
                <Option key={item.key} value={item.key}> {item.name}</Option>
              )}
          </Select>
          {/* <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span> */}
          {renderDrawer()}
        </div>
        {/* <Button type="danger" style={{marginRight: 10}} onClick={() => start()} disabled={!hasSelected} loading={loading}>
            DELETE
        </Button> */}
        
      </div>
      :
      <div style={{ marginBottom: 16, display: 'flex' }}>
        <Select 
        defaultValue="--------Faculty--------" 
        style={{ width: 220, textAlign: 'center', marginRight: 10 }} 
        onChange={(value)=>setFacultyOfSchool(value)}>
            {facultyList.map(( item) =>
              <Option key={item.key} value={item.key}> {item.name}</Option>
            )}
        </Select>
        <Select 
        defaultValue="--------Company--------" 
        disabled= {faculty === '' ? true : false}
        style={{ width: 220, textAlign: 'center', marginRight: 10 }} 
        onChange={(value)=>setCompanyId(value)}>
            {organizationList.map(( item) =>
              <Option key={item.key} value={item.key}> {item.name}</Option>
            )}
        </Select>
      </div>
      }
      <Table
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={internsNoCourse} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const {pagination, courseList, companyOrFaculty, facultyList, organizationList} = state.leaderReducer;
  return {
    courseList: courseList,
    pagination: pagination,
    organizationList: organizationList,
    facultyList: facultyList,
    companyOrFaculty: companyOrFaculty,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInternNoSchool: (params) => dispatch(getInternNoSchoolAction(params)),
    updateInternNoCourse: (params) => dispatch(updateInternNoCourseAction(params)),
    setPage: (params) => dispatch(setPageTableAction(params)),
    getCompanyOrSchool: (params) => dispatch(getCompanyOrSchoolAction(params)), 
    updateInternNoCourseList: (params) => dispatch(updateInternNoCourseListAction(params)),
    deleteIntern: (params) => dispatch(deleteInternAction(params)),
    createIntern: (params) => dispatch(createInternAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoCourse);
