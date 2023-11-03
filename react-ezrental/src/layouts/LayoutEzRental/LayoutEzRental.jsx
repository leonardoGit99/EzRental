import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import SideMenu from '../../components/SideMenu/SideMenu';
import PagesContainer from '../../components/PagesContainer/PagesContainer';
import FooterContent from '../../components/FooterContent/FooterContent';
import './layoutEzRentalStyles.css';


function LayoutEzRental() {
  const { Header, Content, Sider, Footer } = Layout;

  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(true);

  const displaySideMenu = () => {
    setSideMenuCollapsed(!sideMenuCollapsed);
  };

  return (
    <Layout className="app-layout-container">
      <Sider className={`app-sider-container ${sideMenuCollapsed ? "app-sider-container--collapsed" : ""}`} collapsed={sideMenuCollapsed} width={'18%'} collapsedWidth={'70'}  >
        <SideMenu sideMenuCollapsed={sideMenuCollapsed} displaySideMenu={displaySideMenu} />
      </Sider>
      <Layout /* onClick={!sideMenuCollapsed ? displaySideMenu: null} */>
        <Header className="app-header-container">
          <HeaderContent sideMenuCollapsed={sideMenuCollapsed} displaySideMenu={displaySideMenu} />
        </Header>
        <Content className="app-content-container" >
          <PagesContainer>
            {/* 
              Contenido de las distintas vistas mediante rutas.
              El componente Outlet de react-router-dom funciona como un placeholder,
              en el que se reemplazá las distintas rutas declaradas en el componente
              principal App
            */}
            <Outlet />
          </PagesContainer>
        </Content>
        <Footer className="app-footer-container">
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};


export default LayoutEzRental;
