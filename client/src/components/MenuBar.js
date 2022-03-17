import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MenuBar() {
  const {userData, logout} = useContext(AuthContext);

    const pathName = window.location.pathname;
    const path = pathName === '/' ? 'home' : pathName.substring(1); // login, register, ...etc if we navigate manually
    
    const [activeItem, setActivItem] = useState(path);


  const handleItemClick = (e, { name }) => setActivItem(name);

  const userMenu = userData ? (
    <Menu pointing secondary size='massive' color='teal'>
    <Menu.Item
      name={userData.userName}
      active
      as={Link}
      to='/'
    />
    <Menu.Menu position='right'>
      <Menu.Item
        name='Logout'
        onClick={logout}
      />
    </Menu.Menu>
  </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
    <Menu.Item
      name='home'
      active={activeItem === 'home'}
      onClick={handleItemClick}
      as={Link}
      to='/'
    />
    <Menu.Menu position='right'>
    <Menu.Item
      name='login'
      active={activeItem === 'login'}
      onClick={handleItemClick}
      as={Link}
      to='/login'
    />
      <Menu.Item
        name='register'
        active={activeItem === 'rsgister'}
        onClick={handleItemClick}
        as={Link}
        to='/register'
      />
    </Menu.Menu>
  </Menu>
  )

    return userMenu;
}