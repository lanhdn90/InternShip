import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button, Tooltip, Space, Select, Modal,
   InputNumber,Popconfirm, message  } from 'antd';
import ReactPlayer from 'react-player'
import {
  getTaskListAction, 
  setPageTableAction, 
  deleteTaskAction,
} from '../../../../redux/actions'
import Moment from 'react-moment';
import moment from 'moment'


function TestTable(props) {

  const { Option } = Select;
  const {
    taskList, 
    pagination,
    getTaskList, 
    setPage, 
    deleteTask, 
    showEdit,
    keySearch,
    setManage,
    manage,
    personInfo,
    updateTask,
    } = props;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [linkUrl, setLinkUrl] = useState("");
  const [isVideoPlayer, setIsVideoPlayer] = useState(true);
  const [isNote, setIsNote] = useState("")
  const [isExam, setIsExam] = useState(0)


  useEffect( async ()  => {
    if(personInfo.roleId === "6045cf1c83a38015cc63ccc3"){
      await getTaskList({current: 1, pageSize: 10, total: 0, keySearch, person: personInfo._id });
    }else{
      await getTaskList({current: 1, pageSize: 10, total: 0, keySearch, company: personInfo.companyId })
      setManage(true) 
    } 
    
  }, []);

  useEffect( () =>  {
    setPlaying(true);
  }, [visible])
  
  const onHiddenVideo = async () =>{
    await setPlaying(false);
    setVisible(false)
    setLinkUrl("");
    setIsNote("")
    setIsVideoPlayer(true);
  }
  const columns = [
    {
      title: 'Bài học',
      width: 200,
      defaultSortOrder: 'descend',
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.taskName}>
          {record.taskName}
      </Tooltip>
      ),
    },
    {
      title: 'Video',
      align: 'center',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (record) =>(
        <Space size="middle">
            <button style={{border: "none"}}>
              <img 
                src="https://www.pngkey.com/png/full/801-8010034_play-icons-button-youtube-subscribe-computer-play-video.png"
                alt="my image"
                style={{width: 80, height: 40}}
                onClick={()=>onClickVideo(record)} 
              />
            </button>
        </Space>
      ),
    },
    {
      title: 'Ghi chú',
      align: 'center',
      width: 100,
      render: (record) =>(
        <Space size="middle">
            <button style={{border: "none"}}>
              <img 
                src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
                alt="myImage"
                style={{width: 80, height: 40}}
                onClick={()=>onClickImage(record)} 
              />
            </button>    
        </Space>
      ),
    },
    {
      title: 'Câu hỏi ',
      align: 'center',
      width:100,
      render: (record) =>(
        <Tooltip placement="topLeft" color={'yellow'} title={record.count}>
          {record.count}
      </Tooltip>
      ),
    },
    {
      title: 'Bài kiểm tra',
      align: 'center',
      width:300,
      render: (record) =>(
        <Space size="middle">
          <InputNumber
          
            min={1} 
            disabled={manage? true : false} 
            max={record.count} 
            placeholder={record.exam} 
            onChange={setIsExam} />
          <Button onClick={()=>onchangeExam(record)} type="primary" disabled={manage? true : false}>Customized</Button>
        </Space>
        ),
    },
    {
      title: 'Hoạt động',
      align: 'center',
      width: 200,
      render: (record) =>(
        <Space size="middle">
          <Button onClick={()=>showEdit(record)} type="primary" disabled={manage? true : false}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteTask(record)}>
            <Button  type="danger">Delete</Button>
           </Popconfirm>
        </Space>
      ),
    },
  ];

  const onchangeExam = (record) =>{

    const par = {
      pagination,
      _id: record._id,
      taskInfo: {
        exam: isExam,
      },
      person: personInfo._id,
    }
    updateTask(par)
    setIsExam(0)
  }

  const onClickImage = (val) =>{
    setVisible(true);
    setIsVideoPlayer(false)
    setIsNote(val.note)
    }

  const onClickVideo = (val) =>{
  setVisible(true);
  setLinkUrl(val.video);
  }

  const renderModal = () =>{
    return(
      <Modal
        title={isVideoPlayer? " Video" : "Note"}
        centered
        visible={visible}
        onOk={() => onHiddenVideo()}
        onCancel={() => onHiddenVideo()}
        width={1000}
      >
        {isVideoPlayer ?
          <ReactPlayer 
          url={linkUrl}
          width="950px"
          height="450px"
          controls={true}
          playing={playing}
          />
          : 
          <div
            dangerouslySetInnerHTML={{
                __html: isNote
            }}>
          </div>
        } 
      </Modal> 
    );
  }

  const handleTableChange = async (pagination) => {
    setPage(pagination);
    if(personInfo.roleId === "6045cf1c83a38015cc63ccc3"){
      await getTaskList({...pagination, keySearch, person: personInfo._id });
    }else{
      await getTaskList({...pagination, keySearch, company: personInfo.companyId })
    } 
  };


  const success = () => {
    message.success('Delete Task success');
  };


  const onDeleteTask = (record) =>{
    const data = {
      pagination: {current: 1, pageSize: 10, total: 0},
      taskId: record._id,
      // person: personInfo._id,
      person: personInfo
    };
    deleteTask(data);
    success()
  }

  return (
    <div>
      <Table
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        columns={columns} 
        dataSource={taskList} />
        {renderModal()}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { taskList} = state.leaderReducer;
  return {
    taskList: taskList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (params) => dispatch(setPageTableAction(params)),
    getTaskList: (params) => dispatch(getTaskListAction(params)),
    deleteTask: (params) => dispatch(deleteTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestTable);
