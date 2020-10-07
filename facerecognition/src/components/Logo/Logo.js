import React from 'react';
import logo from './logo.png';
import './logo.css'

const Logo = ()=>{
  return (
    <div >
      <div style={{display: 'flex', justifyContent:'flex-start', marginLeft: '20px' }}>
        <div className='logo br3 ba b--black-10 mv4 w-50-m  mw5 shadow-5' style = {{ padding: '5px' }}><img src={logo} alt=""/></div>

      </div>
    </div>
  );
}

export default Logo;