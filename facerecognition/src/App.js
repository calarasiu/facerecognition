import React,{Component} from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: '31718e36cfea4dcebd422878bf94f7be'
})

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
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b",
      "https://samples.clarifai.com/face-det.jpg" )
      .then(
        function(response){
          console.log(response);
        },
        function(err){
          //there was an error
        }
      );
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
        <FaceRecognition/>
            
      </div>
    );
  }
}

export default App;
