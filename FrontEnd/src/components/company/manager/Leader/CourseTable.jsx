import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
function CourseTable(props) {
  const {
    courseList,
    getCourseLeader,
    leaderId,
    } = props;
    const [loading, setLoading] = useState(false);
    
    const columns = [
    //   {
    //     title: 'STT',
    //     dataIndex: 'sort',
    //     width: 50,
    //     ellipsis: {
    //       showTitle: false,
    //   },
    // },
    {
        title: 'Khóa học',
        dataIndex: 'courseName',
        width: 200,
        ellipsis: {
          showTitle: false,
        },
      },
    ];   
    

    useEffect(() => {
      if(leaderId !==""){
        getCourseLeader(leaderId)
      }
  }, [leaderId])

  return (
    <div style={{ marginTop: 25, paddingRight: 5 }}>
      <Table
        loading={loading}
        columns={columns} 
        dataSource={courseList}
        pagination={false}  />
    </div>
  );
}

export default CourseTable;
