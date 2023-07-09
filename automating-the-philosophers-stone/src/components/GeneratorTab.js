import './GeneratorTab.css';
import React, {useState, useEffect} from "react";

function GeneratorTab(props) {

   // Count of generator for each element
   let [fireAmount, setFireAmount] = React.useState(0);

    function getCost(element){
        let costs = {"fire": Math.floor(2 ** fireAmount)
                    }


        return costs[element];
    }


    function createGenerator(element, amount){
        let currentAmount = {"fire": fireAmount}
        let settingFunction = {"fire": setFireAmount}

        settingFunction[element](currentAmount[element] + amount)
    }

    function getGeneratorAmount(element){
        let generators = {"fire": fireAmount}

        return generators[element];
    }

  function buyGenerator(element){
    let generatorAmount = getGeneratorAmount(element);

    // Buy With Energy
    if (generatorAmount == 0){
        let cost = getCost(element);
        let energyAmount = props.getValue("energy") - props.getValue("spentEnergy")
        
        if (energyAmount >= cost){
            props.setValue("spentEnergy", props.getValue("spentEnergy") + cost)
            createGenerator(element, 1);
        }


    }else{ // Buy with the specific currency
        let currentAmount = props.getValue(element);
        let cost = getCost(element)

        if (currentAmount >= cost){
            props.setValue(element, currentAmount - cost);
            createGenerator(element, 1);
        }   
    }
  }

  function update(){
    // Everything that needs to be called routinely
    let deltaTime = 33/1000;

    // Update Generators
    let newFire = getGeneratorAmount("fire") * deltaTime
    props.addValue("fire", newFire);
  }

  // Call update every 33 ms (update time)
  React.useEffect(() => {
    const interval = setInterval(() => {
        update();
    }, 33);
    
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [fireAmount])

  return (
    
    <div className="GeneratorContainer">
        
        <div id="GeneratorsfirstRow">
            <button className="Generator" id="fireGenerator" onClick={() => buyGenerator("fire")}>
                <h3>Fire Generator</h3>
                <h4>You have {props.formatValues(props.getValue("fire"))} Fire</h4>
                <h3>{fireAmount}</h3>
                <h4>Cost: {getCost("fire")} {fireAmount > 0 ? "fire" : "energy"}</h4>
            
            </button>
        </div>
        <div id="GeneratorssecondRow">
            
        </div>
    </div>
  );
}

export default GeneratorTab;
