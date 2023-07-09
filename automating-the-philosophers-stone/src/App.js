import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

import TabManager from "./components/TabManager.js"


function App() {

  // Energy
  let [energy, setEnergy] = useState(1);
  let [spentEnergy, setSpentEnergy] = useState(0);
  

  // Elements
  let [fire, setFire] = useState(0);
  
  function formatValues(value){
    let roundingPlaces = 2;
    value = Math.round(10**roundingPlaces * value) / 10**roundingPlaces; // Round to roundingPlaces demical place

    return value
  }

  function getValue(name){
    let values = {"energy": energy, "spentEnergy": spentEnergy, "fire": fire};
    
    return values[name];
  }

  function setValue(name, value){
    let functions = {"energy": setEnergy, "spentEnergy": setSpentEnergy, "fire": setFire};

    functions[name](value);
  }

  function addValue(name, value){
    let functions = {"energy": setEnergy, "spentEnergy": setSpentEnergy, "fire": setFire};

    functions[name](currentVal => currentVal + value);
  }

  function calculateNewEnergy(){
    let energyValue = 1;

    energyValue += Math.floor(Math.log10(fire+1)); 

    if (energyValue > energy){
      setEnergy(energyValue);
    }

  }

  // Call update every 33 ms (update time)
  React.useEffect(() => {
    const interval = setInterval(() => {
        calculateNewEnergy();
    }, 33);
    
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [energy, fire])

  
  return (
    <div className="App">

      <h2 className="ResourceDisplay">You have <span id="pink">{energy}</span> Energy</h2>
      <h2 className="ResourceDisplay">You have spent <span id="pink">{spentEnergy}</span> of your Energy</h2>

      <TabManager getValue={getValue} setValue={setValue} addValue={addValue} formatValues={formatValues}/>
    </div>
  );
}

export default App;
