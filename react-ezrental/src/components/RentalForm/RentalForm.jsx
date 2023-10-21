import React, { useState } from 'react';
import { Form, Input, Button, Select, Checkbox, DatePicker } from 'antd';
import './rentalFormStyles.css';
import UploadComponent from './UploadComponent';


const { Option } = Select;

const { RangePicker } = DatePicker;

const RentalForm = () => {
  const [urls,setUrls]=useState([]);
  const onFinish = (values) => {
    console.log('Valores del formulario:', values);
  };

  const validarinputmayor0= (_, value) => {
    if (value < 0) {
      return Promise.reject('Debe ser mayor o igual a 0');
    }
    return Promise.resolve();
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  }

  return (
    <div /*style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"space-between"}}*/>
    <h1 className="form-title">Registro</h1>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Título de la Residencia"
        name="tituloResid"
        rules={[{ required: true, message: 'Por favor, ingresa el título de la residencia.' }]
        }
      >
        <Input 
        className="inputsize" 
        placeholder="Introduce el título de la residencia"
        onChange={handleChange}/>
      </Form.Item>

      <Form.Item
          label="Precio"
          name="precioResid"
          rules={[{ required: true, message: 'Por favor, ingresa el precio de la residencia.' },{ validator: validarinputmayor0 }]}
        >
          <Input 
          className="inputsize" 
          name="precioResid"
          type="number" 
          addonBefore="Bs" 
          placeholder="Ingresa el precio de la residencia"
          onChange={handleChange}/>
        </Form.Item>

      <Form.Item
        label="Tipo de Residencia"
        name="tipoResid"
        rules={[{ required: true, message: 'Por favor, selecciona el tipo de residencia.' }]
        }
      >
        <Select 
        name="tipoResid"
        placeholder="Selecciona el tipo de residencia">
          <Option value="casa">Casa</Option>
          <Option value="departamento">Departamento</Option>
          <Option value="habitacion">Habitacion</Option>
          <Option value="hotel">Hotel</Option>
        </Select>
      </Form.Item>

      <Form.Item
          label="Tipo de Alojamiento"
          name="tipoAlojam"
          rules={[{ required: true, message: 'Por favor, selecciona el tipo de alojamiento.' }]}
        >
          <Select 
          name="tipoAlojam"
          placeholder="Selecciona el tipo de alojamiento">
            <Option value="alojamientoCompartido">Alojamiento Compartido</Option>
            <Option value="alojamientoEntero">Alojamiento Entero</Option>
          </Select>
        </Form.Item>
      

      <Form.Item
          label="Número Máximo de Huéspedes"
          name="huesMaxResid"
          rules={[{ required: true, message: 'Por favor, ingresa el numero maximo de Huesped.' },{ validator: validarinputmayor0 }]
          }
        >
          <Input 
          className="inputsize" 
          name="huesMaxResid"
          type="number" 
          placeholder="Ingresa el número máximo de huéspedes"
          onChange={handleChange}/>
        </Form.Item>
    
      <Form.Item
        label="País"
        name="paisResid"
        rules={[{ required: true, message: 'Por favor, ingresa el país.' }]
        }
      >
        <Input 
        className="inputsize" 
        name="paisResid"
        placeholder="Ingresa el país"
        onChange={handleChange}/>
      </Form.Item>

      <Form.Item
        label="Ciudad"
        name="ciudadResid"
        rules={[{ required: true, message: 'Por favor, ingresa la ciudad.' }]
        }
      >
        <Input 
        className="inputsize" 
        name="ciudadResid"
        placeholder="Ingresa la ciudad"
        onChange={handleChange}/>
      </Form.Item>

      <Form.Item
        label="Dirección"
        name="direcResid"
        rules={[{ required: true, message: 'Por favor, ingresa la dirección.' }]
        }
      >
        <Input 
        className="inputsize" 
        name="direcResid"
        placeholder="Ingresa la dirección de la residencia"
        onChange={handleChange}/>
      </Form.Item>

      <Form.Item
        label="Número de Camas"
        name="camaResid"
        rules={[{ required: true, message: 'Por favor, ingresa el número de camas.' },{ validator: validarinputmayor0 }]
        }
      >
        <Input 
        className="inputsize" 
        name="camaResid"
        type="number" 
        placeholder="Ingresa el número de camas"
        onChange={handleChange}/>
      </Form.Item>

      <Form.Item
        label="Número de Habitaciones"
        name="habitResid"
        rules={[{ required: true, message: 'Por favor, ingresa el número de habitaciones.' },{ validator: validarinputmayor0 }]
        }
      >
        <Input className="inputsize" 
        name="habitResid"
        type="number" 
        placeholder="Ingresa el número de habitaciones"
        onChange={handleChange}/>
      </Form.Item>

      <Form.Item
        label="Número de Baños"
        name="banioResid"
        rules={[{ required: true, message: 'Por favor, ingresa el número de baños.' },{ validator: validarinputmayor0 }]
        }
      >
        <Input 
        className="inputsize" 
        name="banioResid"
        type="number" 
        placeholder="Ingresa el número de baños"
        onChange={handleChange}/>
      </Form.Item>

      <Form.Item
        label="Descripción del Espacio"
        name="descripResid"
        rules={[{ required: true, message: 'Por favor, ingresa una descripción del espacio.' }]
        }
      >
        <Input.TextArea 
        className="inputsize"
        name="descripResid"
        showCount
        maxLength={1000}
        autoSize={{ minRows: 5, maxRows: 20 }}
        placeholder="Ingresa una descripción del espacio"
        onChange={handleChange} />
      </Form.Item>
      
      <h2 className="form-title">Servicios</h2>
      <Form.Item
          label="Comodidades"
          name="amenities"
        >
          <div className="amenities-group">
            <div className="amenities-row">
              <Checkbox value="wifi">Wi-Fi</Checkbox>
              <Checkbox value="lavadora">Lavadora</Checkbox>
              <Checkbox value="cocina">Cocina</Checkbox>
              <Checkbox value="aireAcond">Aire Acondicionado</Checkbox>
              <Checkbox value="televisor">Televisor</Checkbox>
              
            </div>

          </div>
          
        </Form.Item>

        <Form.Item
          label="Caracteristicas"
          name="features"
        >
          <div className="amenities-group">
            <div className="amenities-row">
              <Checkbox value="pscina">Piscina</Checkbox>
              <Checkbox value="jacuzzi">Jacuzzi</Checkbox>
              <Checkbox value="estacionamiento">Estacionamiento</Checkbox>
              <Checkbox value="gim">Gimnasio</Checkbox>
              <Checkbox value="parrilla">Parrilla</Checkbox>
            </div>
          </div>
          
        </Form.Item>

        <Form.Item
          label="Seguridad"
          name="segurity"
        >
          <div className="amenities-group">
            <div className="amenities-row">
              <Checkbox value="camaras">Cámara de seguridad</Checkbox>
              <Checkbox value="detectorHumo">Detector de humo</Checkbox>
            </div>
          </div>
          
        </Form.Item>

        <Form.Item
          label="Fechas Inicio/Fin"
          name="rentalDates"
          rules={[{ required: true, message: 'Por favor, ingresa las fechas de alquiler.' }]
        }
        >
        <RangePicker className="inputsize"
        placeholder={['Fecha Inicio', 'Fecha Fin']}
        />
        </Form.Item>
 
        <div className="amenities-group">
        <div className="amenities-row"> 
  <Form.Item
    label="Check In"
    name="checkInResid"
    rules={[{ required: true, message: 'Por favor, ingresa la hora de check-in.' }]
    }
    className="check-in-item" // Agrega una clase aquí
  >
    <Input.TextArea
        className="inputsize"
        name="checkInResid"
        showCount
        maxLength={1000}
        autoSize={{ minRows: 5, maxRows: 20 }}
        placeholder="Ingresa la hora de check-in"
        onChange={handleChange}
    />
  </Form.Item>
  </div> 
  <div className="amenities-row">       
  <Form.Item
    label="Check Out"
    name="checkOutResid"
    rules={[{ required: true, message: 'Por favor, ingresa la hora de check-out.' }]
  }
  >
    <Input.TextArea 
        className="inputsize"
        name="checkOutResid"
        showCount
        maxLength={1000}
        autoSize={{ minRows: 5, maxRows: 20 }}
        placeholder="Ingresa la hora de check-out"
        onChange={handleChange}
    />
  </Form.Item>
<Form.Item>
  <UploadComponent urls={urls}>

  </UploadComponent>
</Form.Item>
  </div>
</div>

<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Completar
          </Button>
          <Button htmlType="button">
            Cancelar
          </Button>
        </Form.Item>
        
    </Form>
    </div>
  );

}
export default RentalForm;
