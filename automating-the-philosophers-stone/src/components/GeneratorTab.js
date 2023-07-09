import './GeneratorTab.css';
import React, {useState} from "react";

function GeneratorTab(props) {

    function getCost(element){
        let costs = {"fire": Math.floor(2 ** props.fireAmount),
                     "water": Math.floor(2.5 * 2.1 ** props.waterAmount),
                     "earth": Math.floor(10 * 2.5 ** props.earthAmount)
                    }

        if (props.getUpgradeCount("fireUpgradeR1C1") == 1){
            costs["fire"] = props.formatValues(costs["fire"] / (1+props.fireAmount));
        }


        return costs[element];
    }


    function createGenerator(element, amount){
        let currentAmount = {"fire": props.fireAmount, "water": props.waterAmount, "earth": props.earthAmount}
        let settingFunction = {"fire": props.setFireAmount, "water": props.setWaterAmount, "earth": props.setEarthAmount}

        settingFunction[element](currentAmount[element] + amount)
    }

    function getGeneratorAmount(element){
        let generators = {"fire": props.fireAmount, "water": props.waterAmount,"earth": props.earthAmount}

        return generators[element];
    }

  function buyGenerator(element){
    let generatorAmount = getGeneratorAmount(element);

    // Buy With Energy
    if (generatorAmount === 0){
        let cost = getCost(element);
        let energyAmount = props.getValue("energy") - props.getValue("spentEnergy")
        
        if (energyAmount >= cost){
            props.addValue("spentEnergy", cost)
            createGenerator(element, 1);
        }


    }else{ // Buy with the specific currency
        let currentAmount = props.getValue(element);
        let cost = getCost(element)

        if (currentAmount >= cost){
            props.addValue(element, -cost);
            createGenerator(element, 1);
        }   
    }
  }

  function update(){
    // Everything that needs to be called routinely
    let deltaTime = 33/1000;

    // Update Generators
    let newFire = getGeneratorAmount("fire") * deltaTime 

    newFire *= 2 ** props.getUpgradeCount("fireRepeatable")

    props.addValue("fire", newFire);

    let newWater = getGeneratorAmount("water") * deltaTime
    props.addValue("water", newWater);

    let newEarth = getGeneratorAmount("earth") * deltaTime
    props.addValue("earth", newEarth);
  }

  // Call update every 33 ms (update time)
  React.useEffect(() => {
    const interval = setInterval(() => {
        update();
    }, 33);
    
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [props.fireAmount, props.getUpgradeCount("fireRepeatable"), props.waterAmount, props.earthAmount])

  return (
    
    <div className="GeneratorContainer">
        
        <div id="GeneratorsfirstRow">
            <button className="Generator" id="fireGenerator" onClick={() => buyGenerator("fire")}>
                <h3>Fire Generator</h3>
                <p>You have {props.formatValues(props.getValue("fire"))} Fire</p>
                <h3>{props.fireAmount}</h3>
                <h4>Cost: {getCost("fire")} {props.fireAmount > 0 ? "fire" : "energy"}</h4>
            
            </button>

            <button className="Generator" id="waterGenerator" onClick={() => buyGenerator("water")}>
                <h3>Water Generator</h3>
                <p>You have {props.formatValues(props.getValue("water"))} Water</p>
                <h3>{props.waterAmount}</h3>
                <h4>Cost: {getCost("water")} {props.waterAmount > 0 ? "water" : "energy"}</h4>
            
            </button>

            <button className="Generator" id="earthGenerator" onClick={() => buyGenerator("earth")}>
                <h3>Earth Generator</h3>
                <p>You have {props.formatValues(props.getValue("earth"))} Earth</p>
                <h3>{props.earthAmount}</h3>
                <h4>Cost: {getCost("earth")} {props.waterAmount > 0 ? "earth" : "energy"}</h4>
            
            </button>
            
        </div>
        <div id="GeneratorssecondRow">
            
        </div>
    </div>
  );
}

export default GeneratorTab;
