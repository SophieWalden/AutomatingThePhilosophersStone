import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

import TabManager from "./components/TabManager.js"


function App() {

  // Energy
  let [energy, setEnergy] = useState(1);
  let [spentEnergy, setSpentEnergy] = useState(0);

  // Philosophy Mult
  let [sacrificedTotal, setSacrificedTotal] = useState(0);
  let [energyMult, setEnergyMult] = useState(1);

  // Elements
  let [fire, setFire] = useState(0);
  let [water, setWater] = useState(0);
  let [earth, setEarth] = useState(0);
  let [air, setAir] = useState(0);
  let [space, setSpace] = useState(0);
  let [aether, setAether] = useState(0);

  // Count of each generator
  let [fireGeneratorAmount, setFireGeneratorAmount] = useState(0);
  let [waterGeneratorAmount, setWaterGeneratorAmount] = useState(0);
  let [earthGeneratorAmount, setEarthGeneratorAmount] = useState(0);
  let [airGeneratorAmount, setAirGeneratorAmount] = useState(0);
  let [spaceGeneratorAmount, setSpaceGeneratorAmount] = useState(0);
  let [aetherGeneratorAmount, setAetherGeneratorAmount] = useState(0);

  // Flameburst (Fire Upgrades R2C1-3)
  let [flameburstMult, setFlameburstMult] = useState(10);
  let [flameburstChance, setFlameburstChance] = useState(0.1);
  let [flameburstLength, setFlameburstLength] = useState(0);

  // Condensor (WaterUpgrade R1C2)
  let [waterProductionMult, setWaterProductionMult] = useState(1);

  // Effective Generator Multiplier (Water Upgrade R2C3)
  let [waterGeneratorMult, setWaterGeneratorMult] = useState(1);

  // Extra Tracking
  let [lastResetTime, setLastResetTime] = useState(Date.now());
  let [timeSinceLastReset, setTimeSinceLastReset] = useState(0);

  let [startOfGame, setStartOfGame] = useState(Date.now())
  let [timeSinceStartOfGame, setTimeSinceStartOfGame] = useState(0);

  // Tracking max values
  let [maxWater, setMaxWater] = useState(0);
  let [maxEarth, setMaxEarth] = useState(0);
  let [maxFire, setMaxFire] = useState(0);
  
  function formatValues(value){
    let roundingPlaces = 2;
    value = Math.round(10**roundingPlaces * value) / 10**roundingPlaces; // Round to roundingPlaces demical place

    return value
  }

  let valueGetters = {"air": air, "space": space, "aether": aether, "airGeneratorAmount": airGeneratorAmount, "spaceGeneratorAmount": spaceGeneratorAmount, "aetherGeneratorAmount": aetherGeneratorAmount, "energyMult": energyMult, "sacrificedTotal": sacrificedTotal, "maxFire": maxFire, "maxWater": maxWater, "maxEarth": maxEarth, "timeSinceStartOfGame": timeSinceStartOfGame, "waterGeneratorMult": waterGeneratorMult, "condensorMult": waterProductionMult, "flameburstLength": flameburstLength, "flameburstMult": flameburstMult, "flameburstChance": flameburstChance, "fireGeneratorAmount": fireGeneratorAmount, "waterGeneratorAmount": waterGeneratorAmount, "earthGeneratorAmount": earthGeneratorAmount, "energy": energy, "spentEnergy": spentEnergy, "fire": fire, "energyLeft": energy - spentEnergy, "water": water, "earth": earth, "timeSinceLastRebirth": timeSinceLastReset};
  
  function getValue(name){
    return valueGetters[name];
  }

  let valueSetters = {"air": setAir, "space": setSpace, "aether": setAether, "airGeneratorAmount": setAirGeneratorAmount, "spaceGeneratorAmount": setSpaceGeneratorAmount, "aetherGeneratorAmount": setAetherGeneratorAmount, "energyMult": setEnergyMult, "sacrificedTotal": setSacrificedTotal, "timeSinceLastReset": setLastResetTime, "timeSinceStartOfGame": setTimeSinceStartOfGame, "waterGeneratorMult": setWaterGeneratorMult, "condensorMult": setWaterProductionMult, "flameburstLength": setFlameburstLength, "flameburstMult": setFlameburstMult, "flameburstChance": setFlameburstChance, "energy": setEnergy,  "fireGeneratorAmount": setFireGeneratorAmount, "waterGeneratorAmount": setWaterGeneratorAmount, "earthGeneratorAmount": setEarthGeneratorAmount, "spentEnergy": setSpentEnergy, "fire": setFire, "water": setWater, "earth": setEarth, "time": setTimeSinceLastReset};

  function setValue(name, value){
    valueSetters[name](value);
  }

  function addValue(name, value){
    valueSetters[name](currentVal => currentVal + value);
  }


  // Upgrades
  let [fireRepeatable, setFireRepeatable] = React.useState(0);
  let [fireUpgradeR1C1, setFireUpgradeR1C1] = React.useState(0);
  let [fireUpgradeR1C2, setFireUpgradeR1C2] = React.useState(0);
  let [fireUpgradeR1C3, setFireUpgradeR1C3] = React.useState(0);
  let [fireUpgradeR2C1, setFireUpgradeR2C1] = React.useState(0);
  let [fireUpgradeR2C2, setFireUpgradeR2C2] = React.useState(0);
  let [fireUpgradeR2C3, setFireUpgradeR2C3] = React.useState(0);
  let [waterRepeatable, setWaterRepeatable] = React.useState(0);
  let [waterUpgradeR1C1, setWaterUpgradeR1C1] = React.useState(0);
  let [waterUpgradeR1C2, setWaterUpgradeR1C2] = React.useState(0);
  let [waterUpgradeR1C3, setWaterUpgradeR1C3] = React.useState(0);
  let [waterUpgradeR2C1, setWaterUpgradeR2C1] = React.useState(0);
  let [waterUpgradeR2C2, setWaterUpgradeR2C2] = React.useState(0);
  let [waterUpgradeR2C3, setWaterUpgradeR2C3] = React.useState(0);
  let [earthRepeatable, setEarthRepeatable] = React.useState(0);
  let [earthUpgradeR1C1, setEarthUpgradeR1C1] = React.useState(0);
  let [earthUpgradeR1C2, setEarthUpgradeR1C2] = React.useState(0);
  let [earthUpgradeR1C3, setEarthUpgradeR1C3] = React.useState(0);
  let [earthUpgradeR2C1, setEarthUpgradeR2C1] = React.useState(0);
  let [earthUpgradeR2C2, setEarthUpgradeR2C2] = React.useState(0);
  let [earthUpgradeR2C3, setEarthUpgradeR2C3] = React.useState(0);
  
  let setters = {"fireRepeatable": setFireRepeatable, "fireUpgradeR1C1": setFireUpgradeR1C1, "fireUpgradeR1C2": setFireUpgradeR1C2,
                 "fireUpgradeR1C3": setFireUpgradeR1C3, "fireUpgradeR2C1": setFireUpgradeR2C1, "fireUpgradeR2C2": setFireUpgradeR2C2,
                 "fireUpgradeR2C3": setFireUpgradeR2C3,
                 "waterRepeatable": setWaterRepeatable, "waterUpgradeR1C1": setWaterUpgradeR1C1, "waterUpgradeR1C2": setWaterUpgradeR1C2,
                 "waterUpgradeR1C3": setWaterUpgradeR1C3, "waterUpgradeR2C1": setWaterUpgradeR2C1, "waterUpgradeR2C2": setWaterUpgradeR2C2,
                 "waterUpgradeR2C3": setWaterUpgradeR2C3,
                 "earthRepeatable": setEarthRepeatable, "earthUpgradeR1C1": setEarthUpgradeR1C1, "earthUpgradeR1C2": setEarthUpgradeR1C2,
                 "earthUpgradeR1C3": setEarthUpgradeR1C3, "earthUpgradeR2C1": setEarthUpgradeR2C1, "earthUpgradeR2C2": setEarthUpgradeR2C2,
                 "earthUpgradeR2C3": setEarthUpgradeR2C3}

  let getters = {"fireRepeatable": fireRepeatable, "fireUpgradeR1C1": fireUpgradeR1C1, "fireUpgradeR1C2": fireUpgradeR1C2,
                 "fireUpgradeR1C3": fireUpgradeR1C3, "fireUpgradeR2C1": fireUpgradeR2C1, "fireUpgradeR2C2": fireUpgradeR2C2,
                 "fireUpgradeR2C3": fireUpgradeR2C3,
                 "waterRepeatable": waterRepeatable, "waterUpgradeR1C1": waterUpgradeR1C1, "waterUpgradeR1C2": waterUpgradeR1C2,
                 "waterUpgradeR1C3": waterUpgradeR1C3, "waterUpgradeR2C1": waterUpgradeR2C1, "waterUpgradeR2C2": waterUpgradeR2C2,
                 "waterUpgradeR2C3": waterUpgradeR2C3, 
                 "earthRepeatable": earthRepeatable, "earthUpgradeR1C1": earthUpgradeR1C1, "earthUpgradeR1C2": earthUpgradeR1C2,
                 "earthUpgradeR1C3": earthUpgradeR1C3, "earthUpgradeR2C1": earthUpgradeR2C1, "earthUpgradeR2C2": earthUpgradeR2C2,
                 "earthUpgradeR2C3": earthUpgradeR2C3}

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
      return true;
    }

    return false;
  }

  function getUpgradeCount(upgrade){
    return getters[upgrade]
  }

  function getUpgradeCost(upgrade){
    let costs = {"fireRepeatable": [5 * 5 ** getUpgradeCount("fireRepeatable"), "fire"],
                 "fireUpgradeR1C1": [2, "energy"],"fireUpgradeR1C2": [5, "energy"],"fireUpgradeR1C3": [15, "energy"],
                 "fireUpgradeR2C1": [10 * 2 ** getUpgradeCount("fireUpgradeR2C1"), "energy"], "fireUpgradeR2C2": [Math.ceil(15 * 1.5 ** getUpgradeCount("fireUpgradeR2C2")), "energy"], "fireUpgradeR2C3": [25, "energy"],
                 "waterRepeatable": [5 * 5 ** getUpgradeCount("waterRepeatable"), "water"],
                 "waterUpgradeR1C1": [5, "energy"],"waterUpgradeR1C2": [10, "energy"],"waterUpgradeR1C3": [25, "energy"],
                 "waterUpgradeR2C1": [15, "energy"], "waterUpgradeR2C2": [20, "energy"], "waterUpgradeR2C3": [40, "energy"],
                 "earthRepeatable": [5 * 5 ** getUpgradeCount("earthRepeatable"), "earth"],
                 "earthUpgradeR1C1": [5, "energy"],"earthUpgradeR1C2": [10, "energy"],"earthUpgradeR1C3": [25, "energy"],
                 "earthUpgradeR2C1": [15, "energy"], "earthUpgradeR2C2": [20, "energy"], "earthUpgradeR2C3": [40, "energy"]}

    return costs[upgrade]
  }

  function resetAllUpgrades(){
    for (const upgrade in setters){
      setters[upgrade](0);
    }
  }



  function calculateNewEnergy(){
    let energyValue = 1;

    energyValue += Math.floor(Math.log10(maxFire+1)); 

    energyValue += Math.floor(Math.log(maxWater + 1) / Math.log(4));

    energyValue += Math.floor(Math.log(maxEarth + 1) / Math.log(2));

    energyValue = Math.floor(energyValue * energyMult)

    if (energyValue > energy){
      setEnergy(energyValue);
    }

  }

  function calculateTimeSinceLastReset(){
    setTimeSinceLastReset(Date.now() - lastResetTime);
    setTimeSinceStartOfGame(Date.now() - startOfGame);
  }

  function updateMaxValues(){
    if (getValue("fire") > maxFire){
      setMaxFire(getValue("fire"));
    }

    if (getValue("water") > maxWater){
      setMaxWater(getValue("water"));
    }

    if (getValue("earth") > maxEarth){
      setMaxEarth(getValue("earth"));
    }
  }

  // Call update every 33 ms (update time)
  React.useEffect(() => {
    const interval = setInterval(() => {
        calculateNewEnergy();
        calculateTimeSinceLastReset();
        updateMaxValues();
    }, 33);
    
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [energy, fire, water, earth, lastResetTime])

  
  return (
    <div className="App">

      <h2 className="ResourceDisplay">You have <span id="pink">{energy}</span> Energy</h2>
      <h2 className="ResourceDisplay">You have spent <span id="pink">{spentEnergy}</span> of your Energy</h2>

      <TabManager resetAllUpgrades={resetAllUpgrades} getValue={getValue} setValue={setValue} addValue={addValue} formatValues={formatValues} buyUpgrade={buyUpgrade} getUpgradeCount={getUpgradeCount} getUpgradeCost={getUpgradeCost}/>
    </div>
  );
}

export default App;
