import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

import TabManager from "./components/TabManager.js"
import Decimal from "break_infinity.js";

function App() {

  // Energy
  let [energy, setEnergy] = useState(new Decimal(1));
  let [spentEnergy, setSpentEnergy] = useState(new Decimal(0));

  // Philosophy Mult
  let [sacrificedTotal, setSacrificedTotal] = useState(new Decimal(0));
  let [energyMult, setEnergyMult] = useState(new Decimal(1));

  // Elements
  let [fire, setFire] = useState((new Decimal(0)));
  let [water, setWater] = useState(new Decimal(0));
  let [earth, setEarth] = useState(new Decimal(0));
  let [air, setAir] = useState(new Decimal(0));
  let [space, setSpace] = useState(new Decimal(0));
  let [aether, setAether] = useState(new Decimal(0));

  // Count of each generator
  let [fireGeneratorAmount, setFireGeneratorAmount] = useState(new Decimal(0));
  let [waterGeneratorAmount, setWaterGeneratorAmount] = useState(new Decimal(0));
  let [earthGeneratorAmount, setEarthGeneratorAmount] = useState(new Decimal(0));
  let [airGeneratorAmount, setAirGeneratorAmount] = useState(new Decimal(0));
  let [spaceGeneratorAmount, setSpaceGeneratorAmount] = useState(new Decimal(0));
  let [aetherGeneratorAmount, setAetherGeneratorAmount] = useState(new Decimal(0));

  // Flameburst (Fire Upgrades R2C1-3)
  let [flameburstMult, setFlameburstMult] = useState(new Decimal(10));
  let [flameburstChance, setFlameburstChance] = useState(new Decimal(0.1));
  let [flameburstLength, setFlameburstLength] = useState(new Decimal(1));

  // Condensor (WaterUpgrade R1C2)
  let [waterProductionMult, setWaterProductionMult] = useState(new Decimal(1));

  // Effective Generator Multiplier (Water Upgrade R2C3)
  let [waterGeneratorMult, setWaterGeneratorMult] = useState(new Decimal(1));

  // Extra Tracking
  let [lastResetTime, setLastResetTime] = useState(new Decimal(Date.now()));
  let [timeSinceLastReset, setTimeSinceLastReset] = useState(new Decimal(0));

  let [startOfGame, setStartOfGame] = useState(new Decimal(Date.now()))
  let [timeSinceStartOfGame, setTimeSinceStartOfGame] = useState(new Decimal(0));

  // Tracking max values
  let [maxWater, setMaxWater] = useState(new Decimal(0));
  let [maxEarth, setMaxEarth] = useState(new Decimal(0));
  let [maxFire, setMaxFire] = useState(new Decimal(0));
  let [maxAir, setMaxAir] = useState(new Decimal(0));

  // Extra Challenge Values
  let [productionMult, setProductionMult] = useState(new Decimal(1));

  

  function formatValues(value, decimalMode){

    if (new Decimal(1000).greaterThan(value)){
      // Return small decimal number
      
      value = value.times(100).floor().divideBy(100).toString()
      if (value.indexOf(".") == -1 && decimalMode != true) return value
      
      if (value.indexOf(".") == -1 && decimalMode == true) return value + ".00"

      value = value.substring(0, value.indexOf(".") + 3)
      let paddingNeeded = 3 - (value.length - value.indexOf("."));


      return value + "0".repeat(paddingNeeded);
      
    } 

    return value.toExponential(2).toString().replace("+","");
  }

  let valueGetters = {"productionMult": productionMult, "maxAir": maxAir, "air": air, "space": space, "aether": aether, "airGeneratorAmount": airGeneratorAmount, "spaceGeneratorAmount": spaceGeneratorAmount, "aetherGeneratorAmount": aetherGeneratorAmount, "energyMult": energyMult, "sacrificedTotal": sacrificedTotal, "maxFire": maxFire, "maxWater": maxWater, "maxEarth": maxEarth, "timeSinceStartOfGame": timeSinceStartOfGame, "waterGeneratorMult": waterGeneratorMult, "condensorMult": waterProductionMult, "flameburstLength": flameburstLength, "flameburstMult": flameburstMult, "flameburstChance": flameburstChance, "fireGeneratorAmount": fireGeneratorAmount, "waterGeneratorAmount": waterGeneratorAmount, "earthGeneratorAmount": earthGeneratorAmount, "energy": energy, "spentEnergy": spentEnergy, "fire": fire, "energyLeft": energy.minus(spentEnergy), "water": water, "earth": earth, "timeSinceLastRebirth": timeSinceLastReset};
  
  function getValue(name){
    return valueGetters[name];
  }

  let valueSetters = {"productionMult": setProductionMult, "maxWater": setMaxWater, "maxEarth": setMaxEarth, "maxFire": setMaxFire, "startOfGame": setStartOfGame, "maxAir": setMaxAir, "air": setAir, "space": setSpace, "aether": setAether, "airGeneratorAmount": setAirGeneratorAmount, "spaceGeneratorAmount": setSpaceGeneratorAmount, "aetherGeneratorAmount": setAetherGeneratorAmount, "energyMult": setEnergyMult, "sacrificedTotal": setSacrificedTotal, "timeSinceLastReset": setLastResetTime, "timeSinceStartOfGame": setTimeSinceStartOfGame, "waterGeneratorMult": setWaterGeneratorMult, "condensorMult": setWaterProductionMult, "flameburstLength": setFlameburstLength, "flameburstMult": setFlameburstMult, "flameburstChance": setFlameburstChance, "energy": setEnergy,  "fireGeneratorAmount": setFireGeneratorAmount, "waterGeneratorAmount": setWaterGeneratorAmount, "earthGeneratorAmount": setEarthGeneratorAmount, "spentEnergy": setSpentEnergy, "fire": setFire, "water": setWater, "earth": setEarth, "time": setTimeSinceLastReset};

  function setValue(name, value){
    valueSetters[name](value);
  }

  function addValue(name, value){
    valueSetters[name](currentVal => currentVal.plus(value));
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


  let [rebuyableUpgrade, setRebuyableUpgrade] = React.useState("");
  let [upgradeAmount, setUpgradeAmount] = React.useState(0)
  function buyUpgrade(upgrade, amount){
    if (amount == undefined) amount = 1;
    if (amount <= 0) return true;

    let [cost, element] = getUpgradeCost(upgrade);

    let elementAmount = element == "energy" ? getValue("energyLeft") : getValue(element)
    if (elementAmount.greaterThanOrEqualTo(cost)){

      if (element != "energy"){
        addValue(element, cost.times(-1));
      }else{
        addValue("spentEnergy", cost);
      }
      
      setters[upgrade](value => value + 1);
      setRebuyableUpgrade(upgrade);
      setUpgradeAmount(amount - 1);
    }else{
      return false
    }

  }

  useEffect(() => {
    buyUpgrade(rebuyableUpgrade, upgradeAmount)
  }, [upgradeAmount])

  function setUpgrade(upgrade, value){
    setters[upgrade](value);
  }

  function getUpgradeCount(upgrade){
    return getters[upgrade]
  }

  function getUpgradeCost(upgrade){
    let costs = {"fireRepeatable": [new Decimal(5).times(new Decimal(5).pow(getUpgradeCount("fireRepeatable"))), "fire"],
                 "fireUpgradeR1C1": [new Decimal(3), "energy"],"fireUpgradeR1C2": [new Decimal(5), "energy"],"fireUpgradeR1C3": [new Decimal(15), "energy"],
                 "fireUpgradeR2C1": [new Decimal(10).times(new Decimal(2).pow( getUpgradeCount("fireUpgradeR2C1"))), "energy"], "fireUpgradeR2C2": [(new Decimal(15).times(new Decimal(1.5).pow(getUpgradeCount("fireUpgradeR2C2")))).ceil(), "energy"], "fireUpgradeR2C3": [new Decimal(25), "energy"],
                 "waterRepeatable": [new Decimal(5).times(new Decimal(5).pow(getUpgradeCount("waterRepeatable"))), "water"],
                 "waterUpgradeR1C1": [new Decimal(4), "energy"],"waterUpgradeR1C2": [new Decimal(7), "energy"],"waterUpgradeR1C3": [new Decimal(25), "energy"],
                 "waterUpgradeR2C1": [new Decimal(15), "energy"], "waterUpgradeR2C2": [new Decimal(20), "energy"], "waterUpgradeR2C3": [new Decimal(40), "energy"],
                 "earthRepeatable": [new Decimal(5).times(new Decimal(5).pow(getUpgradeCount("earthRepeatable"))), "earth"],
                 "earthUpgradeR1C1": [new Decimal(5), "energy"],"earthUpgradeR1C2": [new Decimal(10), "energy"],"earthUpgradeR1C3": [new Decimal(25), "energy"],
                 "earthUpgradeR2C1": [new Decimal(15), "energy"], "earthUpgradeR2C2": [new Decimal(20), "energy"], "earthUpgradeR2C3": [new Decimal(40), "energy"]}

    let costMult = 1;
    if (activeChallenge == "challenge3"){
      costMult = costMult * 2;
    }

    let cost = costs[upgrade];
    cost[0] = cost[0].times(costMult);

    return cost
  }

  function resetAllUpgrades(){
    for (const upgrade in setters){
      setters[upgrade](0);
    }
  }

  // Challenges
  let [activeChallenge, setActiveChallenge] = useState("")
  let [challengeOneCompletions, setChallengeOneCompletions] = useState(0);
  let [challengeTwoCompletions, setChallengeTwoCompletions] = useState(0);
  let [challengeThreeCompletions, setChallengeThreeCompletions] = useState(0);
  let [challengeFourCompletions, setChallengeFourCompletions] = useState(0);
  let [challengeFiveCompletions, setChallengeFiveCompletions] = useState(0);
  let [challengeSixCompletions, setChallengeSixCompletions] = useState(0);
  let [challengeSevenCompletions, setChallengeSevenCompletions] = useState(0);
  let [saveBeforeChallenge, setSaveBeforeChallenge] = useState("");
  let [timeOfStartChallenge, setTimeOfStartChallenge] = useState(Date.now());

  let challengeGetters = {"timeOfStartChallenge": timeOfStartChallenge, "activeChallenge": activeChallenge, "saveBeforeChallenge": saveBeforeChallenge, "challengeOneCompletions": challengeOneCompletions, "challengeTwoCompletions": challengeTwoCompletions, "challengeThreeCompletions": challengeThreeCompletions,
                          "challengeFourCompletions": challengeFourCompletions, "challengeFiveCompletions": challengeFiveCompletions, "challengeSixCompletions": challengeSixCompletions, "challengeSevenCompletions": challengeSevenCompletions}

  let challengeSetters= {"timeOfStartChallenge": setTimeOfStartChallenge, "activeChallenge": setActiveChallenge, "saveBeforeChallenge": setSaveBeforeChallenge, "challengeOneCompletions": setChallengeOneCompletions, "challengeTwoCompletions": setChallengeTwoCompletions, "challengeThreeCompletions": setChallengeThreeCompletions,
  "challengeFourCompletions": setChallengeFourCompletions, "challengeFiveCompletions": setChallengeFiveCompletions, "challengeSixCompletions": setChallengeSixCompletions, "challengeSevenCompletions": setChallengeSevenCompletions}


  function getChallengeValues(name){
    return challengeGetters[name]
  }

  function setChallengeValues(name, value){
    challengeSetters[name](value);
  }



  function calculateNewEnergy(){
    let energyValue = new Decimal(1);

    energyValue = energyValue.plus(new Decimal(maxFire.plus(1).log10()).floor()); 

    energyValue = energyValue.plus(new Decimal(maxWater.plus(1).log(4)).floor()); 

    energyValue = energyValue.plus(new Decimal(maxEarth.plus(1).log(2)).floor()); 

    energyValue = energyValue.plus(new Decimal(maxAir.plus(1).log(1.5)).floor()); 

    energyValue = energyValue.times(energyMult).floor()

    if (energyValue.greaterThan(energy)){
      setEnergy(energyValue);
    }

  }

  function calculateTimeSinceLastReset(){
    setTimeSinceLastReset(new Decimal(Date.now() - lastResetTime));
    setTimeSinceStartOfGame(new Decimal(Date.now() - startOfGame));
  }

  function updateMaxValues(){
    if (getValue("fire").greaterThan(maxFire)){
      setMaxFire(getValue("fire"));
    }

    if (getValue("water").greaterThan(maxWater)){
      setMaxWater(getValue("water"));
    }

    if (getValue("earth").greaterThan(maxEarth)){
      setMaxEarth(getValue("earth"));
    }

    if (getValue("air").greaterThan(maxAir)){
      setMaxAir(getValue("air"));
    }
  }

  function updateChallengeModifiers(){
    if (activeChallenge == "challenge4"){ // Half production every minute
      setProductionMult(mult => mult.dividedBy(1.0005))
    }

    if (activeChallenge == "challenge6"){
      if (Date.now() - timeOfStartChallenge >= 2 * 60 * 1000){
        setProductionMult(mult => mult.dividedBy(2));
      }
    }
  }

  // Call update every 33 ms (update time)
  React.useEffect(() => {
    const interval = setInterval(() => {
        calculateNewEnergy();
        calculateTimeSinceLastReset();
        updateMaxValues();
        updateChallengeModifiers();
    }, 33);
    
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [energy, fire, water, earth, lastResetTime, timeOfStartChallenge])

  
  return (
    <div className="App">

      <h2 className="ResourceDisplay">You have <span id="pink">{formatValues(energy)}</span> Energy</h2>
      <h2 className="ResourceDisplay">You have <span id="pink">{formatValues(energy.minus(spentEnergy))}</span> unspent Energy</h2>

      <TabManager getChallengeValue={getChallengeValues} setChallengeValue={setChallengeValues} setUpgrade={setUpgrade} resetAllUpgrades={resetAllUpgrades} getValue={getValue} setValue={setValue} addValue={addValue} formatValues={formatValues} buyUpgrade={buyUpgrade} getUpgradeCount={getUpgradeCount} getUpgradeCost={getUpgradeCost}/>
    </div>
  );
}

export default App;
