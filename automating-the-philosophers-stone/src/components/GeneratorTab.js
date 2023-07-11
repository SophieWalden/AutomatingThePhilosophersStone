import './GeneratorTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

function GeneratorTab(props) {

    let flameburstQueue = [];

    function getCost(element){
        let costs = {"fire": new Decimal(new Decimal(2).pow(props.getValue("fireGeneratorAmount"))).floor(),
                     "water": new Decimal(2.5).times(new Decimal(2.1).pow(props.getValue("waterGeneratorAmount"))).floor(),
                     "earth": new Decimal(10).times(new Decimal(2.5).pow(props.getValue("earthGeneratorAmount"))).floor(),
                     "air": new Decimal(25).times(new Decimal(3.5).pow(props.getValue("airGeneratorAmount"))).floor(),
                     "space": new Decimal(50).times(new Decimal(5).pow(props.getValue("spaceGeneratorAmount"))).floor(),
                     "aether": new Decimal(75).times(new Decimal(10).pow(props.getValue("spaceGeneratorAmount"))).floor()
                    }

        if (props.getUpgradeCount("earthUpgradeR1C2") == 1){
            costs["earth"] = costs["earth"].dividedBy((props.getValue("waterGeneratorAmount").times(props.getValue("waterGeneratorMult")).plus(1))).floor()
        }


        return costs[element];
    }


    function createGenerator(element, amount){
        let generatorNames = {"fire": "fireGeneratorAmount", "water": "waterGeneratorAmount", "earth": "earthGeneratorAmount",
                              "air": "airGeneratorAmount", "space": "spaceGeneratorAmount", "aether": "aetherGeneratorAmount"}

        props.addValue(generatorNames[element], amount)
    }

    function getGeneratorAmount(element){
        let generators = {"fire": props.getValue("fireGeneratorAmount"), "water": props.getValue("waterGeneratorAmount"),"earth": props.getValue("earthGeneratorAmount"),
                            "air": props.getValue("airGeneratorAmount"), "space": props.getValue("spaceGeneratorAmount"), "aether": props.getValue("aetherGeneratorAmount")}

        return generators[element];
    }

  function buyGenerator(element){
    let generatorAmount = getGeneratorAmount(element);

    // Buy With Energy
    if (generatorAmount.equals(0)){
        if (canYouBuyGenerator(element)){
            props.addValue("spentEnergy", getCost(element))
            createGenerator(element, 1);
        }
    }else{ // Buy with the specific currency
        if (canYouBuyGenerator(element)){
            props.addValue(element, getCost(element).times(new Decimal(-1)));
            createGenerator(element, 1);
        }   
    }
  }

  function canYouBuyGenerator(element){
    let generatorAmount = getGeneratorAmount(element);

    // Buy With Energy
    if (generatorAmount.equals(0)){
        let cost = getCost(element);
        let energyAmount = props.getValue("energy").minus(props.getValue("spentEnergy"))
        
        if (energyAmount.greaterThanOrEqualTo(cost)){
            return true
        }


    }else{ // Buy with the specific currency
        let currentAmount = props.getValue(element);
        let cost = getCost(element)

        if (currentAmount.greaterThanOrEqualTo(cost)){
            return true;
        }   
    }

    return false;
  }

  function update(){
    // Everything that needs to be called routinely
    let deltaTime = new Decimal(33).dividedBy(1000);

    // Update Generators
     
    let earthR2C3prod = [new Decimal(10).pow(props.getUpgradeCount("earthUpgradeR2C3")), undefined];
    if (props.getUpgradeCount("earthUpgradeR2C3") >= 1){
        let fireValue = new Decimal(props.getValue("fire").plus(1).log(10)).floor(); 
        let waterValue = new Decimal(props.getValue("water").plus(1).log(4)).floor(); 
        let earthValue = new Decimal(props.getValue("earth").plus(1).log(2)).floor()
        
        if (fireValue.greaterThanOrEqualTo(waterValue) && fireValue.greaterThanOrEqualTo(earthValue)){
            earthR2C3prod[1] = "fire"
        }

        if (waterValue.greaterThanOrEqualTo(earthValue) && waterValue.greaterThanOrEqualTo(fireValue)){
            earthR2C3prod[1] = "water";
        }

        if (earthValue.greaterThanOrEqualTo(waterValue) && earthValue.greaterThanOrEqualTo(fireValue)){
            earthR2C3prod[1] = "earth";
        }
        
    }
    

    // Earth
    let newEarth = getGeneratorAmount("earth").times(deltaTime)

    if (props.getUpgradeCount("earthUpgradeR2C1") == 1){
        newEarth = newEarth.times(new Decimal(1.1).pow(props.getValue("timeSinceStartOfGame").log(10)));
    }

    if (props.getUpgradeCount("earthUpgradeR1C1") == 1){
        newEarth = newEarth.times(new Decimal(1).plus(props.getValue("fireGeneratorAmount")).plus(props.getValue("earthGeneratorAmount")).plus(props.getValue("waterGeneratorAmount").times(props.getValue("waterGeneratorMult"))));
    }

    if (earthR2C3prod[1] == "earth"){
        newEarth = newEarth.times(earthR2C3prod[0]);
    }

    props.addValue("earth", newEarth);

    // Water
    let newWater = getGeneratorAmount("water").times(props.getValue("waterGeneratorMult")).times(deltaTime);

    if (props.getUpgradeCount("earthUpgradeR2C2") == 1){
        newWater = newWater.plus(newEarth.times(0.01));
    }

    newWater = newWater.times(new Decimal(2).pow(props.getUpgradeCount("waterRepeatable")));



    if (props.getUpgradeCount("waterUpgradeR1C1")){
        newWater = newWater.times(props.getValue("waterGeneratorAmount").times(props.getValue("waterGeneratorMult")).plus(1))
    }

    if (props.getUpgradeCount("waterUpgradeR2C1")){
        newWater = newWater.times(new Decimal(1.25).pow(props.getValue("fire").log(10)).plus(1));
    }

    if (props.getUpgradeCount("waterUpgradeR1C2")){
        let leftoverWater = newWater.times(0.05)
        props.addValue("condensorMult", leftoverWater);
        
        newWater = newWater.times(0.95).times(new Decimal(1.1).pow(Math.log(props.getValue("condensorMult"))));
    }

    if (earthR2C3prod[1] == "water"){
        newWater = newWater.times(earthR2C3prod[0]);
    }


    props.addValue("water", newWater);


    // Fire
    let newFire = getGeneratorAmount("fire").times(deltaTime); 

    if (props.getUpgradeCount("fireUpgradeR1C1") == 1){
        newFire = newFire.times(3.5);
    }

    if (props.getUpgradeCount("waterUpgradeR2C2") == 1){
        newFire = newFire.plus(newWater.times(0.01));
    }


    newFire = newFire.times(new Decimal(2).pow(props.getUpgradeCount("fireRepeatable")));


    if (props.getUpgradeCount("fireUpgradeR1C2") == 1){
        newFire = newFire.times(new Decimal(1).plus(new Decimal(50000).dividedBy(props.getValue("timeSinceLastRebirth").dividedBy(new Decimal(1000)))));
    }

    // Flame burst (Fire Upgrade R2C1-3)
    if (props.getUpgradeCount("fireUpgradeR2C1") >= 1){
        let random = Math.random()
        if (props.getValue("flameburstChance").greaterThanOrEqualTo(random)){
            flameburstQueue.push(props.getValue("flameburstLength").times(1000).plus(Date.now()))
        }
        
        while (flameburstQueue.length > 0 && new Decimal(Date.now()).greaterThan(flameburstQueue[0])){
            flameburstQueue.splice(0, 1);
        }

        newFire = newFire.times(props.getValue("flameburstMult").pow(flameburstQueue.length));
    }

    if (earthR2C3prod[1] == "fire"){
        newFire = newFire.times(earthR2C3prod[0]);
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
    props.getUpgradeCount("earthUpgradeR2C1"), props.getUpgradeCount("earthUpgradeR2C2"), props.getUpgradeCount("earthUpgradeR2C3"), props.getUpgradeCount("fireUpgradeR1C1")])
    

  return (
    
    <div className="GeneratorContainer">
        
        <div id="GeneratorsfirstRow">
            <button className="Generator" id="fireGenerator" onClick={() => buyGenerator("fire")}>
                <h3>Fire Generator</h3>
                <p>You have {props.formatValues(props.getValue("fire"))} Fire</p>
                <h3>{props.formatValues(props.getValue("fireGeneratorAmount"))}</h3>
                <h4>Cost: {props.formatValues(getCost("fire"))} {props.getValue("fireGeneratorAmount") > 0 ? "fire" : "energy"}</h4>
            
            </button>

            <button className="Generator" id="waterGenerator" onClick={() => buyGenerator("water")}>
                <h3>Water Generator</h3>
                <p>You have {props.formatValues(props.getValue("water"))} Water</p>
                <h3>{props.formatValues((props.getValue("waterGeneratorAmount").times(props.getValue("waterGeneratorMult"))))}</h3>
                <h4>Cost: {props.formatValues(getCost("water"))} {props.getValue("waterGeneratorAmount") > 0 ? "water" : "energy"}</h4>
            
            </button>

            <button className="Generator" id="earthGenerator" onClick={() => buyGenerator("earth")}>
                <h3>Earth Generator</h3>
                <p>You have {props.formatValues(props.getValue("earth"))} Earth</p>
                <h3>{props.formatValues(props.getValue("earthGeneratorAmount"))}</h3>
                <h4>Cost: {props.formatValues(getCost("earth"))} {props.getValue("earthGeneratorAmount") > 0 ? "earth" : "energy"}</h4>
            
            </button>
            
        </div>
        <div id="GeneratorssecondRow">
            <button className="Generator" id="airGenerator" onClick={() => buyGenerator("air")}>
                <h3>Air Generator</h3>
                <p>You have {props.formatValues(props.getValue("air"))} Air</p>
                <h3>{props.formatValues(props.getValue("airGeneratorAmount"))}</h3>
                <h4>Cost: {props.formatValues(getCost("air"))} {props.getValue("airGeneratorAmount") > 0 ? "air" : "energy"}</h4>
            
            </button>

            <button className="Generator" id="spaceGenerator" onClick={() => buyGenerator("space")}>
                <h3>Space Generator</h3>
                <p>You have {props.formatValues(props.getValue("space"))} Space</p>
                <h3>{props.formatValues(props.getValue("spaceGeneratorAmount"))}</h3>
                <h4>Cost: {props.formatValues(getCost("space"))} {props.getValue("spaceGeneratorAmount") > 0 ? "space" : "energy"}</h4>
            
            </button>

            <button className="Generator" id="aetherGenerator" onClick={() => buyGenerator("aether")}>
                <h3>Aether Generator</h3>
                <p>You have {props.formatValues(props.getValue("aether"))} Aether</p>
                <h3>{props.formatValues(props.getValue("aetherGeneratorAmount"))}</h3>
                <h4>Cost: {props.formatValues(getCost("aether"))} {props.getValue("aetherGeneratorAmount") > 0 ? "aether" : "energy"}</h4>
            
            </button>
        </div>
    </div>
  );
}

export default GeneratorTab;
