import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Checkbox, DatePicker, message, Row, Col } from 'antd';
import UploadComponent from '../RentalForm/UploadComponent';
import dayjs from "dayjs";
import { getOneResidence, updateResidence } from '../../services/residences';
import { useNavigate, useParams } from 'react-router-dom';
// import '../RentalForm/rentalFormStyles.css';

function EditRentalForm() {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  let { id } = useParams();
  const [urls, setUrls] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [dataAd, setDataAd] = useState([]);
  const [editBody, setEditBody] = useState({
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
    wifi: '',
    lavadora: '',
    cocina: '',
    televisor: '',
    aireAcond: '',
    psicina: '',
    jacuzzi: '',
    estacionamiento: '',
    gim: '',
    parrilla: '',
    camaras: '',
    detectorHumo: '',
    estado: '',
    fechaIniciEst: '',
    fechaFinEst: ''
  });
  const navigate = useNavigate();
  const defaultValueRangePicker = [dayjs(editBody.fechaIniEst), dayjs(editBody.fechaFinEst)];

  const validarinputmayor0 = (_, value) => {
    if (value < 0) {
      return Promise.reject('Debe ser mayor o igual a 0');
    }
    return Promise.resolve();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBody({ ...editBody, [name]: value }),
      console.log(editBody)
  }

  const handleSelectChange = (value, name) => {
    /* console.log(value);
    console.log(name); */
    if (name === "tipoAlojam") {
      setEditBody({ ...editBody, [name]: value });
    } else if (name === "tipoResid") {
      setEditBody({ ...editBody, [name]: value });
    } else if (name === "estadoAnuncio") {
      setEditBody({ ...editBody, ["estado"]: value });
    }
    console.log(editBody);
  }

  const handleCheckedChange = (name) => {
    setEditBody((prevEditBody) => ({
      ...prevEditBody,
      [name]: prevEditBody[name] === "true" ? "false" : "true",
    }))
  };

  const handleDateChange = (dates) => {
    const [initialDate, finalDate] = dates;
    const initialDateFormat = dayjs(initialDate).format('YYYY-MM-DD');
    const finalDateFormat = dayjs(finalDate).format('YYYY-MM-DD');
    setEditBody({
      ...editBody,
      fechaIniEst: initialDateFormat,
      fechaFinEst: finalDateFormat,
    })
  };

  useEffect(() => {
    getOneResidence(id).then((data) => setDataAd(data));
  }, [])

  useEffect(() => {
    setEditBody({
      tituloResid: dataAd.titulo_residencia,
      tipoResid: dataAd.tipo_residencia,
      paisResid: dataAd.pais_residencia,
      ciudadResid: dataAd.ciudad_residencia,
      direcResid: dataAd.direccion_residencia,
      camaResid: dataAd.cama_residencia,
      habitResid: dataAd.habitacion_residencia,
      banioResid: dataAd.banio_residencia,
      descripResid: dataAd.descripcion_residencia,
      huesMaxResid: dataAd.huesped_max_residencia,
      diasMaxResid: dataAd.dias_max_residencia,
      diasMinResid: dataAd.dias_min_residencia,
      precioResid: dataAd.precio_residencia,
      checkInResid: dataAd.check_in_residencia,
      checkOutResid: dataAd.check_out_residencia,
      tipoAlojam: dataAd.tipo_alojamiento,
      wifi: dataAd.wifi_residencia,
      lavadora: dataAd.lavadora_residencia,
      cocina: dataAd.cocina_residencia,
      televisor: dataAd.televisor_residencia,
      aireAcond: dataAd.aire_acond_residencia,
      psicina: dataAd.psicina_residencia,
      jacuzzi: dataAd.jacuzzi_residencia,
      estacionamiento: dataAd.estacionamiento_residencia,
      gim: dataAd.gimnasio_residencia,
      parrilla: dataAd.parrilla_residencia,
      camaras: dataAd.camaras_segurid_residencia,
      detectorHumo: dataAd.humo_segurid_residencia,
      estado: dataAd.estado_residencia,
      fechaIniciEst: dataAd.fecha_inicio_estado,
      fechaFinEst: dataAd.fecha_fin_estado
    })
  }, [dataAd]);

  console.log(dataAd);
  console.log(editBody);

  const onFinish = async () => {
    await updateResidence(editBody, id);
    navigate("/mis-anuncios");
    message.success("Modificación exitosa!");
  };

  const deleteFiels = () => {
    setFileList([]);
    setUrls([]);
  }

  return (
    <>
      <h2>Formulario de Edición</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
      >

        <Form.Item
          label="Estado del anuncio"
          rules={[{ required: true, message: 'Por favor, selecciona un estado del anuncio.' }]}
        >
          <Select
            name="estadoAnuncio"
            value={editBody.estado}
            placeholder="Selecciona el estado del anuncio"
            onChange={(value) => handleSelectChange(value, "estadoAnuncio")}
          >
            <Option value="Publicado"> Publicado </Option>
            <Option value="Pausado"> Pausado </Option>
            <Option value="Inactivo"> Inactivo </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Título de la Residencia"
          rules={[{ required: true, message: 'Por favor, ingresa el título de la residencia.' }]
          }
        >
          <Input
            value={editBody.tituloResid}
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

            value={editBody.precioResid}
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
            value={editBody.tipoResid}
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
            value={editBody.tipoAlojam}
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

            value={editBody.huesMaxResid}
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

            name="diasMaxResid"
            value={editBody.diasMaxResid}
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

            name="diasMinResid"
            value={editBody.diasMinResid}
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

            name="paisResid"
            value={editBody.paisResid}
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

            name="ciudadResid"
            value={editBody.ciudadResid}
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

            name="direcResid"
            value={editBody.direcResid}
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

            name="camaResid"
            value={editBody.camaResid}
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

            name="habitResid"
            value={editBody.habitResid}
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

            name="banioResid"
            value={editBody.banioResid}
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

            name="descripResid"
            value={editBody.descripResid}
            placeholder="Ingresa una descripción del espacio"
            showCount
            maxLength={1000}
            autoSize={{ minRows: 5, maxRows: 20 }}
            onChange={handleChange}
          />
        </Form.Item>

        <h3 >Servicios</h3>
        <Form.Item
          label="Comodidades"
        >
          <div>
            <div>
              <Checkbox
                value="wifi"
                name="wifi"
                checked={editBody.wifi === "true"}
                onChange={() => { handleCheckedChange("wifi") }}
              >
                Wi-Fi
              </Checkbox>
              <Checkbox
                value="lavadora"
                name="lavadora"
                checked={editBody.lavadora === "true"}
                onChange={() => { handleCheckedChange("lavadora") }}
              >
                Lavadora
              </Checkbox>
              <Checkbox
                value="cocina"
                name="cocina"
                checked={editBody.cocina === "true"}
                onChange={() => { handleCheckedChange("cocina") }}
              >
                Cocina
              </Checkbox>
              <Checkbox
                value="aireAcond"
                name="aireAcond"
                checked={editBody.aireAcond === "true"}
                onChange={() => { handleCheckedChange("aireAcond") }}
              >
                Aire Acondicionado
              </Checkbox>
              <Checkbox
                value="televisor"
                name="televisor"
                checked={editBody.televisor === "true"}
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
          <div>
            <div>
              <Checkbox
                value="psicina"
                name="psicina"
                checked={editBody.psicina === "true"}
                onChange={() => { handleCheckedChange("psicina") }}
              >
                Piscina
              </Checkbox>
              <Checkbox
                value="jacuzzi"
                name="jacuzzi"
                checked={editBody.jacuzzi === "true"}
                onChange={() => { handleCheckedChange("jacuzzi") }}
              >
                Jacuzzi
              </Checkbox>
              <Checkbox
                value="estacionamiento"
                name="estacionamiento"
                checked={editBody.estacionamiento === "true"}
                onChange={() => { handleCheckedChange("estacionamiento") }}
              >
                Estacionamiento
              </Checkbox>
              <Checkbox
                value="gim"
                name="gim"
                checked={editBody.gim === "true"}
                onChange={() => { handleCheckedChange("gim") }}
              >
                Gimnasio
              </Checkbox>
              <Checkbox
                value="parrilla"
                name="parrilla"
                checked={editBody.parrilla === "true"}
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
          <div>
            <div>
              <Checkbox
                value="camaras"
                name="camaras"
                checked={editBody.camaras === "true"}
                onChange={() => { handleCheckedChange("camaras") }}
              >
                Cámara de seguridad
              </Checkbox>
              <Checkbox
                value="detectorHumo"
                name="detectorHumo"
                checked={editBody.detectorHumo === "true"}
                onChange={() => { handleCheckedChange("detectorHumo") }}
              >
                Detector de humo
              </Checkbox>
            </div>
          </div>

        </Form.Item>

        <Form.Item
          label="Fechas Inicio/Fin"
          rules={[{ required: true, message: 'Por favor, ingresa las fechas de alquiler.' }]
          }
        >
          <RangePicker
            placeholder={['Fecha Inicio', 'Fecha Fin']}
            value={defaultValueRangePicker}
            onChange={handleDateChange}
          />
        </Form.Item>

        <div>
          <div>
            <Form.Item
              label="Check In"
              rules={[{ required: true, message: 'Por favor, ingresa la hora de check-in.' }]
              }
            >
              <Input.TextArea
                name="checkInResid"
                value={editBody.checkInResid}
                placeholder="Ingresa la hora de check-in"
                showCount
                maxLength={1000}
                autoSize={{ minRows: 5, maxRows: 20 }}
                onChange={handleChange}
              />
            </Form.Item>

          </div>
          <div>
            <Form.Item
              label="Check Out"
              rules={[{ required: true, message: 'Por favor, ingresa la hora de check-out.' }]
              }
            >
              <Input.TextArea
                name="checkOutResid"
                value={editBody.checkOutResid}
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
            Guardar Cambios
          </Button>
          <Button htmlType="button" onClick={deleteFiels}>
            Cancelar
          </Button>
        </Form.Item>

      </Form>
    </>
  );

}
export default EditRentalForm;
