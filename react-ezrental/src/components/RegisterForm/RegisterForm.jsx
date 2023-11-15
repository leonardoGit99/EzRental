import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Typography,
  Upload,
  message,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/authContext";
import "./RegisterForm.css";

function RegisterForm({ formFlag, switchForm }) {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    photoURL: "",
  });

  const navigate = useNavigate();
  const { register } = useAuth();
  // const [selectedCountry, setSelectedCountry] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleChange = (e) => {
    // console.log("name:" + e.target.name + " y value:"+e.target.value);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangeUpload = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  // const handleSelectChange = (value) => {
  //   setSelectedCountry(value);
  // };

  // const { Option } = Select;

  // const selectCountry = (
  //   <Select style={{ width: 90 }} onChange={handleSelectChange}>
  //     <Option value="591">+591</Option>
  //     <Option value="51">+51</Option>
  //     <Option value="56">+56</Option>
  //   </Select>
  // );

  const handleFinish = async () => {
    // userData.phoneNumber = selectedCountry + userData.phoneNumber;

    try {
      await register(
        userData.email,
        userData.password,
        userData.fullname,
        userData.phoneNumber,
        userData.photoURL
      );
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
    //Hacer el registro
  };

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

          userData.photoURL = res.data.imgUrl;
        });
    } catch {
      (error) => {
        const errorMessage = error.response
          ? error.response.data
          : "Error desconocido";
        onError(errorMessage);
      };
    }
  };

  const handleRemove = () => {
    userData.photoURL = "";
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Suba su foto
      </div>
    </div>
  );

  const handleValidation = (file) => {
    const validType = file.type === "image/jpeg" || file.type === "image/png";
    if (!validType) {
      message.error("Solo se admiten imágenes JPG o PNG");
      return Upload.LIST_IGNORE;
    }

    const validSize = file.size / 1024 / 1024 < 10;
    if (!validSize) {
      message.error("El peso máximo de la imagen no debe pasar 10MB");
      return Upload.LIST_IGNORE;
    }
  };

  return (
    <>
      <Form
        onFinish={handleFinish}
        labelCol={{ span: 9 }}
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        className="register-form"
        autoComplete="off"
      >
        <Typography.Title level={1} style={{ fontSize: "40px" }}>
          ¡Bienvenido!
        </Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: "20px" }}>
          Registre sus datos de acceso <br />
          <br />{" "}
        </Typography.Text>

        <Form.Item
          label="Nombre completo"
          name="fullname"
          hasFeedback
          rules={[
            {
              validator: (_, value) => {
                if (value) {
                  if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Debe ingresar solo letras");
                  }
                }
              },
            },
            {
              required: true,
              message: "Por favor, ingrese su nombre completo",
            },
            {
              whitespace: true,
              message: "No puede dejar en blanco este campo",
            },
            {
              min: 10,
              message: "Debe ingresar mínimo 10 caracteres",
            },
            {
              max: 50,
              message: "Solo puede ingresar 50 caracteres",
            },
          ]}
        >
          <Input
            name="fullname"
            placeholder="Ingrese su nombre completo"
            onChange={handleChange}
            className="register-input"
          ></Input>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Ingrese un correo electrónico",
            },
          ]}
        >
          <Input
            type="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            onChange={handleChange}
            className="register-input"
          ></Input>
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          hasFeedback
          rules={[
            { required: true, message: "Debe ingresar una contraseña" },
            { min:6, message:"Su contraseña debe tener al menos 6 caracteres" },
          ]}
        >
          <Input.Password
            name="password"
            placeholder="Ingrese su contraseña"
            onChange={handleChange}
            className="register-input"
          ></Input.Password>
        </Form.Item>

        {/* <Form.Item
                  name="phoneNumber"
                  label="Número de teléfono"
                  hasFeedback
                >
                  <Input
                    addonBefore={selectCountry}
                    type="number"
                    name="phoneNumber"
                    placeholder="Ingrese su número de teléfono"
                    onChange={handleChange}
                    ></Input>
                  </Form.Item> */}

        <Form.Item
          name="photo"
          label="Suba una foto de usuario"
          hasFeedback
          rules={[{ required: true, message: "Debe subir su foto" }]}
        >
          <Upload
            name="photo"
            maxCount={1}
            customRequest={uploadImage}
            beforeUpload={handleValidation}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChangeUpload}
            accept="image/png, image/jpeg"
            onRemove={handleRemove}
            className="upload-button"
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="register-button"
          >
            Registrarse
          </Button>
        </Form.Item>
        <Divider style={{ borderColor: "black", fontSize: "18px" }}>
          ¿Ya tiene una cuenta?
        </Divider>
        <div>
          <Button onClick={switchForm} className="register-button">
            Iniciar Sesión
          </Button>
        </div>
      </Form>
    </>
  );
}

export default RegisterForm;
