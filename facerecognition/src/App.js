import React,{Component} from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin"

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
      input: '',
      imageUrl: '',
      box :{},
      route: 'signin'
    }
  }

  calculateFaceLocation=(data)=>{
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById("inputImage");
   const width = Number(image.width);
   const height = Number(image.height);
   console.log(width, height);
   return {
    leftCol: clarifaiFace.left_col*width,
    topRow: clarifaiFace.top_row*height,
    rightCol: width - (clarifaiFace.right_col*width),
    bottomRow: height - (clarifaiFace.bottom_row*height)
   }
  }

  displayFaceBox=(box)=>{
    console.log(box);
    this.setState({box: box});
  }

  onButtonSubmit =()=>{
    this.setState({imageUrl: this.state.input});
    app.models
    .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onInputChange = (event)=>{
    this.setState({input: event.target.value});
  }

  onRouteChange = ()=>{
    this.setState({route:'home'});
  }

  render (){
    return (
      <div className="App">
        <Particles className = 'particles'
                params={particlesOptions}
              />
        {this.state.route === 'signin'?
          <Signin onRouteChange = {this.onRouteChange}/>
          : <div>
              <Navigation/>
              <Logo/>
              <Rank/>
              <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl}/>
          </div>
        }      
      </div>
    );
  }
}

export default App;
