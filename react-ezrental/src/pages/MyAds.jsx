import React, { useEffect, useState } from 'react';
import { Empty, List } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import homePageEnDesarrollo from '../assets/homePageEnDesarrollo.jpg';
import HostCard from '../components/HostCard/HostCard';
import { getAllResidences, getImagesByResidence } from '../services/residences';

function MyAds() {
  const [residences, setResidences] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
/*   const [urls, setUrls] = useState([]);
  const [fileList, setFileList] = useState([]); */

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  useEffect(() => {
    if (isRefresh) {
      getAllResidences().then((data) => setResidences(data));
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);

/*    useEffect(() => {
    const fetchData = async () => {
      const data = await getImagesByResidence(8);
      setUrls(data);
      setFileList(data.map((link, index) => ({
        uid: `-1-${index}`,
        name: `File ${index}`,
        status: 'done',
        url: link,
      }))
      )
    }
    fetchData();
  }, [residences.id]);  */

  const customEmptyMessage = {
    emptyText: (
      <>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              No existen Anuncios registrados
            </span>
          }
        >
        </Empty>
      </>),
  }

  return (
    <>
      <List
        grid={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        pagination={{
          onChange: page => {
            console.log(page);
          }, pageSize: 8,
        }}
        locale={customEmptyMessage}
        dataSource={residences}
        renderItem={(residence) => (
          <List.Item
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }
            }>
            <HostCard
              idResidencia={residence.id_residencia}
              imagen={residence.imagenes[0]}
              titulo={residence.titulo_residencia}
              ciudad={residence.ciudad_residencia}
              pais={residence.pais_residencia}
              fechaIni={residence.fecha_inicio_estado[0] ? residence.fecha_inicio_estado[0].split('T')[0].toString() : 'Sin fecha'}
              fechaFin={residence.fecha_fin_estado[0] ? residence.fecha_fin_estado[0].split('T')[0].toString() : 'Sin fecha'}
              precio={residence.precio_residencia}
              estadoResidencia={residence.estado_residencia[0]}
              isRefresh={isRefresh}
              setRefresh={setRefresh}
            />
          </List.Item >
        )}
      />
    </>
  );
};

export default MyAds;