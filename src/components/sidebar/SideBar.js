import React from 'react';
import { Menu } from 'semantic-ui-react';
import './SideBar.css';
import UserInfo from './userinfo/UserInfo';
import Channels from './channels/Channels';

export const SideBar = () =>{

    return(
        <Menu vertical fixed="left" borderless size="large" className="side__bar">
            <UserInfo/>
            <Channels/>
        </Menu>
    )
}