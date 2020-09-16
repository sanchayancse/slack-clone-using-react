import React from 'react';
import { Menu } from 'semantic-ui-react';
import './SideBar.css';
import UserInfo from './userinfo/UserInfo';

export const SideBar = () =>{

    return(
        <Menu vertical fixed="left" borderless size="large" className="side__bar">
            <UserInfo/>
        </Menu>
    )
}