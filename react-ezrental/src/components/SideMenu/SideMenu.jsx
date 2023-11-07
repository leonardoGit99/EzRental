import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, FormOutlined } from '@ant-design/icons';
import './SideMenuStyles.css';
import Logo from '../Logo/Logo';


function SideMenu({ sideMenuCollapsed, displaySideMenu, switchMode, setSwitchMode }) {

  const itemsGuest = [
    { key: "/", label: (<Link to="/" onClick={!sideMenuCollapsed ? displaySideMenu: null}>Home</Link>), icon: <HomeOutlined /> },
  ];

  const itemsHost = [
    { key: "/", label: (<Link to="/" onClick={!sideMenuCollapsed ? displaySideMenu: null}>Home</Link>), icon: <HomeOutlined /> },
    {
      key: 2, label: 'Modo Anfitrion', icon: <FormOutlined />, children: [
        { key: "aniadir-anuncio", label: (<Link to="aniadir-anuncio" onClick={!sideMenuCollapsed ? displaySideMenu: null}>Añadir Anuncio</Link>) },
        { key: "mis-anuncios", label: (<Link to="mis-anuncios" onClick={!sideMenuCollapsed ? displaySideMenu: null}>Mis Anuncios</Link>) }
      ]
    },
  ];

  const location = useLocation();
  const currentRoute = location.pathname;

  // Eliminar la key seleccionada del almacenamiento local del navegador cada vez que se inicia la pagina
  localStorage.removeItem("selectedTab");

  // Obtener la key seleccionada del almacenamiento local del navegador
  const [selectedTab, setSelectedTab] = useState(localStorage.getItem("selectedTab") || currentRoute);
  localStorage.setItem("selectedTab", selectedTab);
  // Actualizar la key seleccionada en el almacenamiento local del navegador

  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  return (
    <div className={`side-menu-container ${sideMenuCollapsed ? "side-menu-container--collapsed" : ""}`}>
      <div className='button-logo-container'>
        <Button
          className="side-menu__menu-btn--active"
          onClick={displaySideMenu}>
          {sideMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        {sideMenuCollapsed ? null : <Logo />}
      </div>
      <hr />
      <Menu
        className="side-menu__menu-items"
        theme="dark"
        items={switchMode? itemsHost: itemsGuest}
        onClick={(e) => setSelectedTab(e.key)}
        defaultSelectedKeys={[selectedTab]}
        mode="inline"
      />
    </div>
  );
};


export default SideMenu;
