import React, { useState } from "react";
import { Upload, Button } from "antd";
import './index.css';

function Avatar(props) {
  const {  imageUrl, setImageUrl } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileList, setSelectedFileList] = useState([]);


  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);

  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onChange = info => {
    switch (info.file.status) {
      case "uploading":
        setSelectedFileList([info.file]);
        break;
      case "done":
        setSelectedFile(info.file);
        setSelectedFileList([info.file]);
        getBase64(info.file.originFileObj, imageUrl =>{
          setImageUrl(imageUrl);
          // setImageQuestion(imageUrl);
        });
        
        break;

      default:

        setSelectedFile(null);
        setSelectedFileList([]);
    }
  };

    return (
      <>
        <Upload
          fileList={selectedFileList}
          customRequest={dummyRequest}
          onChange={onChange}
          // showUploadList={false}
          className="avatar-uploader"
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <Button>Choose File</Button>}

        </Upload>
      </>
    );
  
}
export default Avatar;
