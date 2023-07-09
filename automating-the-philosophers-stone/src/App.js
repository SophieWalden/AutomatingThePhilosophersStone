import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

import TabManager from "./components/TabManager.js"


function App() {

  // Energy
  let [energy, setEnergy] = useState(100);
  let [spentEnergy, setSpentEnergy] = useState(0);
  

  // Elements
  let [fire, setFire] = useState(0);
  let [water, setWater] = useState(0);
  let [earth, setEarth] = useState(0);

  // Extra Tracking
  let [lastResetTime, setLastResetTime] = useState(Date.now());
  let [timeSinceLastReset, setTimeSinceLastReset] = useState(0);
  
  function formatValues(value){
    let roundingPlaces = 2;
    value = Math.round(10**roundingPlaces * value) / 10**roundingPlaces; // Round to roundingPlaces demical place

    return value
  }

  function getValue(name){
    let values = {"energy": energy, "spentEnergy": spentEnergy, "fire": fire, "energyLeft": energy - spentEnergy, "water": water, "earth": earth, "timeSinceLastRebirth": timeSinceLastReset};
    
    return values[name];
  }

  function setValue(name, value){
    let functions = {"energy": setEnergy, "spentEnergy": setSpentEnergy, "fire": setFire, "water": setWater, "earth": setEarth, "time": setTimeSinceLastReset};

    functions[name](value);
  }

  function addValue(name, value){
    let functions = {"energy": setEnergy, "spentEnergy": setSpentEnergy, "fire": setFire, "water": setWater, "earth": setEarth, "time": setTimeSinceLastReset};

    functions[name](currentVal => currentVal + value);
  }


  // Upgrades
  let [fireRepeatable, setFireRepeatable] = React.useState(0);
  let [fireUpgradeR1C1, setFireUpgradeR1C1] = React.useState(0);
  let [fireUpgradeR1C2, setFireUpgradeR1C2] = React.useState(0);
  let [fireUpgradeR1C3, setFireUpgradeR1C3] = React.useState(0);
  let [fireUpgradeR2C1, setFireUpgradeR2C1] = React.useState(0);
  let [fireUpgradeR2C2, setFireUpgradeR2C2] = React.useState(0);
  let [fireUpgradeR2C3, setFireUpgradeR2C3] = React.useState(0);
  let setters = {"fireRepeatable": setFireRepeatable, "fireUpgradeR1C1": setFireUpgradeR1C1, "fireUpgradeR1C2": setFireUpgradeR1C2,
                 "fireUpgradeR1C3": setFireUpgradeR1C3, "fireUpgradeR2C1": setFireUpgradeR2C1, "fireUpgradeR2C2": setFireUpgradeR2C2,
                 "fireUpgradeR2C3": setFireUpgradeR2C3}

  let getters = {"fireRepeatable": fireRepeatable, "fireUpgradeR1C1": fireUpgradeR1C1, "fireUpgradeR1C2": fireUpgradeR1C2,
                 "fireUpgradeR1C3": fireUpgradeR1C3, "fireUpgradeR2C1": fireUpgradeR2C1, "fireUpgradeR2C2": fireUpgradeR2C2,
                 "fireUpgradeR2C3": fireUpgradeR2C3}

  function buyUpgrade(upgrade){
    let [cost, element] = getUpgradeCost(upgrade);

    let elementAmount = element == "energy" ? getValue("energyLeft") : getValue(element)
    if (elementAmount >= cost){

      if (element != "energy"){
        addValue(element, -cost);
      }else{
        addValue("spentEnergy", cost);
      }
      
      setters[upgrade](value => value + 1)
    }
  }

  function getUpgradeCount(upgrade){
    return getters[upgrade]
  }

  function getUpgradeCost(upgrade){
    let costs = {"fireRepeatable": [5 * 5 ** getUpgradeCount("fireRepeatable"), "fire"],
                 "fireUpgradeR1C1": [2, "energy"],"fireUpgradeR1C2": [5, "energy"],"fireUpgradeR1C3": [15, "energy"],
                 "fireUpgradeR2C1": [10, "energy"], "fireUpgradeR2C2": [15, "energy"], "fireUpgradeR2C3": [25, "energy"]}

    return costs[upgrade]
  }



  function calculateNewEnergy(){
    let energyValue = 1;

    energyValue += Math.floor(Math.log10(fire+1)); 

    energyValue += Math.floor(Math.log(water + 1) / Math.log(4));

    energyValue += Math.floor(Math.log(earth + 1) / Math.log(2));

    if (energyValue > energy){
      setEnergy(energyValue);
    }

  }

  function calculateTimeSinceLastReset(){
    setTimeSinceLastReset(Date.now() - lastResetTime);
  }

  // Call update every 33 ms (update time)
  React.useEffect(() => {
    const interval = setInterval(() => {
        calculateNewEnergy();
        calculateTimeSinceLastReset();
    }, 33);
    
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [energy, fire, water, earth])

  
  return (
    <div className="App">

      <h2 className="ResourceDisplay">You have <span id="pink">{energy}</span> Energy</h2>
      <h2 className="ResourceDisplay">You have spent <span id="pink">{spentEnergy}</span> of your Energy</h2>

      <TabManager getValue={getValue} setValue={setValue} addValue={addValue} formatValues={formatValues} buyUpgrade={buyUpgrade} getUpgradeCount={getUpgradeCount} getUpgradeCost={getUpgradeCost}/>
    </div>
  );
}

export default App;
