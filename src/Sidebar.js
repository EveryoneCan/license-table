import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faBox, 
  faUsers, 
  faFlag, 
  faLanguage, 
  faSchool, 
  faMap, 
  faSearch, 
  faFile, 
  faAd,
  faLock 
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const items = [
    { label: 'Dashboard', icon: faTachometerAlt, path: '/' },
    { label: 'Products', icon: faBox, path: '/products' },
    { label: 'Users', icon: faUsers, path: '/users' },
    { label: 'Countries', icon: faFlag, path: '/countries' },
    { label: 'Languages', icon: faLanguage, path: '/languages' },
    { label: 'Institutions', icon: faSchool, path: '/institutions' },
    { label: 'Areas', icon: faMap, path: '/areas' },
    { label: 'SEO', icon: faSearch, path: '/seo' },
    { label: 'Licenses', icon: faFile, path: '/licenses' },
    { label: 'Banners', icon: faAd, path: '/banners' },
    { label: 'ACL', icon: faLock, path: '/acl' },
  ];

  return (
    <div className="sidebar">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>
              <FontAwesomeIcon icon={item.icon} /> {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;