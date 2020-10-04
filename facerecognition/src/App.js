import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
};

function App() {
  return (
    <div className="App">
      <Particles className = 'particles'
              params={particlesOptions}
            />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      {/* {
          <FaceRecognition/>} */}
          
    </div>
  );
}

export default App;
