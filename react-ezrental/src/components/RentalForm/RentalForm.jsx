import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Checkbox, DatePicker, message } from 'antd';
import UploadComponent from './UploadComponent';
import dayjs from "dayjs";
import { createResidence, getOneResidence, updateResidence } from '../../services/residences';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setIsEditingRentalForm } from '../../store/slices/editRentalFormSlice';
import { faL } from '@fortawesome/free-solid-svg-icons';
import './rentalFormStyles.css';

function RentalForm() {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [urls, setUrls] = useState([]);
  const [fileList, setFileList] = useState([]);

  let { id } = useParams();
  const isEdit = useSelector((state) => state.editRentalForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataAd, setDataAd] = useState([]);

  const [body, setBody] = useState({
    tituloResid: '',
    tipoResid: '',
    paisResid: '',
    ciudadResid: '',
    direcResid: '',
    camaResid: '',
    habitResid: '',
    banioResid: '',
    descripResid: '',
    huesMaxResid: '',
    diasMaxResid: '',
    diasMinResid: '',
    precioResid: '',
    checkInResid: '',
    checkOutResid: '',
    tipoAlojam: '',
    wifi: 'false',
    lavadora: 'false',
    cocina: 'false',
    televisor: 'false',
    aireAcond: 'false',
    psicina: 'false',
    jacuzzi: 'false',
    estacionamiento: 'false',
    gim: 'false',
    parrilla: 'false',
    camaras: 'false',
    detectorHumo: 'false',
    fechaIniciEst: null,
    fechaFinEst: null,
    imagen: urls,
  });



  const validarinputmayor0 = (_, value) => {
    if (value < 0) {
      return Promise.reject('Debe ser mayor o igual a 0');
    }
    return Promise.resolve();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value })
    // console.log(body);
  }

  const handleSelectChange = (value, name) => {
    /* console.log(value);
    console.log(name); */
    if (name === "tipoAlojam") {
      body["tipoAlojam"] = value
    } else if (name === "tipoResid") {
      body["tipoResid"] = value
    } else if (name === "estadoAnuncio") {
      body["estado"] = value
    }
    // console.log(body);
  }

  const handleCheckedChange = (name) => {
    setBody((prevBody) => ({
      ...prevBody,
      [name]: prevBody[name] === "true" ? "false" : "true",
    }))
  };

  const handleDateChange = (dates) => {
    const [initialDate, finalDate] = dates;
    const initialDateFormat = dayjs(initialDate).format('YYYY-MM-DD');
    const finalDateFormat = dayjs(finalDate).format('YYYY-MM-DD');
    setBody({
      ...body,
      fechaIniEst: initialDateFormat,
      fechaFinEst: finalDateFormat,
    })
  };

  console.log(dataAd);

  const onFinish = async () => {
    // const formData = new FormData();
    // formData.append(body);
    console.log(body);
    await createResidence(body);
    console.log(body);
    message.success("Anuncio creado exitosamente!");
  };

  const deleteFiels = () => {
    setFileList([]);
    setUrls([]);
  }

  return (
    <div /*style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"space-between"}}*/>
      <h1 className="form-title">Registro</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Título de la Residencia"
          rules={[{ required: true, message: 'Por favor, ingresa el título de la residencia.' }]
          }
        >
          <Input
            className="inputsize"
            name="tituloResid"
            placeholder="Introduce el título de la residencia"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Precio"
          rules={[{ required: true, message: 'Por favor, ingresa el precio de la residencia.' }, { validator: validarinputmayor0 }]}
        >
          <Input
            className="inputsize"
            name="precioResid"
            placeholder="Ingresa el precio de la residencia"
            type="number"
            addonBefore="Bs"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Tipo de Residencia"
          rules={[{ required: true, message: 'Por favor, selecciona el tipo de residencia.' }]
          }
        >
          <Select
            name="tipoResid"
            placeholder="Selecciona el tipo de residencia"
            onChange={(value) => handleSelectChange(value, "tipoResid")}
          >
            <Option value="Casa">Casa</Option>
            <Option value="Departamento">Departamento</Option>
            <Option value="Habitacion">Habitacion</Option>
            <Option value="Hotel">Hotel</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Tipo de Alojamiento"
          rules={[{ required: true, message: 'Por favor, selecciona el tipo de alojamiento.' }]}
        >
          <Select
            name="tipoAlojam"
            placeholder="Selecciona el tipo de alojamiento"
            onChange={(value) => handleSelectChange(value, "tipoAlojam")}
          >
            <Option value="Compartido">Compartido</Option>
            <Option value="Entero">Entero</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Número Máximo de Huéspedes"
          rules={[{ required: true, message: 'Por favor, ingresa el numero maximo de Huesped.' }, { validator: validarinputmayor0 }]
          }
        >
          <Input
            className="inputsize"
            name="huesMaxResid"
            placeholder="Ingresa el número máximo de huéspedes"
            type="number"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Número Máximo de dias"
          rules={[{ required: true, message: 'Por favor, ingresa el numero maximo de dias.' }, { validator: validarinputmayor0 }]
          }
        >
          <Input
            className="inputsize"
            name="diasMaxResid"
            placeholder="Ingresa el número máximo de dias"
            type="number"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Número Mínimo de dias"
          rules={[{ required: true, message: 'Por favor, ingresa el numero minimo de dias.' }, { validator: validarinputmayor0 }]
          }
        >
          <Input
            className="inputsize"
            name="diasMinResid"
            placeholder="Ingresa el número mínimo de dias"
            type="number"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="País"
          rules={[{ required: true, message: 'Por favor, ingresa el país.' }]
          }
        >
          <Input
            className="inputsize"
            name="paisResid"
            placeholder="Ingresa el país"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Ciudad"
          rules={[{ required: true, message: 'Por favor, ingresa la ciudad.' }]
          }
        >
          <Input
            className="inputsize"
            name="ciudadResid"
            placeholder="Ingresa la ciudad"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Dirección"
          rules={[{ required: true, message: 'Por favor, ingresa la dirección.' }]
          }
        >
          <Input
            className="inputsize"
            name="direcResid"
            placeholder="Ingresa la dirección de la residencia"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Número de Camas"
          rules={[{ required: true, message: 'Por favor, ingresa el número de camas.' }, { validator: validarinputmayor0 }]
          }
        >
          <Input
            className="inputsize"
            name="camaResid"
            placeholder="Ingresa el número de camas"
            type="number"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Número de Habitaciones"
          rules={[{ required: true, message: 'Por favor, ingresa el número de habitaciones.' }, { validator: validarinputmayor0 }]
          }
        >
          <Input
            className="inputsize"
            name="habitResid"
            placeholder="Ingresa el número de habitaciones"
            type="number"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Número de Baños"
          rules={[{ required: true, message: 'Por favor, ingresa el número de baños.' }, { validator: validarinputmayor0 }]
          }
        >
          <Input
            className="inputsize"
            name="banioResid"
            placeholder="Ingresa el número de baños"
            type="number"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Descripción del Espacio"
          rules={[{ required: true, message: 'Por favor, ingresa una descripción del espacio.' }]
          }
        >
          <Input.TextArea
            className="inputsize"
            name="descripResid"
            placeholder="Ingresa una descripción del espacio"
            showCount
            maxLength={1000}
            autoSize={{ minRows: 5, maxRows: 20 }}
            onChange={handleChange}
          />
        </Form.Item>

        <h2 className="form-title">Servicios</h2>
        <Form.Item
          label="Comodidades"
        >
          <div className="amenities-group">
            <div className="amenities-row">
              <Checkbox
                value="wifi"
                name="wifi"
                checked={body.wifi === "true"}
                onChange={() => { handleCheckedChange("wifi") }}
              >
                Wi-Fi
              </Checkbox>
              <Checkbox
                value="lavadora"
                name="lavadora"
                checked={body.lavadora === "true"}
                onChange={() => { handleCheckedChange("lavadora") }}
              >
                Lavadora
              </Checkbox>
              <Checkbox
                value="cocina"
                name="cocina"
                checked={body.cocina === "true"}
                onChange={() => { handleCheckedChange("cocina") }}
              >
                Cocina
              </Checkbox>
              <Checkbox
                value="aireAcond"
                name="aireAcond"
                checked={body.aireAcond === "true"}
                onChange={() => { handleCheckedChange("aireAcond") }}
              >
                Aire Acondicionado
              </Checkbox>
              <Checkbox
                value="televisor"
                name="televisor"
                checked={body.televisor === "true"}
                onChange={() => { handleCheckedChange("televisor") }}
              >
                Televisor
              </Checkbox>
            </div>
          </div>
        </Form.Item>

        <Form.Item
          label="Caracteristicas"
        >
          <div className="amenities-group">
            <div className="amenities-row">
              <Checkbox
                value="psicina"
                name="psicina"
                checked={body.psicina === "true"}
                onChange={() => { handleCheckedChange("psicina") }}
              >
                Piscina
              </Checkbox>
              <Checkbox
                value="jacuzzi"
                name="jacuzzi"
                checked={body.jacuzzi === "true"}
                onChange={() => { handleCheckedChange("jacuzzi") }}
              >
                Jacuzzi
              </Checkbox>
              <Checkbox
                value="estacionamiento"
                name="estacionamiento"
                checked={body.estacionamiento === "true"}
                onChange={() => { handleCheckedChange("estacionamiento") }}
              >
                Estacionamiento
              </Checkbox>
              <Checkbox
                value="gim"
                name="gim"
                checked={body.gim === "true"}
                onChange={() => { handleCheckedChange("gim") }}
              >
                Gimnasio
              </Checkbox>
              <Checkbox
                value="parrilla"
                name="parrilla"
                checked={body.parrilla === "true"}
                onChange={() => { handleCheckedChange("parrilla") }}
              >
                Parrilla
              </Checkbox>
            </div>
          </div>

        </Form.Item>

        <Form.Item
          label="Seguridad"
        >
          <div className="amenities-group">
            <div className="amenities-row">
              <Checkbox
                value="camaras"
                name="camaras"
                checked={body.camaras === "true"}
                onChange={() => { handleCheckedChange("camaras") }}
              >
                Cámara de seguridad
              </Checkbox>
              <Checkbox
                value="detectorHumo"
                name="detectorHumo"
                checked={body.detectorHumo === "true"}
                onChange={() => { handleCheckedChange("detectorHumo") }}
              >
                Detector de humo
              </Checkbox>
            </div>
          </div>

        </Form.Item>

        <div className="amenities-group">
          <div className="amenities-row">
            <Form.Item
              label="Check In"
              rules={[{ required: true, message: 'Por favor, ingresa la hora de check-in.' }]
              }
              className="check-in-item" // Agrega una clase aquí
            >
              <Input.TextArea
                className="inputsize"
                name="checkInResid"
                placeholder="Ingresa la hora de check-in"
                showCount
                maxLength={1000}
                autoSize={{ minRows: 5, maxRows: 20 }}
                onChange={handleChange}
              />
            </Form.Item>

          </div>
          <div className="amenities-row">
            <Form.Item
              label="Check Out"
              rules={[{ required: true, message: 'Por favor, ingresa la hora de check-out.' }]
              }
            >
              <Input.TextArea
                className="inputsize"
                name="checkOutResid"
                placeholder="Ingresa la hora de check-out"
                showCount
                maxLength={1000}
                autoSize={{ minRows: 5, maxRows: 20 }}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item>
              <UploadComponent
                urls={urls}
                setUrls={setUrls}
                fileList={fileList}
                setFileList={setFileList}
              />
            </Form.Item>

          </div>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Completar
          </Button>
          <Button htmlType="button" onClick={deleteFiels}>
            Cancelar
          </Button>
        </Form.Item>

      </Form>
    </div>
  );

}
export default RentalForm;
