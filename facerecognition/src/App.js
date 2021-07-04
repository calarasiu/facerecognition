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

// added the key on the client side code bc the app doesn't have the server side
const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI
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

  onButtonSubmit =(event)=>{
    event.preventDefault();
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
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
