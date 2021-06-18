import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
function CourseTable(props) {
  const {
    courseWithTaskList,
    } = props;
    const [loading, setLoading] = useState(false);
    
    const columns = [
    {
      title: 'STT',
      dataIndex: 'sort',
      width: 50,
      ellipsis: {
        showTitle: false,
      },
    },
    {
        title: 'Bài Học',
        dataIndex: 'taskName',
        width: 200,
        ellipsis: {
          showTitle: false,
        },
      },
    ];   
    
  return (
    <div style={{ marginTop: 25, paddingRight: 5 }}>
      <Table
        loading={loading}
        columns={columns} 
        dataSource={courseWithTaskList}
        pagination={false}  />
    </div>
  );
}

export default CourseTable;
