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
import Register from "./components/Register/Register"

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
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation=(data)=>{
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById("inputImage");
   const width = Number(image.width);
   const height = Number(image.height);
   return {
    leftCol: clarifaiFace.left_col*width,
    topRow: clarifaiFace.top_row*height,
    rightCol: width - (clarifaiFace.right_col*width),
    bottomRow: height - (clarifaiFace.bottom_row*height)
   }
  }

  displayFaceBox=(box)=>{
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

  onRouteChange = (route)=>{
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route:route});
  }

  render (){
    const {route, isSignedIn, box, imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className = 'particles'
                params={particlesOptions}
              />
        {route === 'home'
          ?<div>
            <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
            <Logo/>
            <Rank/>
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition box = {box} imageUrl = {imageUrl}/>
          </div>
          : (route === 'signin'
              ?<div>
                <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
                <Signin onRouteChange = {this.onRouteChange}/>
              </div>
              :<div>
                <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
                <Register onRouteChange = {this.onRouteChange}/>
              </div>
            )
        }      
      </div>
    );
  }
}

export default App;
