import './App.css';
import 'react-dropdown/style.css';
import keys from './config.json'
import { useState } from 'react';

function App() {
  const [errTxt,setErr] = useState("");
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [input, setInput] = useState('');
  const [visibility, setVisibility] = useState('');
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  function changeVisibility(visBool) {
    if (visBool){
      setVisibility("visible");
    }
    else{
      setVisibility("hidden")
    }
      const element = document.querySelector('.weatherInfo');
      element.style.visibility = visibility;
  }


  function getText(responseText, comparisonStr){
    const correctChars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let coord = '';
    for(let i = 0; i < responseText.length-comparisonStr.length; i++){ //Get the longitude from the response
      if(responseText.substring(i,i+comparisonStr.length) === comparisonStr){
        let j = i+comparisonStr.length;
        while(responseText[j] !== ',' && j < responseText.length){
          if(correctChars.contains(responseText[j])){
            coord += responseText[j];
            j+=1;
          }
        }
        break;
      }
   };
   return coord;
  }
  function getWeather(){
  try{
   let finalInput = ''
   for(let i = 0; i < input.length; i++){  //Change all spaces to an _ for the URL
      if(input[i] === ' '){
        finalInput+= '_'
      }
      else{
        finalInput+=input[i]
      }
   }
   var coordReq = new XMLHttpRequest();
   coordReq.open( "GET", 'http://api.openweathermap.org/geo/1.0/direct?q=' + finalInput + '&limit=5&appid=' + keys['API_KEY'], false ); // false for synchronous request
   coordReq.send( null );
   console.log(coordReq.response)

   if(coordReq.responseText.includes('"cod":"400"')){
    console.error("Error: City not found."); //Error handling
    setErr("Sorry, we couldn't find that city. Please try again.")
    setCity("")
    setHumidity("")
    setTemp("")
    setWeather("")
  }
  else{
    setErr("")
    let latitude = getText(coordReq.responseText, '"lat":');
    let longitude = getText(coordReq.responseText,'"lon":');
    var weatherReq = new XMLHttpRequest();
    weatherReq.open( "GET", 'https://api.openweathermap.org/data/2.5/weather?lat=' +latitude + '&lon=' + longitude + '&appid=' + keys['API_KEY'], false ); // false for synchronous request
    weatherReq.send( null );
    setInput('')
    console.log(weatherReq.response)
    setTemp("Temperature: " + getText(weatherReq.responseText, '"temp":'))
    setHumidity("Humidity: " + getText(weatherReq.responseText, '"humidity":'))
    setCity("City: " + getText(weatherReq.responseText, '"name":'))
    setWeather("Weather: " + getText(weatherReq.responseText, '"main":'))
    changeVisibility(true)
  }
   
   
  }
catch{
  console.error("Error: City not found."); //Error handling
  setErr("Sorry, we couldn't find that city. Please try again.")
}


  }
  return (
    <div className="App">
      <header className="App-header">
        <p >{"Check the weather of any city in the world!"}</p>
        <input id="cityInput" type="text"className="cityInput" placeholder='Input a city here' value={input} onChange={handleChange}/>
        <button className="button" onClick={()=>getWeather()}>Submit</button>
        <p className='errTxt' >{errTxt}</p>
        <p >{city}</p>
        <p > {temp}</p>
        <p >{weather}</p>
        <p >{humidity}</p>
      </header>
    </div>
  );
}

export default App;
