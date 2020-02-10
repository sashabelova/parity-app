import React from 'react';
import { Link } from 'react-router-dom';

const preload = {
  data: [
    {
      id: '001',
      name: 'Home',
      url: '/',
      active: true
    },
    {
      id: '002',
      name: 'Chart',
      url: '/chart',
      active: false
    }
  ]
};

const SidebarItems = props => {
  return (
    <ul>
      {props.items.data.map(item => (
        <React.Fragment key={item.id}>
          <li>
            <Link to={item.url}>{item.name}</Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

const Sidebar = () => (
  <nav>
    <SidebarItems items={preload} />
  </nav>
);

export default Sidebar;
