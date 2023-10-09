import React from 'react';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './headerContentStyles.css';

function HeaderContent({ sideMenuCollapsed, displaySideMenu }) {


    return (
        <div className="header-container">
            <div>
                <Button
                    className="header__menu-btn--inactive"
                    type="primary"
                    onClick={displaySideMenu}>
                    {sideMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
            <div className="title-web-site-container">
                <h1>Sistema de Alquileres</h1>
            </div>
        </div>
    );
}


export default HeaderContent;