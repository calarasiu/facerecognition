import React,{Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";

const particlesOptions = {
  particles: {
    number:{
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor (){
    super();
    this.state = { 
      input: ''
    }
  }

  onButtonSubmit =()=>{
    console.log("click");
  }

  onInputChange = (event)=>{
    console.log(event.target.value);
  }
  render (){
    return (
      <div className="App">
        <Particles className = 'particles'
                params={particlesOptions}
              />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
        {/* {
            <FaceRecognition/>} */}
            
      </div>
    );
  }
}

export default App;
