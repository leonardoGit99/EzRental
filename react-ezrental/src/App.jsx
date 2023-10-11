import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import HeaderContent from './components/HeaderContent/HeaderContent';
import SideMenu from './components/SideMenu/SideMenu';
import PagesContainer from './components/PagesContainer/PagesContainer';
import FooterContent from './components/FooterContent/FooterContent';
import Home from './pages/Home';
import RentalForm from './components/RentalForm/RentalForm';
import MyAds from './pages/MyAds';
import MoreInfoMyAds from './pages/MoreInfoMyAds';
import './App.css';


function App() {
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
            {/* Contenido de las distintas vistas mediante rutas */}
            <Routes>
              <Route index path="/home" element={<Home />} />
              <Route path="/aniadirAnuncio" element={<RentalForm />} />
              <Route path="/misAnuncios" element={<MyAds />} />
              <Route path="/misAnuncios/:detalleAnuncio" element={<MoreInfoMyAds />} />
            </Routes>
          </PagesContainer>
        </Content>
        <Footer className="app-footer-container">
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};


export default App;
