import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/users";
import { getPublishedResidencesByUser } from "../services/residences";
import { Avatar, Empty, List } from "antd";
import GuestCard from "../components/GuestCard/GuestCard";
import ReviewsList from "../components/ReviewsList/ReviewsList";
import { useAuth } from "../contexts/authContext";


function UserProfile() {
  let { userId } = useParams();
  const {user} = useAuth();
  const [userData, setUserData] = useState({});
  const [residences, setResidences] = useState([]);

  useEffect(() => {
    getUser(userId).then((data) => setUserData(data));
  }, [userId]);

  useEffect(() => {
    getPublishedResidencesByUser(userId).then((data) => setResidences(data));
  }, [userId]);
console.log(residences);
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
              El usuario no tiene residencias en alquiler
            </span>
          }
        >
        </Empty>
      </>),
  };

  const reseñasComoHuespedSimul = [
    {
        mensaje: "FEO EL LUGAR",
        resñador: "Juanito pepe"
    }, {
        mensaje: "LINDO EL LUGAR",
        resñador: " pepe"
    }, {
        mensaje: "AAAXD EL LUGAR",
        resñador: "Super pepe"
    }, {
        mensaje: "DONDE QUEDA EL LUGAR",
        resñador: "Jacintoe"
    }, 
  ]

  const reseñasComoHostSimul = "OBTENIDO DE RESEÑAS DE RESIDENCIAS";

  return(
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '1100px', maxWidth: '1100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', borderBottom: '2px solid var(--ikx-k-pe)' }}>Datos del usuario</h2>
{
    userData && userData.codigo_usuario ? (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            border: '2px solid var(--ikx-k-pe)', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
            <div style={{ marginRight: '20px' }}>
                <Avatar shape="circle" size={180} src={userData.foto_usuario} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }} />
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>Nombre de usuario:</strong> {userData.nombre_usuario}</p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>Correo electrónico:</strong> {userData.correo_usuario}</p>
                
            </div>
        </div>
    ) : null
}

        <h2 style={{ margin: 'auto', marginBottom: '20px' }}>Residencias del usuario</h2>
        
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
          }, pageSize: 4,
        }}
        
        locale={customEmptyMessage}
        
        dataSource={residences.filter(residence => residence.estado_residencia[0] === "Publicado" || residence.estado_residencia[0] === "Alquilado")}
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
              promedio={Number(residence.promedio).toFixed(1)}
              small
            />
            
          </List.Item>
        )}
      />
      <h2 style={{ margin: 'auto' }}>Reseñas del usuario</h2>

        {/* <ReviewsList 
            detailReviews={}
            averageRates={}
        /> */}

      </div>
    </div>
  );

}

export default UserProfile;
