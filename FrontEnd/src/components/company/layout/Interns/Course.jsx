import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Form, Button, Col, Row, Input, Table, Tooltip, Space, Select,
   DatePicker, Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import {

    updateInternNoCourseAction,
    updateInternNoCourseListAction,
    getInternNoSchoolAction,
    setPageOneTableAction,
    getCompanyOrSchoolAction,
    deleteInternAction,
    activeUserNameAction,
  } from '../../../../redux/actions'
import Moment from 'react-moment';
import moment from 'moment'
Course.propTypes = {
    
};

function Course(props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const {
    setPageOne, 
    paginationOne,
    internsHaveCourse,
    courseList,
    organizationList,
    getInternHaveCourseList,
    updateInternNoCourse,
    role,
    personInfo,
    getInternNoSchool,
    facultyList,
    getCompanyOrSchool,
    deleteIntern,
    companyOrFaculty,
    activeUserName,
    getInternSchool,
    } = props;
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [courseId, setCourseId] = useState('')
  const [faculty, setFaculty] = useState('')
  const columns = [
    {
      title: 'Họ và Tên',
      width: 200,
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
      title: 'Ngày Sinh ',
      width:  110,
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
      width: role.isShow? 150 : 250,
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
      width: 110,
      render: (record) => (
        <Tooltip placement="topLeft" title={record.phone}>
          {record.phone}
        </Tooltip>
      ),
    },
    {
      title: 'Email',
      width: role.isShow? 190 : 290,
      ellipsis: {
        showTitle: false,
      },
      render: (record) => (
        <Tooltip placement="topLeft" title={record.email}>
          {record.email}
        </Tooltip>
      ),
    },
    {
      title: 'Kết quả',
      width: 90,
      ellipsis: {
        showTitle: false,
      },
      render: (record) => (
        <Tooltip placement="topLeft" title={record.result}>
          {record.result}
        </Tooltip>
      ),
    },
    role.isShow ?
    {
      title: 'Trạng thái',
      align: 'center',
      width: 200,
      render: ( record) =>(
        role.valRole?
        <Space size="middle">
          <Button block onClick={()=>onActiveIntern(record)} type="primary">{record.status ? "Active" :  "Block" }</Button>
        </Space>
        :
        <Space size="middle">
          <Button onClick={()=>onActiveIntern(record)} type="primary">{record.status ? "Active" :  "Block"}</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteIntern(record)}>
            <Button  type="danger">Delete</Button>
           </Popconfirm>  
        </Space>
      )
    }:{}
  ];


  const handleTableChange = (pagination) => {
    setPageOne(pagination);
    if(role.isShow){
      getInternHaveCourseList({...pagination, courseVal:false, company: personInfo.companyId})
    }else if(role.valRole){
      getInternHaveCourseList({...pagination, courseVal:false, faculty: personInfo.schoolId})
    }else if(faculty === ""){
      getInternSchool({...pagination, courseVal:false, company: personInfo.companyId})
    }else{
      getInternHaveCourseList({...pagination, courseVal:false, faculty: faculty})
    }
   };

   const onActiveIntern = (record) =>{
    const data = {
      paginationOne,
      internId: record.key,
      company: record.companyId,
      courseVal:false,
    };
    activeUserName(data);
    console.log(record.key);
   }

   const onDeleteIntern = (record) =>{
    deleteIntern({ current: 1, pageSize: 10, total: 0, courseVal:false, company: personInfo.companyId, internId: record.key})
    success()
   }

   const success = () => {
    message.success('Delete Intern success');
  };
  const setFacultyOfSchool = (value) =>{
    getCompanyOrSchool({school: value});
    getInternHaveCourseList({courseVal:false, current: 1, pageSize: 10, total: 0, faculty: value});
    setFaculty(value);
  }

  const setCompanyId = (value) =>{
    if(role.valRole){
      getInternHaveCourseList({courseVal:false, current: 1, pageSize: 10, total: 0, faculty: personInfo.schoolId, company: value})
    }else{
      getInternHaveCourseList({courseVal:false, current: 1, pageSize: 10, total: 0, faculty: faculty, company: value})
    }
  }

  const setInternOfCourse = (value) =>{
    getInternHaveCourseList({courseVal:false, current: 1, pageSize: 10, total: 0, company: personInfo.companyId, course: value})
  }


  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys([...selectedRowKeys]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const start = () => {
    setLoading(true);
    const data = {
     paginationOne,
     courseId: courseId,
     courseVal:true,
     selectedRowKeys,
   };
    // updateInternNoCourseList(data)
    console.log('selectedRowKeys: ', selectedRowKeys);
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000);
  };

    return (
            <>
            {personInfo.roleId === "6045cf1c83a38015cc63ccc2" ? 
              <div className='header_content'>
                <Select 
                  defaultValue="--------Course--------" 
                  style={{ width: 220, textAlign: 'center', marginRight: 10, marginLeft: 10 }} 
                  onChange={(value)=>setInternOfCourse(value)}>
                    {courseList.map(( item) =>
                      <Option key={item.key} value={item.key}> {item.courseName}</Option>
                    )}
                </Select>
                {/* <div>
                  <Button type="danger" style={{marginRight: 30}} onClick={() => start()} disabled={!hasSelected} loading={loading}>
                    DELETE
                  </Button>
                </div> */}
                
              </div>
              :personInfo.roleId === "6045cf1c83a38015cc63ccc3" ?
              <div className='header_content'>
                <Select 
                  defaultValue="--------Course--------" 
                  style={{ width: 220, textAlign: 'center', marginRight: 10, marginLeft: 10 }} 
                  onChange={(value)=>setInternOfCourse(value)}>
                    {courseList.map(( item) =>
                      <Option key={item.key} value={item.key}> {item.courseName}</Option>
                    )}
                </Select>
              </div>
              
              :personInfo.roleId === "6045cf1c83a38015cc63ccc5" ?
              <div className='header_content'>
                <Select 
                    defaultValue="--------Company--------" 
                    // disabled= {faculty === '' ? true : false}
                    style={{ width: 220, textAlign: 'center', marginRight: 10 }} 
                    onChange={(value)=>setCompanyId(value)}>
                    {organizationList.map(( item) =>
                        <Option key={item.key} value={item.key}> {item.name}</Option>
                    )}
                </Select>
              </div>
              :
              <div >
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
            pagination={paginationOne}
            loading={loading}
            onChange={handleTableChange}
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={internsHaveCourse} />
            </>
    );
}

const mapStateToProps = (state) => {
    const {paginationOne, courseList, companyOrFaculty, facultyList, organizationList} = state.leaderReducer;
    return {
      courseList: courseList,
      paginationOne: paginationOne,
      organizationList: organizationList,
      facultyList: facultyList,
      companyOrFaculty: companyOrFaculty,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      // getInternNoSchool: (params) => dispatch(getInternNoSchoolAction(params)),
      // updateInternNoCourse: (params) => dispatch(updateInternNoCourseAction(params)),
      // updateInternNoCourseList: (params) => dispatch(updateInternNoCourseListAction(params)),
      setPageOne: (params) => dispatch(setPageOneTableAction(params)),
      getCompanyOrSchool: (params) => dispatch(getCompanyOrSchoolAction(params)), 
      deleteIntern: (params) => dispatch(deleteInternAction(params)),
      activeUserName: (params) => dispatch(activeUserNameAction(params)),
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Course);
