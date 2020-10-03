import React from 'react';
import logo from './logo.png';
import './logo.css'

const Logo = ()=>{
  return (
    <div>
      <div style={{display: 'flex', justifyContent:'flex-start', marginLeft: '20px' }}>
        <div className='logo' style = {{border:'2px solid black', padding: '5px' }}><img src={logo} alt=""/></div>

      </div>
    </div>
  );
}

export default Logo;