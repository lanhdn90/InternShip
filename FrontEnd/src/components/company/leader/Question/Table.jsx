import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button, Tooltip, Space,Select,Modal,
   Popconfirm, message} from 'antd';
import ReactPlayer from 'react-player'
import {
  setPageCompanyTable, 
  deleteQuestionAction,
} from '../../../../redux/actions'
import Moment from 'react-moment';
import moment from 'moment'


function TestTable(props) {
  const { Option } = Select;
  const {
    questionList, 
    pagination,
    getQuestionList, 
    deleteQuestion, 
    showEdit,
    keySearch,
    personInfo,
    manage,
    selectTaskId,
    } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(personInfo.roleId !== "6045cf1c83a38015cc63ccc3"){
      console.log("🚀 ~ file: Table.jsx ~ line 32 ~ useEffect ~ manage", manage)
      getQuestionList({current: 1, pageSize: 10, total: 0, keySearch, company: personInfo.companyId});
    }else{
      getQuestionList({current: 1, pageSize: 10, total: 0, keySearch, person: personInfo._id });
    }
  }, []);

  const columns = [
    {
      title: 'Nội Dung',
      width: 300,
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.content}>
          {record.content}
      </Tooltip>
      ),
    },
    {
      title: 'Đáp án A',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.answer_A}>
          {record.answer_A}
      </Tooltip>
      ),
    },
    {
      title: 'Đáp án B',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.answer_B}>
          {record.answer_B}
      </Tooltip>
      ),
    },
    {
      title: 'Đáp án C',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.answer_C}>
          {record.answer_C}
      </Tooltip>
      ),
    },
    {
      title: 'Đáp án D',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.answer_D}>
          {record.answer_D}
      </Tooltip>
      ),
    },
    {
      title: 'Đáp án đúng',
      dataIndex: 'result',
      width: 120
    },
    {
      title: 'Hành động',
      align: 'center',
      render: (record) =>(
        <Space size="middle">
          <Button onClick={()=>showEdit(record)} type="primary">Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteQuestion(record)}>
            <Button  type="danger">Delete</Button>
           </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    if(manage){
      getQuestionList({...pagination, keySearch,selectTaskId, company: personInfo.companyId});
    }else{
      getQuestionList({...pagination, keySearch,selectTaskId, person: personInfo._id });
    }
  };


  const onDeleteQuestion = (record) =>{
    const data = {
      pagination: {current: 1, pageSize: 10, total: 0},
      questionId: record._id,
    };
    success()
    deleteQuestion(data);
  }

  const success = () => {
    message.success('Delete Question success');
  };

  return (
    <div>
      <Table
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        columns={columns} 
        dataSource={questionList} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { questionList} = state.leaderReducer;
  return {
    questionList: questionList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (params) => dispatch(setPageCompanyTable(params)),
    deleteQuestion: (params) => dispatch(deleteQuestionAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestTable);
