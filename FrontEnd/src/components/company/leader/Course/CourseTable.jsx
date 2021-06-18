import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button, Tooltip, Space,Select, Anchor,Popconfirm, message  } from 'antd';
import {
  setPageTableAction, 
  activeCourseAction,
  deleteCourseAction,
  setCourseWithTaskListAction,
} from '../../../../redux/actions'
import Moment from 'react-moment';
import moment from 'moment'

function CourseTable(props) {
  const {
    courseList, 
    pagination,
    getCourseList, 
    setPage, 
    activeCourse,
    personInfo,
    deleteCourse, 
    showEdit,
    courseId,
    setCourseWithTaskList,
    manage,
    } = props;
    const [loading, setLoading] = useState(false);

    const columns = [
    {
      title: 'Khóa Học',
      width: 170,
      defaultSortOrder: 'descend',
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.courseName}>
        <a className={ courseId === record._id ? "courseName" : "defaultName"} onClick={()=>handleClick(record._id) }>{record.courseName}</a>
      </Tooltip>
      ),
    },
    {
        title: 'Ngày bắt đầu',
        width: 130,
        align: 'center',
        render: (record) =>(
          <Space size="middle">
            <Moment className={ courseId === record._id ? "courseName" : "defaultName"}  date={moment(record.startDay)}  format="DD/MM/YYYY"/>
          </Space>
        ),
    },
    {
        title: 'Ngày kết thúc',
        width: 130,
        align: 'center',
        render: (record) =>(
          <Space size="middle">
            <Moment className={courseId === record._id ? "courseName" : "defaultName"}  date={moment(record.startDay).add(record.expiryDate,'M')}  format="DD/MM/YYYY"/>
          </Space>
        ),
    },
    {
      title: 'Hành động',
      align: 'center',
      render: (record) =>(
        <Space size="middle">
          <Button block onClick={()=>onActiveCourse(record)} type="primary">{record.status ? "Active" : "Block"}</Button>
          <Button onClick={()=>showEdit(record)} type="primary" disabled={manage? true : false}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteCourse(record)}>
            <Button disabled={manage? true : false} type="danger">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
    ];

    useEffect(() => {
      renderTable()
    }, [courseId])

  const handleTableChange = (pagination) => {
   setPage(pagination);
   if(personInfo.roleId === "6045cf1c83a38015cc63ccc3"){
     const person = personInfo._id;
     getCourseList({...pagination,person});
   }else{
     const company = personInfo.companyId;
     getCourseList({...pagination,company});
   }
   
  };

  const success = () => {
    message.success('delete Course success');
  };

  const handleClick = (val) => {
    setCourseWithTaskList(val);
};

  const onDeleteCourse = (record) =>{
    const data = {
      pagination: {current: 1, pageSize: 10, total: 0},
      courseId: record._id,
    };
    if(personInfo.roleId === "6045cf1c83a38015cc63ccc3"){
      data.person = personInfo._id;
    }else{
      data.company = personInfo.companyId;
    }
      success()
      deleteCourse(data);
  }

  const onActiveCourse = (record) =>{
    const data = {
      pagination: pagination,
      _id: record._id,
    };
    if(personInfo.roleId === "6045cf1c83a38015cc63ccc3"){
      data.person = personInfo._id;
    }else{
      data.company = personInfo.companyId;
    }
    activeCourse(data);
  }

  const renderTable =()=>{
    return (
      <div style={{ marginTop: 16 }}>
        <Table
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          columns={columns} 
          dataSource={courseList} />
      </div>
    );
  }

  return (
    <>
    {renderTable()}
    </>
  );
}

const mapStateToProps = (state) => {
  const { pagination, courseId,} = state.leaderReducer;
  return {
    pagination: pagination,
    courseId: courseId,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (params) => dispatch(setPageTableAction(params)),  
    setCourseWithTaskList: (params) => dispatch(setCourseWithTaskListAction(params)),  
    activeCourse: (params) => dispatch(activeCourseAction(params)),
    deleteCourse: (params) => dispatch(deleteCourseAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseTable);
