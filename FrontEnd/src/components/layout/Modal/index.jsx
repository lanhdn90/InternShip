import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import Iframe from 'react-iframe';
import ReactPlayer from 'react-player'
function ModalFun(props) {
    const [visible, setVisible] = useState(false);
    const [playing, setPlaying] = useState(true);

    useEffect( () =>  {
        setPlaying(true);
    }, [visible])

    const onClickVideo = async () =>{
        await setPlaying(false);
        setVisible(false)
    }

    return (
        <>
          <Button type="primary" onClick={() => setVisible(true)}>
            Open Modal of 1000px width
            </Button>
        <Modal
            title="Modal 1000px width"
            centered
            visible={visible}
            onOk={() => onClickVideo()}
            onCancel={() => onClickVideo()}
            width={1000}
        >
            <div
                dangerouslySetInnerHTML={{
                    __html: "<p>Ngôn ngữ đánh dấu văn bản HTML</p><p>Ngôn ngữ lập trình JavaScript</p><p>Ngôn ngữ lập trình PHP</p>"
                }}>

            </div>
        </Modal>  
        </>
    );
}

export default ModalFun;