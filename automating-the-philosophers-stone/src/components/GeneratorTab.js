import './GeneratorTab.css';
import React, {useState} from "react";

function GeneratorTab(props) {

    let flameburstQueue = [];

    function getCost(element){
        let costs = {"fire": Math.floor(2 ** props.getValue("fireGeneratorAmount")),
                     "water": Math.floor(2.5 * 2.1 ** props.getValue("waterGeneratorAmount")),
                     "earth": Math.floor(10 * 2.5 ** props.getValue("earthGeneratorAmount"))
                    }

        if (props.getUpgradeCount("fireUpgradeR1C1") == 1){
            costs["fire"] = props.formatValues(costs["fire"] / (1+props.getValue("fireGeneratorAmount")));
        }

        if (props.getUpgradeCount("earthUpgradeR1C1") == 1){
            costs["earth"] = props.formatValues(costs["earth"] / (props.getValue("waterGeneratorAmount") * props.getValue("waterGeneratorMult") + 1))
        }


        return costs[element];
    }


    function createGenerator(element, amount){
        let generatorNames = {"fire": "fireGeneratorAmount", "water": "waterGeneratorAmount", "earth": "earthGeneratorAmount"}

        props.addValue(generatorNames[element], amount)
    }

    function getGeneratorAmount(element){
        let generators = {"fire": props.getValue("fireGeneratorAmount"), "water": props.getValue("waterGeneratorAmount"),"earth": props.getValue("earthGeneratorAmount")}

        return generators[element];
    }

  function buyGenerator(element){
    let generatorAmount = getGeneratorAmount(element);

    // Buy With Energy
    if (generatorAmount === 0){
        if (canYouBuyGenerator(element)){
            props.addValue("spentEnergy", getCost(element))
            createGenerator(element, 1);
        }
    }else{ // Buy with the specific currency
        if (canYouBuyGenerator(element)){
            props.addValue(element, -getCost(element));
            createGenerator(element, 1);
        }   
    }
  }

  function canYouBuyGenerator(element){
    let generatorAmount = getGeneratorAmount(element);

    // Buy With Energy
    if (generatorAmount === 0){
        let cost = getCost(element);
        let energyAmount = props.getValue("energy") - props.getValue("spentEnergy")
        
        if (energyAmount >= cost){
            return true
        }


    }else{ // Buy with the specific currency
        let currentAmount = props.getValue(element);
        let cost = getCost(element)

        if (currentAmount >= cost){
            return true;
        }   
    }

    return false;
  }

  function update(){
    // Everything that needs to be called routinely
    let deltaTime = 33/1000;

    // Update Generators
     
    let earthR2C3prod = [10 ** props.getUpgradeCount("earthUpgradeR2C3"), undefined];
    if (props.getUpgradeCount("earthUpgradeR2C3") >= 1){
        let fireValue = Math.floor(Math.log10(props.getValue("fire")+1)); 
        let waterValue = Math.floor(Math.log(props.getValue("water") + 1) / Math.log(4));
        let earthValue = Math.floor(Math.log(props.getValue("earth") + 1) / Math.log(2));
        
        if (fireValue >= waterValue && fireValue >= earthValue){
            earthR2C3prod[1] = "fire"
        }

        if (waterValue >= earthValue && waterValue >= fireValue){
            earthR2C3prod[1] = "water";
        }

        if (earthValue >= waterValue && earthValue >= fireValue){
            earthR2C3prod[1] = "earth";
        }
        
    }
    

    // Earth
    let newEarth = getGeneratorAmount("earth") * deltaTime

    if (props.getUpgradeCount("earthUpgradeR1C2") == 1){
        newEarth *= 1.1 ** Math.log(props.getValue("timeSinceStartOfGame"));
    }

    if (props.getUpgradeCount("earthUpgradeR2C1") == 1){
        newEarth *= 1 + props.getValue("fireGeneratorAmount") + props.getValue("earthGeneratorAmount") + props.getValue("waterGeneratorAmount") * props.getValue("waterGeneratorMult");
    }

    if (earthR2C3prod[1] == "earth"){
        newEarth *= earthR2C3prod[0];
    }

    props.addValue("earth", newEarth);

    // Water
    let newWater = getGeneratorAmount("water") * props.getValue("waterGeneratorMult") * deltaTime

    if (props.getUpgradeCount("earthUpgradeR2C2")){
        newWater += newEarth * 0.01;
    }

    newWater *= 2 ** props.getUpgradeCount("waterRepeatable")



    if (props.getUpgradeCount("waterUpgradeR1C1")){
        newWater *= props.getValue("waterGeneratorAmount") * props.getValue("waterGeneratorMult") + 1
    }

    if (props.getUpgradeCount("waterUpgradeR2C1")){
        newWater *= 1.25 ** Math.log(props.getValue("fire")) + 1
    }

    if (props.getUpgradeCount("waterUpgradeR1C2")){
        let leftoverWater = newWater * 0.05
        props.addValue("condensorMult", leftoverWater);
        
        newWater = newWater * 0.95 * 1.1 ** Math.log(props.getValue("condensorMult"));
    }

    if (earthR2C3prod[1] == "water"){
        newWater *= earthR2C3prod[0];
    }


    props.addValue("water", newWater);


    // Fire
    let newFire = getGeneratorAmount("fire") * deltaTime 

    if (props.getUpgradeCount("waterUpgradeR2C2")){
        newFire += newWater * 0.01;
    }


    newFire *= 2 ** props.getUpgradeCount("fireRepeatable")


    if (props.getUpgradeCount("fireUpgradeR1C2") == 1){
        newFire *= 1 + (100000 / props.getValue("timeSinceLastRebirth"))
    }

    // Flame burst (Fire Upgrade R2C1-3)
    if (props.getUpgradeCount("fireUpgradeR2C1") >= 1){
        let random = Math.random()
        if (random <= props.getValue("flameburstChance")){
            flameburstQueue.push(props.getValue("flameburstLength") * 1000  + Date.now())
        }
        
        while (flameburstQueue[0] < Date.now()){
            flameburstQueue.splice(0, 1);
        }

        newFire *= props.getValue("flameburstMult") ** flameburstQueue.length
    }

    if (earthR2C3prod[1] == "fire"){
        newFire *= earthR2C3prod[0];
    }

    props.addValue("fire", newFire);

    // Autobuyers
    if (props.getUpgradeCount("fireUpgradeR1C3") == 1 && canYouBuyGenerator("fire")){
        buyGenerator("fire");
    }

    if (props.getUpgradeCount("waterUpgradeR1C3") == 1 && canYouBuyGenerator("water")){
        buyGenerator("water")
    }

    if (props.getUpgradeCount("earthUpgradeR1C3") == 1 && canYouBuyGenerator("earth")){
        buyGenerator("earth")
    }

  }

  // Call update every 33 ms (update time)
  React.useEffect(() => {
    const interval = setInterval(() => {
        update();
    }, 33);
    
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [props.getValue("fireGeneratorAmount"), props.getUpgradeCount("fireRepeatable"), props.getValue("waterGeneratorAmount"), props.getValue("earthGeneratorAmount"), props.getUpgradeCount("fireUpgradeR1C2"),
    props.getUpgradeCount("fireUpgradeR1C3") && canYouBuyGenerator("fire"), props.getUpgradeCount("fireUpgradeR2C1"), props.getUpgradeCount("fireUpgradeR2C2"), props.getUpgradeCount("fireUpgradeR2C3"),
    flameburstQueue.length, props.getUpgradeCount("waterUpgradeR1C1"), props.getUpgradeCount("waterRepeatable"), props.getUpgradeCount("waterUpgradeR1C2"), props.getUpgradeCount("waterUpgradeR1C3") && canYouBuyGenerator("water"),
    props.getUpgradeCount("waterUpgradeR2C1"), props.getUpgradeCount("waterUpgradeR2C2"), props.getUpgradeCount("waterUpgradeR2C3"), props.getUpgradeCount("earthUpgradeR1C1"), props.getUpgradeCount("earthRepeatable"), props.getUpgradeCount("earthUpgradeR1C2"), props.getUpgradeCount("earthUpgradeR1C3") && canYouBuyGenerator("earth"),
    props.getUpgradeCount("earthUpgradeR2C1"), props.getUpgradeCount("earthUpgradeR2C2"), props.getUpgradeCount("earthUpgradeR2C3")])
    

  return (
    
    <div className="GeneratorContainer">
        
        <div id="GeneratorsfirstRow">
            <button className="Generator" id="fireGenerator" onClick={() => buyGenerator("fire")}>
                <h3>Fire Generator</h3>
                <p>You have {props.formatValues(props.getValue("fire"))} Fire</p>
                <h3>{props.getValue("fireGeneratorAmount")}</h3>
                <h4>Cost: {getCost("fire")} {props.getValue("fireGeneratorAmount") > 0 ? "fire" : "energy"}</h4>
            
            </button>

            <button className="Generator" id="waterGenerator" onClick={() => buyGenerator("water")}>
                <h3>Water Generator</h3>
                <p>You have {props.formatValues(props.getValue("water"))} Water</p>
                <h3>{props.getValue("waterGeneratorAmount") * props.getValue("waterGeneratorMult")}</h3>
                <h4>Cost: {getCost("water")} {props.getValue("waterGeneratorAmount") > 0 ? "water" : "energy"}</h4>
            
            </button>

            <button className="Generator" id="earthGenerator" onClick={() => buyGenerator("earth")}>
                <h3>Earth Generator</h3>
                <p>You have {props.formatValues(props.getValue("earth"))} Earth</p>
                <h3>{props.getValue("earthGeneratorAmount")}</h3>
                <h4>Cost: {getCost("earth")} {props.getValue("earthGeneratorAmount") > 0 ? "earth" : "energy"}</h4>
            
            </button>
            
        </div>
        <div id="GeneratorssecondRow">
            
        </div>
    </div>
  );
}

export default GeneratorTab;
