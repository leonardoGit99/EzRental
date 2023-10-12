import React, { useState } from "react";
import "./rentalFormStyles.css";
import { Upload, Modal, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
function RentalForm() {
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [urls, setUrls] = useState([]);
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-2",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-3",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-4",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-xxx",
    //   percent: 50,
    //   name: "image.png",
    //   status: "uploading",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-5",
    //   name: "image.png",
    //   status: "error",
    // },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Suba su imágen
      </div>
    </div>
  );


  const uploadImage = options => {

    const { onSuccess, onError, file, onProgress } = options;
  
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        console.log((event.loaded / event.total) * 100);
        onProgress({ percent: (event.loaded / event.total) * 100 },file);
      }
    };
    fmData.append("image", file);
    //llamar a peticion para subir archivo a drive y recibir url(ahora mismo con peticion de prueba)
    axios
      .post("http://localhost/tissss/indexConsultaGeneral.php", fmData, config)
      .then(res => {
        onSuccess(file);
        urls.push(file.name);
        console.log(res);
      })
      .catch(err=>{
        const error = new Error('Some error');
        onError({event:error});
      });
  }
  
  const handleRemove = (file) => {

    //hacer peticion para eliminar de drive y eliminar de array de urls
    console.log(file.name);

  }

  return (
    <>
      <p>Componente RentalForm pasado a page AddAd</p>

      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        // action="http://localhost/tissss/indexConsultaGeneral.php"
        customRequest={uploadImage}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={file=>handleRemove(file)}
      >
        {fileList.length >= 10 ? null : uploadButton}

      </Upload>
      {fileList.length < 5 ? <p>Debe subir al menos 5 fotos</p> : ""}
      {/* {fileList.length > 9 ? message.info("Solo puede subir 10 fotos") : ""} */}
      {fileList.length > 9 ? <p>Solo puede subir 10 fotos</p> : ""}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>

      <Button onClick={() => {console.log(fileList); console.log(urls);}}>
          Imprimir File list y array de urls drive
      </Button>

    </>
  );
}
export default RentalForm;
