import React, { useState } from "react";
import { Upload, Button } from "antd";
import './index.css';

function Avatar(props) {
  const { imageUrl, setImageUrl } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileList, setSelectedFileList] = useState([
    // {
    //   uid: '-1',
    //   name: imageUrl,
    //   status: 'done',
    // }
  ]);


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
          getBase64(info.file.originFileObj, imageUrl => {
          setImageUrl(imageUrl);
          // setLogoSchool(imageUrl);
        });
        break;
      default:
        setSelectedFile(null);
        setSelectedFileList([]);
    }
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <>
      <Upload
        fileList={selectedFileList}
        customRequest={dummyRequest}
        onChange={onChange}
        listType="picture-card"
        onPreview={onPreview}
      >
        {selectedFileList.length < 5 && '+ Upload'}
      </Upload>
    </>
  );

}

export default Avatar;
