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
  let [maxSpace, setMaxSpace] = useState(new Decimal(0));
  let [maxAether, setMaxAether] = useState(new Decimal(0));

  // Extra Challenge Values
  let [productionMult, setProductionMult] = useState(new Decimal(1));

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

  let [challengeOneHighest, setChallengeOneHighest] = useState(new Decimal(0));
  let [challengeTwoHighest, setChallengeTwoHighest] = useState(new Decimal(0));
  let [challengeThreeHighest, setChallengeThreeHighest] = useState(new Decimal(0));
  let [challengeFourHighest, setChallengeFourHighest] = useState(new Decimal(0));
  let [challengeFiveHighest, setChallengeFiveHighest] = useState(new Decimal(0));
  let [challengeSixHighest, setChallengeSixHighest] = useState(new Decimal(0));
  let [challengeSevenHighest, setChallengeSevenHighest] = useState(new Decimal(0));

  // Unlocking Stats
  let [firstReset, setFirstReset] = useState(true);

  // Philosopher Unlocks (5 = unlocks at 5%)
  let [philosopherR1C1, setPhilosopherR1C1] = useState(new Decimal(0.3));
  let [philosopherR1C2, setPhilosopherR1C2] = useState(new Decimal(3));
  let [philosopherR2C1, setPhilosopherR2C1] = useState(new Decimal(4));
  let [philosopherR2C2, setPhilosopherR2C2] = useState(new Decimal(5));
  let [philosopherR3C1, setPhilosopherR3C1] = useState(new Decimal(12));
  let [philosopherR3C2, setPhilosopherR3C2] = useState(new Decimal(30));

  function formatValues(value, decimalMode){
    value = new Decimal(value);

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

  let valueGetters = {"challengeSevenHighest": challengeSevenHighest, "challengeSixHighest": challengeSixHighest, "challengeFiveHighest": challengeFiveHighest, "challengeFourHighest":challengeFourHighest, "challengeThreeHighest": challengeThreeHighest, "challengeOneHighest": challengeOneHighest,
   "challengeTwoHighest": challengeTwoHighest, "startOfGame": startOfGame, "lastResetTime": lastResetTime, "waterProductionMult": waterProductionMult, "philosopherR3C1": philosopherR3C1, "philosopherR3C2": philosopherR3C2, "philosopherR2C1": philosopherR2C1, "philosopherR2C2": philosopherR2C2, 
   "philosopherR1C1": philosopherR1C1, "philosopherR1C2": philosopherR1C2, "firstReset": firstReset, "maxSpace": maxSpace, "maxAether": maxAether, "productionMult": productionMult, "maxAir": maxAir, "air": air, "space": space, "aether": aether, "airGeneratorAmount": airGeneratorAmount, 
   "spaceGeneratorAmount": spaceGeneratorAmount, "aetherGeneratorAmount": aetherGeneratorAmount, "energyMult": energyMult, "sacrificedTotal": sacrificedTotal, "maxFire": maxFire, "maxWater": maxWater, "maxEarth": maxEarth, "timeSinceStartOfGame": timeSinceStartOfGame, "waterGeneratorMult":
    waterGeneratorMult, "condensorMult": waterProductionMult, "flameburstLength": flameburstLength, "flameburstMult": flameburstMult, "flameburstChance": flameburstChance,
     "fireGeneratorAmount": fireGeneratorAmount.plus(space).pow(challengeFiveCompletions == 1 ? new Decimal(1.05).plus(new Decimal(challengeThreeHighest.plus(1).log(10)).dividedBy(100)) : 1), "waterGeneratorAmount": waterGeneratorAmount.plus(space), "earthGeneratorAmount": earthGeneratorAmount.plus(space), 
     "energy": energy, "spentEnergy": spentEnergy, "fire": fire, "energyLeft": energy.minus(spentEnergy), "water": water, "earth": earth, "timeSinceLastRebirth": timeSinceLastReset};
  
  function getValue(name){
    return valueGetters[name];
  }

  let valueSetters = {"challengeSevenHighest": setChallengeSevenHighest, "challengeSixHighest": setChallengeSixHighest, "challengeFiveHighest": setChallengeFiveHighest, "challengeFourHighest":setChallengeFourHighest, "challengeThreeHighest": setChallengeThreeHighest, "challengeOneHighest": setChallengeOneHighest,
   "challengeTwoHighest": setChallengeTwoHighest,"lastResetTime": setLastResetTime, "startOfGame": setStartOfGame, "waterProductionMult": setWaterProductionMult, "philosopherR3C1": setPhilosopherR3C1, "philosopherR3C2": setPhilosopherR3C2, "philosopherR2C1": setPhilosopherR2C1, "philosopherR2C2": setPhilosopherR2C2, 
   "philosopherR1C1": setPhilosopherR1C1, "philosopherR1C2": setPhilosopherR1C2, "firstReset": setFirstReset, "maxSpace": setMaxSpace, "maxAether": setMaxAether, "productionMult": setProductionMult, "maxWater": setMaxWater, "maxEarth": setMaxEarth, "maxFire": setMaxFire, "startOfGame": setStartOfGame, "maxAir": setMaxAir, 
   "air": setAir, "space": setSpace, "aether": setAether, "airGeneratorAmount": setAirGeneratorAmount, "spaceGeneratorAmount": setSpaceGeneratorAmount, "aetherGeneratorAmount": setAetherGeneratorAmount, "energyMult": setEnergyMult, "sacrificedTotal": setSacrificedTotal, "timeSinceLastReset": setLastResetTime,
    "timeSinceStartOfGame": setTimeSinceStartOfGame, "waterGeneratorMult": setWaterGeneratorMult, "condensorMult": setWaterProductionMult, "flameburstLength": setFlameburstLength, "flameburstMult": setFlameburstMult, "flameburstChance": setFlameburstChance, "energy": setEnergy,  "fireGeneratorAmount": setFireGeneratorAmount,
     "waterGeneratorAmount": setWaterGeneratorAmount, "earthGeneratorAmount": setEarthGeneratorAmount, "spentEnergy": setSpentEnergy, "fire": setFire, "water": setWater, "earth": setEarth, "time": setTimeSinceLastReset};

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
                 "fireUpgradeR2C1": [new Decimal(10).times(new Decimal(2).pow( getUpgradeCount("fireUpgradeR2C1"))), "energy"], "fireUpgradeR2C2": [(new Decimal(15).times(new Decimal(1.5).pow(getUpgradeCount("fireUpgradeR2C2")))).ceil(), "energy"], "fireUpgradeR2C3": [new Decimal(20).pow(new Decimal(1.1).pow(getUpgradeCount("fireUpgradeR2C3") + (1))).floor(), "energy"],
                 "waterRepeatable": [new Decimal(5).times(new Decimal(5).pow(getUpgradeCount("waterRepeatable"))), "water"],
                 "waterUpgradeR1C1": [new Decimal(4), "energy"],"waterUpgradeR1C2": [new Decimal(7), "energy"],"waterUpgradeR1C3": [new Decimal(15), "energy"],
                 "waterUpgradeR2C1": [new Decimal(15), "energy"], "waterUpgradeR2C2": [new Decimal(10).pow(new Decimal(1.3).pow(getUpgradeCount("waterUpgradeR2C2") + (1))).floor(), "energy"], "waterUpgradeR2C3": [new Decimal(40).pow(new Decimal(1.1).pow(getUpgradeCount("waterUpgradeR2C3") + (1))).floor(), "energy"],
                 "earthRepeatable": [new Decimal(5).times(new Decimal(5).pow(getUpgradeCount("earthRepeatable"))), "earth"],
                 "earthUpgradeR1C1": [new Decimal(5), "energy"],"earthUpgradeR1C2": [new Decimal(10), "energy"],"earthUpgradeR1C3": [new Decimal(15), "energy"],
                 "earthUpgradeR2C1": [new Decimal(15), "energy"], "earthUpgradeR2C2": [new Decimal(10).pow(new Decimal(1.5).pow(getUpgradeCount("earthUpgradeR2C2") + (1))).floor(), "energy"], "earthUpgradeR2C3": [new Decimal(40).pow(new Decimal(1.1).pow(getUpgradeCount("earthUpgradeR2C3") + (1))).floor(), "energy"]}

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


  let challengeGetters = {"timeOfStartChallenge": timeOfStartChallenge, "activeChallenge": activeChallenge, "saveBeforeChallenge": saveBeforeChallenge, "challengeOneCompletions": challengeOneCompletions, "challengeTwoCompletions": challengeTwoCompletions, "challengeThreeCompletions": challengeThreeCompletions,
                          "challengeFourCompletions": challengeFourCompletions, "challengeFiveCompletions": challengeFiveCompletions, "challengeSixCompletions": challengeSixCompletions, "challengeSevenCompletions": challengeSevenCompletions}

  let challengeSetters= {"challenge1": setChallengeOneCompletions, "challenge2": setChallengeTwoCompletions, "challenge3": setChallengeThreeCompletions, "challenge4": setChallengeFourCompletions, "challenge5": setChallengeFiveCompletions, "challenge6": setChallengeSixCompletions, "challenge7": setChallengeSevenCompletions, "timeOfStartChallenge": setTimeOfStartChallenge, "activeChallenge": setActiveChallenge, "saveBeforeChallenge": setSaveBeforeChallenge, "challengeOneCompletions": setChallengeOneCompletions, "challengeTwoCompletions": setChallengeTwoCompletions, "challengeThreeCompletions": setChallengeThreeCompletions,
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

    energyValue = energyValue.plus(new Decimal(maxSpace.plus(1).log(1.25)).floor()); 

    energyValue = energyValue.plus(new Decimal(maxAether).floor()); 

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

    if (getValue("space").greaterThan(maxSpace)){
      setMaxSpace(getValue("space"));
    }

    if (getValue("aether").greaterThan(maxAether)){
      setMaxAether(getValue("aether"));
    }
  }

  function updateChallengeModifiers(){
    let timeSinceStartOfChallenge = Date.now() - getChallengeValues("timeOfStartChallenge");
    if (activeChallenge == "challenge4" && timeSinceStartOfChallenge / 1000 > 60){ // Half production every minute
      setProductionMult(mult => mult.dividedBy(1.005))
    }
    
    if (activeChallenge == "challenge6"){
      if (timeSinceStartOfChallenge >= 2 * 60 * 1000){
        setProductionMult(mult => mult.dividedBy(2000000));
      }
    }

    function getHighestName(challenge){
      return {"challenge1": "challengeOneHighest", "challenge2": "challengeTwoHighest", "challenge3": "challengeThreeHighest",
      "challenge4": "challengeFourHighest", "challenge5": "challengeFiveHighest", "challenge6": "challengeSixHighest", "challenge7": "challengeSevenHighest"}[challenge]
    }
  
    function getScalingFactor(challenge){
      if (challenge == "challenge1") return getValue("maxWater");
      if (challenge == "challenge2") return getValue("maxEarth");
      if (challenge == "challenge3") return getValue("energy");
      if (challenge == "challenge4") return getValue("energy");
      if (challenge == "challenge5") return getValue("maxFire");
      if (challenge == "challenge6") return getValue("energy");
      if (challenge == "challenge7") return getValue("energy");
    }

    
    let currentChallenge = activeChallenge;
    if (currentChallenge != "") setValue(getHighestName(currentChallenge), Decimal.max(getValue(getHighestName(currentChallenge)), getScalingFactor(currentChallenge)));


  }
  let [showEndCard, setShowEndCard] = useState(false);  
  let [endCardShown, setEndCardshown] = useState(false);

  // Call update every 33 ms (update time)
  React.useEffect(() => {
    const interval = setInterval(() => {
        calculateNewEnergy();
        calculateTimeSinceLastReset();
        updateMaxValues();
        updateChallengeModifiers();
    }, 33);
    
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [energy, fire, water, earth, lastResetTime, timeOfStartChallenge, Date.now()])

    function importGame(save){
  
      try{
        JSON.parse(atob(save))
      } catch(e){
        return false;
      }
  
      let importSave = JSON.parse(atob(save));

      for (const value in importSave){
        if (value.indexOf("upgradeExport") == -1 && ((value.indexOf("challenge") == -1 && value != "activeChallenge" && value != "saveBeforeChallenge") || value.indexOf("Highest") != -1))
          setValue(value, new Decimal(importSave[value]));
        else if (value.indexOf("challenge") != -1 || value == "activeChallenge" || value == "saveBeforeChallenge") 
          setChallengeValues(value,importSave[value])
        else
          setUpgrade(value.split("upgradeExport_")[1], importSave[value]);
      }
    }

  function resetGame(){
    let blankSave = "eyJlbmVyZ3kiOiIxIiwic3BlbnRFbmVyZ3kiOiIwIiwic2FjcmlmaWNlZFRvdGFsIjoiMCIsImVuZXJneU11bHQiOiIxIiwiZmlyZSI6IjAiLCJ3YXRlciI6IjAiLCJlYXJ0aCI6IjAiLCJhaXIiOiIwIiwic3BhY2UiOiIwIiwiYWV0aGVyIjoiMCIsImZpcmVHZW5lcmF0b3JBbW91bnQiOiIwIiwid2F0ZXJHZW5lcmF0b3JBbW91bnQiOiIwIiwiZWFydGhHZW5lcmF0b3JBbW91bnQiOiIwIiwiYWlyR2VuZXJhdG9yQW1vdW50IjoiMCIsInNwYWNlR2VuZXJhdG9yQW1vdW50IjoiMCIsImFldGhlckdlbmVyYXRvckFtb3VudCI6IjAiLCJmbGFtZWJ1cnN0TXVsdCI6IjEwIiwiZmxhbWVidXJzdENoYW5jZSI6IjAuMSIsImZsYW1lYnVyc3RMZW5ndGgiOiIxIiwid2F0ZXJQcm9kdWN0aW9uTXVsdCI6IjEiLCJ3YXRlckdlbmVyYXRvck11bHQiOiIxIiwibGFzdFJlc2V0VGltZSI6IjE2ODk4NjA5OTg5NDAiLCJzdGFydE9mR2FtZSI6IjE2ODk4NjA5OTg5NDAiLCJ0aW1lU2luY2VTdGFydE9mR2FtZSI6IjQ2MTc5MDkxIiwibWF4V2F0ZXIiOiIwIiwibWF4RmlyZSI6IjAiLCJtYXhFYXJ0aCI6IjAiLCJtYXhBaXIiOiIwIiwibWF4U3BhY2UiOiIwIiwibWF4QWV0aGVyIjoiMCIsImNoYWxsZW5nZTEiOjAsImNoYWxsZW5nZTIiOjAsImNoYWxsZW5nZTMiOjAsImNoYWxsZW5nZTQiOjAsImNoYWxsZW5nZTUiOjAsImNoYWxsZW5nZTYiOjAsImNoYWxsZW5nZTciOjAsImFjdGl2ZUNoYWxsZW5nZSI6IiIsInNhdmVCZWZvcmVDaGFsbGVuZ2UiOiIiLCJjaGFsbGVuZ2VPbmVIaWdoZXN0IjoiNC44MzU5MjI0MTYyMzkzNWUrNzc1IiwiY2hhbGxlbmdlVHdvSGlnaGVzdCI6IjAiLCJjaGFsbGVuZ2VUaHJlZUhpZ2hlc3QiOiIxLjkwOTI4Njg1Njk1NjkzMTdlKzQ4NTIiLCJjaGFsbGVuZ2VGb3VySGlnaGVzdCI6IjAiLCJjaGFsbGVuZ2VGaXZlSGlnaGVzdCI6IjAiLCJjaGFsbGVuZ2VTaXhIaWdoZXN0IjoiMi4wNzM0NzYxMzA0NzQyMTFlKzE3NiIsImNoYWxsZW5nZVNldmVuSGlnaGVzdCI6IjAiLCJ1cGdyYWRlRXhwb3J0X2ZpcmVSZXBlYXRhYmxlIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjFDMSI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIxQzIiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMUMzIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjJDMSI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIyQzIiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMkMzIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyUmVwZWF0YWJsZSI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIxQzIiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjFDMyI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIyQzIiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjJDMyI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFJlcGVhdGFibGUiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjFDMSI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMUMyIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIxQzMiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjJDMSI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMkMyIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIyQzMiOjB9"
    importGame(blankSave);
  }

  return (
    <div className="App">
      
      <div id="endPromptHolder" className={activeChallenge == "" && sacrificedTotal > 10000 && endCardShown == false ? "" : "displayNone"}>
      <div id="endPrompt">
          <button id="cancelEndButton" onClick={() => setShowEndCard(false) || setEndCardshown(true)}>X</button>

          <h2>You automated the Philosopher Stone!</h2>
          <h4>(The key and sucess to a healthy eternal life)</h4>
          <h3>Thanks so much for playing!</h3> 

          <h5>Big Shoutouts to Jakub, incremental_gamer, Liniarc, and everyone from the Incremental Game Jam community who helped test this</h5>
          <div id="endPromptButtonHolder">
          <button id="endCardReset" onClick={resetGame}>RESET GAME?</button>
          <button id="endCardContinue" onClick={() => setShowEndCard(false) || setEndCardshown(true)}>Continue</button>
          </div>
        </div>

        </div>

      <h2 className="ResourceDisplay">You have <span id="pink">{formatValues(energy)}</span> Energy</h2>
      <h2 className="ResourceDisplay">You have <span id="pink">{formatValues(energy.minus(spentEnergy))}</span> unspent Energy</h2>

      <TabManager importGame={importGame} getChallengeValue={getChallengeValues} setChallengeValue={setChallengeValues} setUpgrade={setUpgrade} resetAllUpgrades={resetAllUpgrades} getValue={getValue} setValue={setValue} addValue={addValue} formatValues={formatValues} buyUpgrade={buyUpgrade} getUpgradeCount={getUpgradeCount} getUpgradeCost={getUpgradeCost}/>
    </div>
  );
}

export default App;
