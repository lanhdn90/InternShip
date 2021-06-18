import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button, Tooltip, Space,Select ,
  Popconfirm, message} from 'antd';
import {
  getSchoolListAction, 
  setPageSchoolTable, 
  activeSchoolAction,
  extendSchoolAction,
  deleteSchoolAction,

} from '../../../redux/actions'
import Moment from 'react-moment';
import moment from 'moment'


function TestTable(props) {
  const { Option } = Select;
  const {
    listSchool, 
    pagination,
    getList, 
    setPage, 
    activeSchool,
    extendSchool,
    deleteSchool, 
    showEdit,
    keySearch,
    } = props;
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = [
    {
      title: 'Name',
      width: 200,
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
      width: 150,
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
      width: 150,
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
      width: 80,
      align: 'center',
      render: (record) =>(
        <Space size="middle">
          <Button block onClick={()=>onActiveOrgan(record)} type="primary">{record.status ? "Active" : "Block"}</Button>
        </Space>
      ),    },
    {
      title: 'Expires',
      width: 230,
      align: 'center',
      render: (record) =>(
        <Space size="middle">
          <Moment date={moment(record.startDay).add(record.expiryDate,'M')}  format="DD/MM/YYYY"/>
          <Select defaultValue="--Time--" style={{ width: 120 }} onChange={(value)=>handleChange(value, record.key)}>
            <Option value="3">3 Month</Option>
            <Option value="6">6 Month</Option>
            <Option value="12">1 Year</Option>
          </Select>
        </Space>
      ),
    },
    {
      title: 'Action',
      align: 'center',
      render: (record) =>(
        <Space size="middle">
          <Button onClick={()=>showEdit(record)} type="primary">Edit</Button>
          <Popconfirm 
          placement="bottomLeft"
          title="Sure to delete?" 
          onConfirm={() => onDeleteOrgan(record)}>
            <Button  type="danger">Delete</Button>
           </Popconfirm> 
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getList(pagination, keySearch);
  }, []);

   const handleTableChange = (pagination) => {
   console.log("🚀 ~ file: Table.jsx ~ line 118 ~ handleTableChange ~ pagination", pagination)
   setPage(pagination);
  getList(pagination, keySearch);
  };

  const handleChange = (value, record) => {
    const data = {
      pagination,
      _id: record,
      expiryDate: parseInt(value),
    };
    extendSchool(data);
    extendSuccess()
  }

  const extendSuccess = () => {
    message.success('Extend success');
  };

  const onDeleteOrgan = (record) =>{
      const data = {
        pagination: {current: 1, pageSize: 10, total: 0},
        companyId: record.key,
      };
      deleteSchool(data);
      success()
  }

  const success = () => {
    message.success('Delete School success');
  };

  const onActiveOrgan = (record) =>{
    const data = {
      pagination,
      _id: record.key,
    };
    activeSchool(data);
    console.log(record.key);
  }



  const start = () => {
    setLoading(true);

    console.log('selectedRowKeys: ', selectedRowKeys);
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
  
  return (
    <div style={{ marginBottom: 16 }}>
      <Table
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={listSchool} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { listSchool} = state.schoolReducer;
  return {
    listSchool: listSchool,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getList: (params) => dispatch(getSchoolListAction(params)),
    setPage: (params) => dispatch(setPageSchoolTable(params)),  
    extendSchool: (params) => dispatch(extendSchoolAction(params)),
    activeSchool: (params) => dispatch(activeSchoolAction(params)),
    deleteSchool: (params) => dispatch(deleteSchoolAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestTable);
