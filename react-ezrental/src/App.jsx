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
import MoreInfoAds from './pages/MoreInfoAds';
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
              <Route index path="/" element={<Home />} />
              <Route path="/aniadir-anuncio" element={<RentalForm />} />
              <Route path="/mis-anuncios" element={<MyAds />} />
              <Route path="/mis-anuncios/:id" element={<MoreInfoMyAds />} />
              <Route path="/:id" element={<MoreInfoAds />} />
              <Route path="/editar-anuncio/:id" element={<RentalForm />} />
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
