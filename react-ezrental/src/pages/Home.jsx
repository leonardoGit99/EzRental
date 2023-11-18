import { useEffect, useState } from 'react';
import { List } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import GuestCard from '../components/GuestCard/GuestCard';
import { getAllResidences } from '../services/residences';

import FilterContent from '../components/FilterContent/FilterContent'

function Home() {
  const [ filtros, setFiltros ] = useState({})
  const [residences, setResidences] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  useEffect(() => {
    if (isRefresh) {
      getAllResidences().then((data) => setResidences(data))
      setRefresh(false);
    }
  }, [setRefresh, isRefresh]);


  function aplicarFiltros(residencias, filtro) {
    return residencias.filter(residencia => {
      if (filtro?.lugar) {
        if (filtro?.lugar?.pais && residencia?.pais_residencia !== filtro?.lugar?.pais) {
          return false;
        }
        if (filtro?.lugar?.ciudad && residencia?.ciudad_residencia !== filtro?.lugar?.ciudad) {
          return false;
        }
      }

      if (filtro.ragoPrecio) {
        const precio = residencia.precio_residencia || 0;
        if (
          (filtro.ragoPrecio?.min && precio < filtro.ragoPrecio?.min) ||
          (filtro.ragoPrecio?.max && precio > filtro.ragoPrecio?.max)
        ) {
          return false;
        }
      }

      // Filtrar por rango de fechas
      if (filtro.rangoData) {
        const fechaInicioCliente = parseISO(filtro.rangoData?.inicio);
        const fechaFinCliente = parseISO(filtro.rangoData?.final);
        const fechaInicioServidor = parseISO(residencia.fecha_inicio_estado[0]);
        const fechaFinServidor = parseISO(residencia.fecha_fin_estado[0]);

        if (
          !isWithinInterval(fechaInicioServidor, { start: fechaInicioCliente, end: fechaFinCliente }) ||
          !isWithinInterval(fechaFinServidor, { start: fechaInicioCliente, end: fechaFinCliente })
        ) {
          return false;
        }
      }

      // Filtrar por cantidad de habitaciones
      if (filtro.personas) {
        const totalHabitaciones = residencia.habitacion_residencia || 0;
        const totalPersonas = filtro.personas.reduce((total, persona) => total + persona.count, 0) || 0;

        if (totalHabitaciones < totalPersonas) {
          return false;
        }
      }

      return true;
    });
  }

  const customEmptyMessage = {
    emptyText: (
      <div>
        <ExclamationCircleOutlined /><br />
        No existen residencias
      </div>),
  };

  return (
    <>
      <FilterContent setFiltros={setFiltros} />
      <List
        grid={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6
        }}
        pagination={{
          onChange: page => {
            console.log(page);
          }, pageSize: 15,
        }}
        locale={customEmptyMessage}
        dataSource={aplicarFiltros(residences.filter(residence => residence.estado_residencia[0] === "Publicado"), filtros)}
        renderItem={(residence) => (
          <List.Item
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }
            }
          >
            <GuestCard
              idResidencia={residence.id_residencia}
              imagen={residence.imagenes[0]}
              titulo={residence.titulo_residencia}
              ciudad={residence.ciudad_residencia}
              pais={residence.pais_residencia}
              fechaIni={residence.fecha_inicio_estado[0] ? residence.fecha_inicio_estado[0].split('T')[0].toString() : 'Sin fecha'}
              fechaFin={residence.fecha_fin_estado[0] ? residence.fecha_fin_estado[0].split('T')[0].toString() : 'Sin fecha'}
              precio={residence.precio_residencia}
              setRefresh={setRefresh}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default Home;