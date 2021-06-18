import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button, Tooltip, Space,Select, Anchor,message, Modal  } from 'antd';
import {
  activeLeaderAction,
  setPageLeaderAction,
  getLeaderSelectAction,
  deleteLeaderAction,
} from '../../../../redux/actions'
import Moment from 'react-moment';
import moment from 'moment'

function LeaderTable(props) {
  const {
    leaderList,
    activeLeader,
    getLeaderList,
    setLeaderId,
    pagination,
    setPage, 
    showEdit,
    courseId,
    getLeaderSelect,
    leaderSelect,
    deleteLeader,
    } = props;
    const { Option } = Select;
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [objectLeader, setObjectLeader] = useState({pastLeader:"",newLeader:""})
    
    const columns = [
    {
      title: 'Họ và tên: ',
      width: 170,
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.fullName}>
        <a className={ courseId === record._id ? "courseName" : "defaultName"} onClick={()=>handleClick(record._id) }>{record.fullName}</a>
      </Tooltip>
      ),
    },
    {
        title: 'Phone',
        width: 140,
        align: 'center',
        render: (record) =>(
          <Tooltip placement="topLeft" color={'blue'} title={record.phone}>
            <p className={ courseId === record._id ? "courseName" : "defaultName"} >{record.phone}</p>
          </Tooltip>

        ),
    },
    {
        title: 'Ngày kết thúc',
        width: 140,
        align: 'center',
        ellipsis: {
          showTitle: false,
        },
        render: (record) =>(
          <Tooltip placement="topLeft" color={'blue'} title={record.email}>
          <p className={ courseId === record._id ? "courseName" : "defaultName"} >{record.email}</p>
        </Tooltip>
        ),
    },
    {
      title: 'Hành động',
      align: 'center',
      render: (record) =>(
        <Space size="middle">
          <Button block onClick={()=>onActiveLeader(record)} type="primary">{record.status ? "Active" : "Block"}</Button>
          <Button onClick={()=>showEdit(record)} type="primary" >Edit</Button>
          <Button onClick={()=>onLeaderDelete(record)} type="danger" >Delete</Button>
        </Space>
      ),
    },
    ];

    const onActiveLeader = (record) =>{
      const data = {
        pagination,
        _id: record._id,
      };
      activeLeader(data);
      console.log(record._id);
    }


  const handleTableChange = (pagination) => {
   setPage(pagination);
   getLeaderList(pagination)   
  };

  const handleClick = (val) => {
  setLeaderId(val)
};

  const onHiddenModal = async () =>{
    setVisible(false)
  }

  const onFinishDelete = async () =>{  
    deleteLeader(objectLeader)
    setVisible(false)
    success()
  }


  const onLeaderDelete = (record) =>{
    const par = {
      companyId: record.companyId._id,
      personId: record._id,
    }
    setObjectLeader({...objectLeader, pastLeader:  record._id})
    getLeaderSelect(par)
    setVisible(true)
  }

  const success = () => {
    message.success('Delete Leader success');
  };

  const renderTable =()=>{
    return (
      <div style={{ marginTop: 16 }}>
        <Table
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          columns={columns} 
          dataSource={leaderList} />
      </div>
    );
  }

  const onSelectChange = value => {
    setObjectLeader({...objectLeader, newLeader:  value})
    };

  const renderModal = () =>{
    return(
      <Modal
        title="Chọn Hướng dẫn viên kế thừa"
        centered
        visible={visible}
        onOk={() => onFinishDelete()}
        onCancel={() => onHiddenModal()}
        width={400}
      >
        <Select 
            defaultValue="--- Hướng dẫn viên ---"
            style={{width: 220, marginLeft: 10, textAlign: 'center'}}
            onChange={onSelectChange}>
            {leaderSelect.map((item) => (
            <Option key={item._id}>{item.fullName}</Option>
            ))}
        </Select>
      </Modal> 
    );
  }

  return (
    <>
    {renderTable()}
    {renderModal()}
    </>
  );
}

const mapStateToProps = (state) => {
  const { pagination, leaderSelect} = state.managerReducer;
  return {
    pagination: pagination,
    leaderSelect: leaderSelect,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeLeader: (params) => dispatch(activeLeaderAction(params)),
    setPage: (params) => dispatch(setPageLeaderAction(params)),
    getLeaderSelect: (params) => dispatch(getLeaderSelectAction(params)), 
    deleteLeader: (params) => dispatch(deleteLeaderAction(params)),   
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderTable);
    