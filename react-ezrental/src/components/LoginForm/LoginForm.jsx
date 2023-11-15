import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, Typography, message } from "antd";
import { useAuth } from "../../contexts/authContext";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import "./LoginForm.css";

function LoginForm({ formFlag, switchForm }) {
  const { login, googleLogin } = useAuth();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log("name:" + e.target.name + " y value:"+e.target.value);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFinish = async () => {
    try {
      await login(userData.email, userData.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-login-credentials":
          message.error("Credenciales incorrectos");
          break;
        case "auth/invalid-email":
          message.error("El correo ingresado es inválido")
          break;

        default:
          break;
      }
    }
  };

  const handleGoogleLogin = async() => {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  }

  return (
    <>
      <Form
        onFinish={handleFinish}
        labelCol={{ span: 9 }}
        // wrapperCol={{ span: 16 }}
        className="login-form"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Typography.Title level={1} style={{fontSize:'40px'}}>¡Bienvenido!</Typography.Title>
        <Typography.Text type="secondary" style={{fontSize:'20px'}}>Ingrese sus datos de acceso <br /><br /> </Typography.Text>   

        <Form.Item label="Email" name="email" hasFeedback rules={[{required:true, message:"Ingrese un correo electrónico"}]}>
          <Input
            name="email"
            placeholder="Ingrese su correo electrónico"
            onChange={handleChange}
            className="login-input"
          ></Input>
        </Form.Item>

        <Form.Item name="password" label="Contraseña" hasFeedback rules={[{required:true,message:"Debe ingresar una contraseña"}]}>
          <Input.Password
            name="password"
            placeholder="Ingrese su contraseña"
            onChange={handleChange}
            className="login-input"
          ></Input.Password>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="login-button">
            Iniciar sesión
          </Button>
        <Divider style={{borderColor: 'black', fontSize: '18px'}}><Button onClick={console.log("hola")} type='link' className="login-button">¿Olvidaste tu contraseña?</Button></Divider>
        </Form.Item>
        <Divider style={{borderColor: 'black', fontSize: '18px'}}>O ingrese con</Divider>
        <div className="social-login">
          <GoogleOutlined className="social-icon" style={{color: 'red'}} onClick={handleGoogleLogin}></GoogleOutlined>
          <FacebookFilled className="social-icon" style={{color: 'blue'}}></FacebookFilled>
        </div>
        <Divider style={{borderColor: 'black', fontSize: '18px'}}>¿Aún no tiene una cuenta?</Divider>
        <div>
          <Button onClick={switchForm} className="login-button">Registrarse</Button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
