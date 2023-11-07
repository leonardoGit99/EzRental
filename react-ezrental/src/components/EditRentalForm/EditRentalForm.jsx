import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Checkbox, DatePicker, message, Divider } from 'antd';
import { getImagesByResidence, getOneResidence, updateResidence } from '../../services/residences';
import UploadComponent from '../RentalForm/UploadComponent';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";
import "./editRentalFormStyles.css"

function EditRentalForm() {
  let { idMyAd } = useParams();
  const navigate = useNavigate();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [urls, setUrls] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [dataAd, setDataAd] = useState([]);
  const [imgsResidence, setImgsResidence] = useState([]);
  const [form] = Form.useForm();
  const [isAtLeastFiveChecked, setIsAtLeastFiveChecked] = useState(false);
  const [rangeDatesBody, setRangeDatesBody] = useState([null, null]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const setImageUploaded = (status) => {
    setIsImageUploaded(status)
  }
  console.log(rangeDatesBody);
  const [editBody, setEditBody] = useState({
    /*     tituloResid: '',
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
        fechaIniEst: '',
        fechaFinEst: '',
        imagen: urls */
  });

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
    if (name === "tipoAlojam") {
      setEditBody({ ...editBody, [name]: value });
    } else if (name === "tipoResid") {
      setEditBody({ ...editBody, [name]: value });
    } else if (name === "estadoAnuncio") {
      setEditBody({ ...editBody, ["estado"]: value });
    } else if (name === "paisResid") {
      setEditBody({ ...editBody, [name]: value, ciudadResid: null });
    } else if (name === "ciudadResid") {
      setEditBody({ ...editBody, [name]: value });
    }
    console.log(editBody);
  }

  const handleCheckedChange = (name) => {
    setEditBody((prevEditBody) => {
      const updatedEditBody = {
        ...prevEditBody,
        [name]: prevEditBody[name] === "true" ? "false" : "true",
      };
      console.log(updatedEditBody);
      const atLeastFiveChecked = Object.values(updatedEditBody).filter(((value) => value === "true")).length >=5; //Object.values(updatedEditBody).some((value) => value === "true");
      setIsAtLeastFiveChecked(atLeastFiveChecked);
      return updatedEditBody;
    });
  };


  const handleDateChange = (dates) => {
    const [initialDate, finalDate] = dates;
    console.log(initialDate);
    const rangeDatesFormat = [dayjs(initialDate, 'YYYY-MM-DD'), dayjs(finalDate, 'YYYY-MM-DD')]
    setEditBody((prevEditBody) => {
      const updatedEditBody = {
        ...prevEditBody, rangeDates: rangeDatesFormat,
      }
      setRangeDatesBody(updatedEditBody.rangeDates);
      return updatedEditBody;
    })
  };

  const countryToCities = {
    Bolivia: ["La Paz", "Oruro", "Potosí", "Chuquisaca", "Cochabamba", "Tarija", "Santa Cruz", "Beni", "Pando"],
    Perú: ["Amazonas", "Arequipa", "Ayacucho", "Cusco", "Junin", "Puno", "San Martín", "Piura", "Tacna", "Lima"],
    Chile: ["Santiago de Chile", "Iquique", "Antofagasta", "Valparaíso", "Concepción", "Temuco", "Punta Arenas"]
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOneResidence(idMyAd);
      setDataAd(data);
    }
    fetchData();
  }, [idMyAd])



  useEffect(() => {
    const fetchImgs = async () => {
      const data = await getImagesByResidence(idMyAd);
      setUrls(data);
      setFileList(data.map((link, index) => ({
        uid: `-1-${index}`,
        name: `File ${index}`,
        status: 'done',
        url: link,
      }))
      )
    }
    setIsImageUploaded(true);
    fetchImgs();
  }, [idMyAd]);

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
      fechaIniEst: dataAd.fecha_inicio_estado,
      fechaFinEst: dataAd.fecha_fin_estado,
      imagen: urls, 
      rangeDates: [dayjs(dataAd.fecha_inicio_estado), dayjs(dataAd.fecha_fin_estado)],
    })
    setIsAtLeastFiveChecked(true);
  }, [dataAd, urls]);

  useEffect(() => {
    form.setFieldsValue(editBody);
  }, [editBody]);


  const onFinish = async () => {
    try {
      if (editBody.estado === "Inactivo") {
        editBody.fechaIniEst = null;
        editBody.fechaFinEst = null;
      } else if ((rangeDatesBody[0] && rangeDatesBody[1]) !== null) {
        editBody.fechaIniEst = rangeDatesBody[0];
        editBody.fechaFinEst = rangeDatesBody[1];
      }
      delete editBody.rangeDates;
      await updateResidence(editBody, idMyAd);
      navigate("/mis-anuncios");
      message.success("Modificación exitosa!");
    } catch (error) {
      message.error("Algo salió mal. Inténtelo más tarde");
    }
  };

  const onCancel = () => {
    navigate("/mis-anuncios");
    message.info("No se realizó ninguna modificación", 2);
  }

  return (
    <>
      <div className="edit-form-container">
        <h2>Formulario de Edición</h2>
        <Divider dashed />
        <Form
          name="formularioEdicion"
          labelCol={{ span: 9 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          onFinish={onFinish}
        >
          <div className="flex-container-col-1-2-edit-form">
            <div className='col-1-edit-form'>
              <Form.Item
                label="Estado del anuncio"
                name="estado"
                rules={[{ required: true, message: 'Por favor, selecciona un estado del anuncio.' }]}

              >
                <Select
                  className="select"
                  placeholder="Selecciona el estado del anuncio"
                  onChange={(value) => handleSelectChange(value, "estadoAnuncio")}
                >
                  <Option value="Publicado"> Publicado </Option>
                  <Option value="Pausado"> Pausado </Option>
                  <Option value="Inactivo"> Inactivo </Option>
                </Select>
              </Form.Item>
              <h3>Datos de la residencia</h3>
              <Form.Item
                name="tituloResid"
                label="Título de la Residencia"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "En Construcción") || (editBody.estado === "Previsualización") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa el título de la residencia.' }]
                }
                hasFeedback
              >
                <Input
                  name="tituloResid"
                  className='input'
                  placeholder="Introduce el título de la residencia"
                  showCount
                  maxLength={50}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Descripción del Espacio"
                name="descripResid"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa una descripción del espacio.' }]
                }
                hasFeedback
              >
                <Input.TextArea
                  name="descripResid"
                  className='textArea'
                  placeholder="Ingresa una descripción del espacio"
                  showCount
                  maxLength={200}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="direcResid"
                label="Dirección"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa la dirección.' }]
                }
                hasFeedback
              >
                <Input
                  name="direcResid"
                  className='input'
                  placeholder="Ingresa la dirección de la residencia"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="paisResid"
                label="País"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, seleccione un país.' }]
                }
                hasFeedback
              >
                <Select
                  className="select"
                  placeholder="Selecciona tu país"
                  options={Object.keys(countryToCities).map((country) => {
                    return {
                      label: `${country}`,
                      value: `${country}`,
                    };
                  })}
                  onChange={(value) => handleSelectChange(value, "paisResid")}
                >
                </Select>
              </Form.Item>

              <Form.Item
                name="ciudadResid"
                label="Ciudad"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, seleccione una ciudad.' }]
                }
                hasFeedback
              >
                <Select
                  className="select"
                  placeholder="Selecciona tu ciudad"
                  options={
                    countryToCities[editBody.paisResid]?.map((city) => ({
                      label: `${city}`,
                      value: `${city}`
                    }))
                  }
                  onChange={(value) => handleSelectChange(value, "ciudadResid")}
                >
                </Select>
              </Form.Item>

              {/* <Form.Item
                name="paisResid"
                label="País"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa el país.' }]
                }
                hasFeedback
              >
                <Input
                  name="paisResid"
                  className='input'
                  placeholder="Ingresa el país"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="ciudadResid"
                label="Ciudad"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa la ciudad.' }]
                }
                hasFeedback
              >
                <Input
                  name="ciudadResid"
                  className='input'
                  placeholder="Ingresa la ciudad"
                  onChange={handleChange}
                />
              </Form.Item> */}

              <Form.Item
                name="precioResid"
                label="Precio"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa el precio de la residencia.' }, { validator: validarinputmayor0 }]}
                hasFeedback
              >
                <Input
                  name="precioResid"
                  className="input"
                  placeholder="Ingresa el precio de la residencia"
                  type="number"
                  addonBefore="Bs"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="tipoResid"
                label="Tipo de Residencia"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, selecciona el tipo de residencia.' }]
                }
                hasFeedback
              >
                <Select
                  className="select"
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
                name="tipoAlojam"
                label="Tipo de Alojamiento"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, selecciona el tipo de alojamiento.' }]}
                hasFeedback
              >
                <Select
                  className="select"
                  placeholder="Selecciona el tipo de alojamiento"
                  onChange={(value) => handleSelectChange(value, "tipoAlojam")}
                >
                  <Option value="Compartido">Compartido</Option>
                  <Option value="Entero">Entero</Option>
                </Select>
              </Form.Item>


              <Form.Item
                name="diasMaxResid"
                label="Número Máximo de dias"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa el numero maximo de dias.' }, { validator: validarinputmayor0 }]
                }
                hasFeedback
              >
                <Input
                  name="diasMaxResid"
                  className='input'
                  placeholder="Ingresa el número máximo de dias"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="diasMinResid"
                label="Número Mínimo de dias"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa el numero minimo de dias.' }, { validator: validarinputmayor0 }]
                }
                hasFeedback
              >
                <Input
                  name="diasMinResid"
                  className='input'
                  placeholder="Ingresa el número mínimo de dias"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="huesMaxResid"
                label="Número Máximo de Huéspedes"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa el numero maximo de Huesped.' }, { validator: validarinputmayor0 }]
                }
                hasFeedback
              >
                <Input
                  name="huesMaxResid"
                  className='input'
                  placeholder="Ingresa el número máximo de huéspedes"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="camaResid"
                label="Número de Camas"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa el número de camas.' }, { validator: validarinputmayor0 }]
                }
                hasFeedback
              >
                <Input
                  name="camaResid"
                  className='input'
                  placeholder="Ingresa el número de camas"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="habitResid"
                label="Número de Habitaciones"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa el número de habitaciones.' }, { validator: validarinputmayor0 }]
                }
                hasFeedback
              >
                <Input
                  name="habitResid"
                  className='input'
                  placeholder="Ingresa el número de habitaciones"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name="banioResid"
                label="Número de Baños"
                rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa el número de baños.' }, { validator: validarinputmayor0 }]
                }
                hasFeedback
              >
                <Input
                  name="banioResid"
                  className='input'
                  placeholder="Ingresa el número de baños"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Item>

            </div>
            <div className="col-2-edit-form">
              <h3>Servicios</h3>
              <Form.Item
                name="servicios"
                label="Comodidades"
                rules={[
                  { required: ((editBody.estado === "Publicado") || (editBody.estado === "En Construcción") || (editBody.estado === "Previsualización") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")) && !isAtLeastFiveChecked },
                  {
                    validator: (_, values) => {
                      if (isAtLeastFiveChecked) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject();
                      }
                    }
                  }
                ]}
              >
                <div className="amenities-group">
                  <div className="amenities-row">
                    <Checkbox
                      value="wifi"
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
                name="servicios"
                label="Caracteristicas"
                rules={[
                  { required: ((editBody.estado === "Publicado") || (editBody.estado === "En Construcción") || (editBody.estado === "Previsualización") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")) && !isAtLeastFiveChecked },
                  {
                    validator: (_, values) => {
                      if (isAtLeastFiveChecked) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject();
                      }
                    }
                  }
                ]}
              >
                <div className="amenities-group">
                  <div className="amenities-row">
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
                name="servicios"
                label="Seguridad"
                rules={[
                  { required: ((editBody.estado === "Publicado") || (editBody.estado === "En Construcción") || (editBody.estado === "Previsualización") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")) && !isAtLeastFiveChecked },
                  {
                    validator: (_, values) => {
                      if (isAtLeastFiveChecked) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("Por favor, seleccione al menos un servicio");
                      }
                    }
                  }
                ]}
              >
                <div className="amenities-group">
                  <div className="amenities-row">
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

              { editBody.estado !== "En Construcción" && editBody.estado !== "Previsualización" && editBody.estado !== "Inactivo" ?
                (
                  <div className="dates-edit-form-container">
                    <h3>Fechas de duracion del anuncio</h3>
                    <Form.Item
                      name="rangeDates"
                      label="Fechas Inicio/Fin"
                      rules={[
                        { required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado")), message: "" },
                        {
                          validator: (_, values) => {
                            if ((rangeDatesBody[0] && rangeDatesBody[1]) !== null) {
                              editBody.fechaIniEst = rangeDatesBody[0];
                              editBody.fechaFinEst = rangeDatesBody[1];
                              if ((editBody.fechaIniEst && editBody.fechaFinEst) !== null) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject("Por favor, seleccione fechas");
                              }
                            } else if ((editBody.fechaIniEst && editBody.fechaFinEst) !== null) {
                              return Promise.resolve();
                            } else {
                              return Promise.reject("Por favor, seleccione fechas");
                            }

                          }
                        }
                      ]}
                      hasFeedback
                    >
                      <RangePicker
                        className="range-picker-edit-form"
                        placeholder={['Fecha Inicio', 'Fecha Fin']}
                        onChange={handleDateChange}
                        disabledDate={(current) => {
                          return dayjs().add(-1, 'days') >= current;
                        }}
                      />
                    </Form.Item>
                  </div>
                ) : null
              }


              <div className="checkin-checkout-edit-form-container">
                <h3> Instrucciones de Check In y Check Out</h3>
                <Form.Item
                  name="checkInResid"
                  label="Check In"
                  rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa la hora de check-in.' }]
                  }
                  hasFeedback
                >
                  <Input.TextArea
                    name="checkInResid"
                    className='textArea'
                    placeholder="Ingresa la hora de check-in"
                    showCount
                    maxLength={800}
                    autoSize={{ minRows: 8, maxRows: 8 }}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item
                  name="checkOutResid"
                  label="Check Out"
                  rules={[{ required: ((editBody.estado === "Publicado") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")), message: 'Por favor, ingresa la hora de check-out.' }]
                  }
                  hasFeedback
                >
                  <Input.TextArea
                    name="checkOutResid"
                    className='textArea'
                    placeholder="Ingresa la hora de check-out"
                    showCount
                    maxLength={800}
                    autoSize={{ minRows: 8, maxRows: 8 }}
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="imgs-edit-form-flex-container">
            <Form.Item
              name="imagen"
              rules={[
                { required: ((editBody.estado === "Publicado") || (editBody.estado === "En Construcción") || (editBody.estado === "Previsualización") || (editBody.estado === "Pausado") || (editBody.estado === "Inactivo")) && !isImageUploaded },
                {
                  validator: (_, value) => {
                    if (isImageUploaded) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Por favor, suba una imagen");
                    }
                  }
                }
              ]}
            >
              <UploadComponent
                urls={urls}
                setUrls={setUrls}
                fileList={fileList}
                setFileList={setFileList}
                setImageUploaded={setImageUploaded}
              />
            </Form.Item>
          </div>
          <Divider dashed />
          <Form.Item>
            <div className="btns-edit-form-flex-container">
              <div>
                <Button type="primary" htmlType="submit">
                  Guardar Cambios
                </Button>
              </div>
              <div>
                <Button style={{ width: '10vw' }} htmlType="button" onClick={onCancel}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Form.Item>

        </Form >
      </div >
    </>
  );

}
export default EditRentalForm;
