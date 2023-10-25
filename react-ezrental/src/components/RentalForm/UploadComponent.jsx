import React, { useState } from "react";
import "./rentalFormStyles.css";
import { Upload, Modal, message} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function UploadComponent({urls, setUrls, fileList, setFileList}) {

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
  // const [fileList, setFileList] = useState([]);

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


  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log((event.loaded / event.total) * 100);
        onProgress({ percent: (event.loaded / event.total) * 100 }, file);
      },
    };

    fmData.append("image", file);
    console.log(fmData.get("image"));

    try {
      //llamar a peticion para subir archivo a drive y recibir url(ahora mismo con peticion de prueba)
      axios
        .post("http://localhost:4000/api/upload", fmData, config)
        .then((res) => {
          onSuccess(file);
          //añadir url recibida del response al array urls
          // urls.push(`https://drive.google.com/uc?export=view&id=${res.data.fileId}`);
          urls.push(res.data.imgUrl);

          fileList.length > 9 ? message.info("Solo puede subir 10 fotos") : "";
        });
    } catch {
      (error) => {
        const errorMessage = error.response ? error.response.data : "Error desconocido";
        onError(errorMessage); // Llamar a onError con el mensaje de error
        return Upload.LIST_IGNORE;
      };
    }
  };
  
  const handleRemove = (file, index) => {

    //hacer peticion para eliminar de drive y eliminar de array de urls
    console.log("Indice del elemento borrado:  "+index+" - URL del elemento borrado: "+urls[index]);
    urls.splice(index, 1);

  }

  const handleValidation = (file) => {

    const validType = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!validType) {
      message.error('Solo se admiten imágenes JPG o PNG');
      return Upload.LIST_IGNORE;
    }
    
    const validSize = file.size / 1024 / 1024 < 10;
    if (!validSize) {
      message.error('El peso máximo de la imagen no debe pasar 10MB');
      return Upload.LIST_IGNORE;
    }

  } 

  return (
    <>
      <h2 style={{textAlign:'center'}}>Agregue algunas fotos de su residencia</h2>

      <Upload
        customRequest={uploadImage}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/png, image/jpeg"
        beforeUpload={handleValidation}
        onRemove={(file) => handleRemove(file, fileList.indexOf(file))}
      >
        {fileList.length >= 10 ? null : uploadButton}
      </Upload>

      {/* {fileList.length >= 1 && fileList.length < 5 ? <p>Debe subir al menos 5 fotos</p> : ""} */}
      
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

    </>
  );
}
export default UploadComponent;
