import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button, Tooltip, Space,
  Select,Modal, Popconfirm, message  } from 'antd';
import ReactPlayer from 'react-player'
import {
  setPageFacultyTable, 
  activeFacultyAction,

  deleteFacultyAction,
} from '../../../redux/actions';
import Moment from 'react-moment';
import moment from 'moment'


function TestTable(props) {   
  const { Option } = Select;
  const {
    personInfo,
    getFacultyList,
    facultyList,
    setPage,
    pagination,
    activeFaculty, 

    deleteFaculty, 
    showEdit,
    keySearch,
    manage,
    selectTaskId,
    } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFacultyList({current: 1, pageSize: 10, total: 0, keySearch, company: personInfo.companyId});
  }, []);

  const columns = [
    {
      title: 'Name',
      width: 220,
      defaultSortOrder: 'descend',
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.name}>
        <a href={record.website} target="_blank">{record.name}</a>
      </Tooltip>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: 120
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: email => (
        <Tooltip placement="topLeft" title={email}>
          {email}
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      width: 100,
      align: 'center',
      render: (record) =>(
        <Space size="middle">
          <Button block onClick={()=>onActiveOrgan(record)} type="primary">{record.status ? "Active" : "Block"}</Button>
        </Space>
      ),    
    },
    {
      title: 'Action',
      align: 'center',
      render: (record) =>(
        <Space size="middle">
          <Button onClick={()=>showEdit(record)} type="primary">Edit</Button>
           <Popconfirm placement="bottomLeft" title="Sure to delete?" onConfirm={() => onDeleteFaculty(record)}>
            <Button  type="danger">Delete</Button>
           </Popconfirm>
        </Space>
      ),
    },
  ];



  const onActiveOrgan = (record) =>{
    const data = {
      pagination,
      _id: record.key,
      company: personInfo.companyId,
    };
    activeFaculty(data);
    // console.log(record.key);
  }

  const handleTableChange = (pagination) => {
    setPage(pagination);
    getFacultyList({...pagination,  keySearch, company: personInfo.companyId});
  };


  const onDeleteFaculty = (record) =>{
    const data = {
      pagination: {current: 1, pageSize: 10, total: 0},
      schoolId: record.key,
      company: personInfo.companyId,
    };
    deleteFaculty(data);
  }

  return (
    <div>
      <Table
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        columns={columns} 
        dataSource={facultyList} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { facultyList} = state.facultyReducer;
  return {
    facultyList: facultyList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeFaculty: (params) => dispatch(activeFacultyAction(params)),
    setPage: (params) => dispatch(setPageFacultyTable(params)),

    deleteFaculty: (params) => dispatch(deleteFacultyAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestTable);
