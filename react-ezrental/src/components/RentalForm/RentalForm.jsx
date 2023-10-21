import React from 'react';
import { Form, Input, Button, Select, Checkbox, DatePicker } from 'antd';
import './rentalFormStyles.css';
const { Option } = Select;

const { RangePicker } = DatePicker;

const RentalForm = () => {
  const onFinish = (values) => {
    console.log('Valores del formulario:', values);
  };

  const validarinputmayor0= (_, value) => {
    if (value < 0) {
      return Promise.reject('Debe ser mayor o igual a 0');
    }
    return Promise.resolve();
  };
  
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
        name="title"
        rules={[{ required: true, message: 'Por favor, ingresa el título de la residencia.' }]
        }
      >
        <Input className="w-500"/>
      </Form.Item>

      <Form.Item
          label="Precio"
          name="price"
          rules={[{ required: true, message: 'Por favor, ingresa el precio de la residencia.' },{ validator: validarinputmayor0 }]}
        >
          <Input className="w-500" type="number" addonBefore="Bs" />
        </Form.Item>

      <Form.Item
        label="Tipo de Residencia"
        name="residenceType"
        rules={[{ required: true, message: 'Por favor, selecciona el tipo de residencia.' }]
        }
      >
        <Select >
          <Option value="casa">Casa</Option>
          <Option value="departamento">Departamento</Option>
          <Option value="habitacion">Habitacion</Option>
          <Option value="hotel">Hotel</Option>
        </Select>
      </Form.Item>

      <Form.Item
          label="Tipo de Alojamiento"
          name="accommodationType"
          rules={[{ required: true, message: 'Por favor, selecciona el tipo de alojamiento.' }]}
        >
          <Select>
            <Option value="alojamientoCompartido">Alojamiento Compartido</Option>
            <Option value="alojamientoEntero">Alojamiento Entero</Option>
          </Select>
        </Form.Item>
      

      <Form.Item
          label="Número Máximo de Huéspedes"
          name="maxGuests"
          rules={[{ required: true, message: 'Por favor, ingresa el numero maximo de Huesped.' },{ validator: validarinputmayor0 }]
          }
        >
          <Input className="w-500" type="number" />
        </Form.Item>
    
      <Form.Item
        label="País"
        name="country"
        rules={[{ required: true, message: 'Por favor, ingresa el país.' }]
        }
      >
        <Input className="w-500"/>
      </Form.Item>

      <Form.Item
        label="Ciudad"
        name="city"
        rules={[{ required: true, message: 'Por favor, ingresa la ciudad.' }]
        }
      >
        <Input className="w-500"/>
      </Form.Item>

      <Form.Item
        label="Dirección"
        name="address"
        rules={[{ required: true, message: 'Por favor, ingresa la dirección.' }]
        }
      >
        <Input className="w-500"/>
      </Form.Item>

      <Form.Item
        label="Número de Camas"
        name="beds"
        rules={[{ required: true, message: 'Por favor, ingresa el número de camas.' },{ validator: validarinputmayor0 }]
        }
      >
        <Input className="w-500" type="number" />
      </Form.Item>

      <Form.Item
        label="Número de Habitaciones"
        name="rooms"
        rules={[{ required: true, message: 'Por favor, ingresa el número de habitaciones.' },{ validator: validarinputmayor0 }]
        }
      >
        <Input className="w-500" type="number" />
      </Form.Item>

      <Form.Item
        label="Número de Baños"
        name="bathrooms"
        rules={[{ required: true, message: 'Por favor, ingresa el número de baños.' },{ validator: validarinputmayor0 }]
        }
      >
        <Input className="w-500" type="number" />
      </Form.Item>

      <Form.Item
        label="Descripción del Espacio"
        name="description"
        rules={[{ required: true, message: 'Por favor, ingresa una descripción del espacio.' }]
        }
      >
        <Input.TextArea className="w-500"
        showCount
        maxLength={1000}
        autoSize={{ minRows: 5, maxRows: 20 }}
         />
      </Form.Item>
      
      <h2 className="form-title">Servicios</h2>
      <Form.Item
          label="Comodidades"
          name="amenities"
        >
          <div className="amenities-group">
            <div className="amenities-row">
              <Checkbox value="wifi">Wi-Fi</Checkbox>
              <Checkbox value="laundry">Lavadora</Checkbox>
              <Checkbox value="kitchen">Cocina</Checkbox>
              <Checkbox value="airConditioning">Aire Acondicionado</Checkbox>
              <Checkbox value="workspace">Zona de Trabajo</Checkbox>
              <Checkbox value="hairDryer">Secadora de pelo</Checkbox>
            </div>
            <div className="amenities-row">
              <Checkbox value="kitchen">Cocina</Checkbox>
              <Checkbox value="dryer">Secadora</Checkbox>
              <Checkbox value="heating">Calefacción</Checkbox>
              <Checkbox value="tv">Televisor</Checkbox>
              <Checkbox value="iron">Plancha</Checkbox>
            </div>
          </div>
          
        </Form.Item>

        <Form.Item
          label="Caracteristicas"
          name="features"
        >
          <div className="amenities-group">
            <div className="amenities-row">
              <Checkbox value="pool">Piscina</Checkbox>
              <Checkbox value="freeParking">Estacionamiento gratuito</Checkbox>
              <Checkbox value="crib">Cuna</Checkbox>
              <Checkbox value="gym">Gimnasio</Checkbox>
              <Checkbox value="breakfast">Desayuno</Checkbox>
              <Checkbox value="smokingAllowed">Apto para fumadores</Checkbox>
            </div>
            <div className="amenities-row">
              <Checkbox value="jacuzzi">Jacuzzi</Checkbox>
              <Checkbox value="electricCharger">Cargador para autos eléctricos</Checkbox>
              <Checkbox value="grill">Parrilla</Checkbox>
              <Checkbox value="fireplace">Chimenea interior</Checkbox>
            </div>
          </div>
          
        </Form.Item>

        <Form.Item
          label="Fechas Inicio/Fin"
          name="rentalDates"
          rules={[{ required: true, message: 'Por favor, ingresa las fechas de alquiler.' }]
        }
        >
        <RangePicker className="w-500"
        placeholder={['Fecha Inicio', 'Fecha Fin']}
        />
        </Form.Item>
 
        <div className="amenities-group">
        <div className="amenities-row"> 
  <Form.Item
    label="Check In"
    name="checkIn"
    rules={[{ required: true, message: 'Por favor, ingresa la hora de check-in.' }]
    }
    className="check-in-item" // Agrega una clase aquí
  >
    <Input.TextArea className="w-500"
        showCount
        maxLength={1000}
        autoSize={{ minRows: 5, maxRows: 20 }}
    />
  </Form.Item>
  </div> 
  <div className="amenities-row">       
  <Form.Item
    label="Check Out"
    name="checkOut"
    rules={[{ required: true, message: 'Por favor, ingresa la hora de check-out.' }]
  }
  >
    <Input.TextArea className="w-500"
        showCount
        maxLength={1000}
        autoSize={{ minRows: 5, maxRows: 20 }}
    />
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
