import { useEffect, useState } from 'react';
import RainbowBackground from '../RainbowBackground';
import './style.css';

const Nav = () => {

  const links = [
    {
      title:'Biografía',
      tag:'biography'
    },
  ]
  useEffect(() => {
    const fetch = async () => {
      try {
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetch();
  }, []); 

  return (
    <nav className="Nav">
      <div className="Nav__logo">Archivo</div>
      <RainbowBackground />
      <div className='RainbowBackground'>
        <RainbowBackground />
      </div>
      <ul className="Nav__list">
        {links?.map((link)=>(
          <li className="Nav__item">
            <a href={`/${link.tag}`} className="Nav__link">
              {link.title}
            </a>
          </li>
        ))}
        
      </ul>
    </nav>
  );
};

export default Nav;
