import './GeneratorTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";
import { a } from 'react-spring';

function GeneratorTab(props) {

    

    function getCost(element){
        let costs = {"fire": new Decimal(new Decimal(2).pow(props.getValue("fireGeneratorAmount"))).floor(),
                     "water": new Decimal(2.5).times(new Decimal(2.1).pow(props.getValue("waterGeneratorAmount"))).floor(),
                     "earth": new Decimal(10).times(new Decimal(2.5).pow(props.getValue("earthGeneratorAmount"))).floor(),
                     "air": new Decimal(25).times(new Decimal(3.5).pow(props.getValue("airGeneratorAmount"))).floor(),
                     "space": new Decimal(50).times(new Decimal(5).pow(props.getValue("spaceGeneratorAmount"))).floor(),
                     "aether": new Decimal(75).times(new Decimal(10).pow(props.getValue("aetherGeneratorAmount"))).floor()
                    }

        if (props.getUpgradeCount("earthUpgradeR1C2") == 1){
            costs["earth"] = costs["earth"].dividedBy(props.formatValues(new Decimal((props.getValue("waterGeneratorAmount") * (new Decimal(3).pow(props.getUpgradeCount("waterUpgradeR2C3"))) + 1) ** (1 + 0.2*props.getChallengeValue("challengeOneCompletions"))))).floor()
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

    if (element == "fire" && ["challenge1", "challenge2"].indexOf(props.getChallengeValues("activeChallenge")) != -1) return false;
    if (element == "water" && ["challenge2", "challenge5"].indexOf(props.getChallengeValues("activeChallenge")) != -1) return false;
    if (element == "earth" && ["challenge5"].indexOf(props.getChallengeValues("activeChallenge")) != -1) return false;

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
     
    let earthR2C3prod = [new Decimal(10000).pow(props.getUpgradeCount("earthUpgradeR2C3")), undefined];
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

    
    // Air
    let newAir = getGeneratorAmount("air").times(deltaTime)

    props.addValue("air", newAir);
    

    // Earth
    let newEarth = getGeneratorAmount("earth").times(deltaTime)

    newEarth = newEarth.times(props.getValue("air").plus(1))

    if (props.getUpgradeCount("earthUpgradeR2C1") == 1){
        newEarth = newEarth.times(new Decimal(1.1).pow(props.getValue("timeSinceStartOfGame").log(10)));
    }

    if (props.getUpgradeCount("earthUpgradeR1C1") == 1){
        newEarth = newEarth.times(new Decimal(1).plus(props.getValue("fireGeneratorAmount")).plus(props.getValue("earthGeneratorAmount")).plus((props.getValue("waterGeneratorAmount").times((new Decimal(5).pow(props.getUpgradeCount("waterUpgradeR2C3"))))).pow(props.getChallengeValue("challengeOneCompletions") == 1 ? (new Decimal(props.getValue("challengeOneHighest").plus(1).log(100)).dividedBy(100).plus(1.2)) : 1)));
    }

    if (earthR2C3prod[1] == "earth"){
        newEarth = newEarth.times(earthR2C3prod[0]);
    }

    if (props.getChallengeValue("challengeTwoCompletions")){
        newEarth = newEarth.times(props.getValue("earthGeneratorAmount").times(new Decimal(props.getValue("challengeTwoHighest").plus(1).log(10)).plus(1)));
    }

    newEarth = newEarth.times(new Decimal(2).pow(props.getUpgradeCount("earthRepeatable")))

    if (props.getChallengeValues("activeChallenge") == "challenge4"){
        newEarth = newEarth.times(props.getValue("productionMult"))
    }

    if (props.getChallengeValue("challengeSixCompletions")){
        newEarth = newEarth.times(new Decimal(1.1).pow(props.getValue("timeSinceStartOfGame").log(1.01)).times(props.getValue("challengeSixHighest").log(10)));
    }

    if (props.getChallengeValue("activeChallenge") == "challenge7") newEarth = newEarth.pow(0.5);

    if (["challenge5"].indexOf(props.getChallengeValues("activeChallenge")) != -1) newEarth = new Decimal(0);

    props.addValue("earth", newEarth);
    
    // Water
    let newWater = (getGeneratorAmount("water").times(new Decimal(5).pow(props.getUpgradeCount("waterUpgradeR2C3")))).pow(props.getChallengeValue("challengeOneCompletions") * 0.2 + 1).times(deltaTime);

    if (props.getUpgradeCount("earthUpgradeR2C2") == 1){
        newWater = newWater.plus(newEarth.times(0.01));
    }

    newWater = newWater.times(props.getValue("air").plus(1))

    newWater = newWater.times(new Decimal(2).pow(props.getUpgradeCount("waterRepeatable")));



    if (props.getUpgradeCount("waterUpgradeR1C1")){
        newWater = newWater.times((props.getValue("waterGeneratorAmount").times((new Decimal(5).pow(props.getUpgradeCount("waterUpgradeR2C3"))))).pow(props.getChallengeValue("challengeOneCompletions") == 1 ? (new Decimal(props.getValue("challengeOneHighest").plus(1).log(100)).dividedBy(100).plus(1.2)) : 1).plus(1))
    }

    if (props.getUpgradeCount("waterUpgradeR2C1")){
        newWater = newWater.times(new Decimal(1.25).pow(props.getValue("fire").log(10)).plus(1));
    }

    if (props.getUpgradeCount("waterUpgradeR1C2")){
        let leftoverWater = newWater.times(0.05)
        props.addValue("condensorMult", leftoverWater);
        

        newWater = newWater.times(0.95).times(new Decimal(1.1).pow(props.getValue("condensorMult").log(10)));
    }

    if (earthR2C3prod[1] == "water"){
        newWater = newWater.times(earthR2C3prod[0]);
    }

    if (props.getChallengeValues("activeChallenge") == "challenge4"){
        newWater = newWater.times(props.getValue("productionMult"))
    }

    if (props.getChallengeValue("challengeSixCompletions")){
        newWater = newWater.times(new Decimal(1.1).pow(props.getValue("timeSinceStartOfGame").log(1.01)));
    }

    if (props.getChallengeValue("activeChallenge") == "challenge7") newWater = newWater.pow(0.5);

    if (["challenge2", "challenge5"].indexOf(props.getChallengeValues("activeChallenge")) != -1) newWater = new Decimal(0);

    props.addValue("water", newWater);


    // Fire
    let newFire = getGeneratorAmount("fire").times(deltaTime);
    
    if (props.getUpgradeCount("waterUpgradeR2C2") == 1){
        newFire = newFire.plus(newWater.times(0.01));
    }

    newFire = newFire.times(props.getValue("air").plus(1))

    if (props.getUpgradeCount("fireUpgradeR1C1") == 1){
        newFire = newFire.times(3.5);
    }


    newFire = newFire.times(new Decimal(2).pow(props.getUpgradeCount("fireRepeatable")));


    if (props.getUpgradeCount("fireUpgradeR1C2") == 1){
        newFire = newFire.times(new Decimal(1).plus(new Decimal(50000).dividedBy(props.getValue("timeSinceLastRebirth").dividedBy(new Decimal(1000)))));
    }
    

    // Flame burst (Fire Upgrade R2C1-3)
    if (props.getUpgradeCount("fireUpgradeR2C1") >= 1){
        let procs = 0;

        for (let i = 0; i < props.getUpgradeCount("fireUpgradeR2C3") + 1; i++){
            let random = Math.random();
            if ((props.getUpgradeCount("fireUpgradeR2C1") * 0.05 + 0.1) >= random){
                procs += 1;
            }else{
                break;
            }
        }
        
        newFire = newFire.times((new Decimal(1.5).pow(props.getUpgradeCount("fireUpgradeR2C2")).times(10)).pow(procs));
    }



    if (earthR2C3prod[1] == "fire"){
        newFire = newFire.times(earthR2C3prod[0]);
    }

    if (props.getChallengeValues("activeChallenge") == "challenge4" || props.getChallengeValues("activeChallenge") == "challenge6"){
        newFire = newFire.times(props.getValue("productionMult"))
    }

    if (props.getChallengeValue("challengeSixCompletions")){
        newFire = newFire.times(new Decimal(1.1).pow(props.getValue("timeSinceStartOfGame").log(1.01)));
    }

    if (props.getChallengeValue("activeChallenge") == "challenge7") newFire = newFire.pow(0.5);

    if (["challenge1", "challenge2"].indexOf(props.getChallengeValues("activeChallenge")) != -1) newFire = new Decimal(0);

    props.addValue("fire", newFire);

    // Space
    let newSpace = props.getValue("spaceGeneratorAmount").times(deltaTime)

    newSpace = new Decimal(1.2).pow(newSpace).times(props.getValue("spaceGeneratorAmount"))

    if (props.getChallengeValue("activeChallenge") == "challenge7") newSpace = newSpace.pow(0.5);

    props.addValue("space", newSpace)

    // Aether

    let newAether = props.getValue("aetherGeneratorAmount").times(deltaTime)

    if (props.getChallengeValue("activeChallenge") == "challenge7") newAether = newAether.pow(0.5);

    props.addValue("aether", newAether.pow(0.5))

    // Autobuyers
    if ((props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C2")) || props.getChallengeValue("activeChallenge") != "") && props.getValue("fire").greaterThanOrEqualTo(props.getUpgradeCost("fireRepeatable")[0])){
        props.buyUpgrade("fireRepeatable");
    }
    else if ((props.getUpgradeCount("fireUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1")) || props.getChallengeValue("activeChallenge") != "") && canYouBuyGenerator("fire")){
        buyGenerator("fire");
    }

    if ((props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C2")) || props.getChallengeValue("activeChallenge") != "") && props.getValue("earth").greaterThanOrEqualTo(props.getUpgradeCost("earthRepeatable")[0])){
        props.buyUpgrade("earthRepeatable");
    }
    else if ((props.getUpgradeCount("earthUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1")) || props.getChallengeValue("activeChallenge") != "") && canYouBuyGenerator("earth")){
        buyGenerator("earth")
    }


    if ((props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C2")) || props.getChallengeValue("activeChallenge") != "") && props.getValue("water").greaterThanOrEqualTo(props.getUpgradeCost("waterRepeatable")[0])){
        props.buyUpgrade("waterRepeatable");
    }
    else if ((props.getUpgradeCount("waterUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1")) || props.getChallengeValue("activeChallenge") != "") && canYouBuyGenerator("water")){
        buyGenerator("water")
    }

    // Correcting negatives
    if (props.getValue("fire") < 0) props.setValue("fire", new Decimal(1));
    if (props.getValue("water") < 0) props.setValue("water", new Decimal(1));
    if (props.getValue("earth") < 0) props.setValue("earth", new Decimal(1));
    if (props.getValue("air") < 0) props.setValue("air", new Decimal(1));
    if (props.getValue("space") < 0) props.setValue("space", new Decimal(1));
    if (props.getValue("aether") < 0) props.setValue("aether", new Decimal(1));

  }


  // Call update every 33 ms (update time)
  React.useEffect(() => {
    const interval = setInterval(() => {
        update();
    }, 33);
    
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [props.getValue("fireGeneratorAmount"), props.getUpgradeCount("fireRepeatable"), props.getValue("waterGeneratorAmount"), props.getValue("earthGeneratorAmount"), props.getUpgradeCount("fireUpgradeR1C2"),
    props.getUpgradeCount("fireUpgradeR1C3") && canYouBuyGenerator("fire"), props.getUpgradeCount("fireUpgradeR2C1"), props.getUpgradeCount("fireUpgradeR2C2"), props.getUpgradeCount("fireUpgradeR2C3"),
     props.getUpgradeCount("waterUpgradeR1C1"), props.getUpgradeCount("waterRepeatable"), props.getUpgradeCount("waterUpgradeR1C2"), props.getUpgradeCount("waterUpgradeR1C3") && canYouBuyGenerator("water"),
    props.getUpgradeCount("waterUpgradeR2C1"), props.getUpgradeCount("waterUpgradeR2C2"), props.getUpgradeCount("waterUpgradeR2C3"), props.getUpgradeCount("earthUpgradeR1C1"), props.getUpgradeCount("earthRepeatable"), props.getUpgradeCount("earthUpgradeR1C2"), props.getUpgradeCount("earthUpgradeR1C3") && canYouBuyGenerator("earth"),
    props.getUpgradeCount("earthUpgradeR2C1"), props.getUpgradeCount("earthUpgradeR2C2"), props.getUpgradeCount("earthUpgradeR2C3"), props.getUpgradeCount("fireUpgradeR1C1"), props.getValue("air"), props.getValue("airGeneratorAmount")
            ,])
    
    let challengeDisplayNames = {"challenge1": "Challenge 1", "challenge2": "Challenge 2","challenge3": "Challenge 3", "challenge4": "Challenge 4", "challenge5": "Challenge 5", "challenge6": "Challenge 6", "challenge7": "Challenge 7"}

    function formatDate(milliseconds){
        let time = {"hours": 0, "minutes": 0, "seconds": 0};

        while (milliseconds > 60 * 60 * 1000){
            milliseconds -= 60 * 60 * 1000;
            time["hours"] += 1;
        }

        while (milliseconds > 60 * 1000){
            milliseconds -= 60 * 1000;
            time["minutes"] += 1;
        }
    
        time["seconds"] = Math.floor(milliseconds / 1000)
        
        let returnVal = "";

        if (time["hours"] != 0) returnVal += `${time["hours"]} hours`

        if (time["minutes"] != 0){
            if (returnVal != "") returnVal += ", ";
            returnVal += `${time["minutes"]} minutes`
        }

        if (returnVal != ""){
            returnVal += ", and ";
        }

        returnVal += `${time["seconds"]} seconds`;

        return returnVal
    }

  return (
    
    <div className="GeneratorContainer">
        <h3 className={props.getChallengeValues("activeChallenge") == "" ? "notUnlocked":  ""}>You are in {challengeDisplayNames[props.getChallengeValues("activeChallenge")]}</h3>
        <h3 className={props.getChallengeValues("activeChallenge") == "" ? "notUnlocked":  ""}>You have been in this challenge for {formatDate(Date.now() - props.getChallengeValues("timeOfStartChallenge"))}</h3>

        <div id="GeneratorsfirstRow">
            <button disabled={["challenge1", "challenge2"].indexOf(props.getChallengeValues("activeChallenge")) != -1} className="Generator" id="fireGenerator" onClick={() => buyGenerator("fire")}>
                <h3>Fire Generator</h3>
                <p>You have {props.formatValues(props.getValue("fire"), true)} Fire</p>
                <h3>{props.formatValues(props.getValue("fireGeneratorAmount"))}</h3>
                <h4>Cost: {props.formatValues(getCost("fire"))} {props.getValue("fireGeneratorAmount") > 0 ? "fire" : "energy"}</h4>
            
            </button>

            <button disabled={["challenge2", "challenge5"].indexOf(props.getChallengeValues("activeChallenge")) != -1} className={`Generator ${props.getValue("energy") >= 3 || props.getValue("firstReset") == false ? "" : "notUnlocked"}`} id="waterGenerator" onClick={() => buyGenerator("water")}>
                <h3>Water Generator</h3>
                <p>You have {props.formatValues(props.getValue("water"), true)} Water</p>
                <h3>{props.formatValues((props.getValue("waterGeneratorAmount").times((new Decimal(5).pow(props.getUpgradeCount("waterUpgradeR2C3"))))).pow(props.getChallengeValue("challengeOneCompletions") == 1 ? (new Decimal(props.getValue("challengeOneHighest").plus(1).log(100)).dividedBy(100).plus(1.2)) : 1))}</h3>
                <h4>Cost: {props.formatValues(getCost("water"))} {props.getValue("waterGeneratorAmount") > 0 ? "water" : "energy"}</h4>
            
            </button>

            <button disabled={["challenge5"].indexOf(props.getChallengeValues("activeChallenge")) != -1} className={`Generator ${props.getValue("firstReset") == false || props.getValue("energyMult") != 1  ? "" : "notUnlocked"}`} id="earthGenerator" onClick={() => buyGenerator("earth")}>
                <h3>Earth Generator</h3>
                <p>You have {props.formatValues(props.getValue("earth"), true)} Earth</p>
                <h3>{props.formatValues(props.getValue("earthGeneratorAmount"))}</h3>
                <h4>Cost: {props.formatValues(getCost("earth"))} {props.getValue("earthGeneratorAmount") > 0 ? "earth" : "energy"}</h4>
            
            </button>
            
        </div>
        <div id="GeneratorssecondRow">
            <button className={`Generator ${props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR1C2")) || props.getChallengeValue("activeChallenge") != "" ? "" : "notUnlocked"}`} id="airGenerator" onClick={() => buyGenerator("air")}>
                <h3>Air Generator</h3>
                <p>You have {props.formatValues(props.getValue("air"), true)} Air, giving a {props.formatValues(props.getValue("air").plus(1), true)}x Multiplier to all previous generators</p>
                <h3>{props.formatValues(props.getValue("airGeneratorAmount"))}</h3>
                <h4>Cost: {props.formatValues(getCost("air"))} {props.getValue("airGeneratorAmount") > 0 ? "air" : "energy"}</h4>
            
            </button>

            <button className={`Generator ${props.getChallengeValue("challengeFourCompletions") ? "" : "notUnlocked"}`} id="spaceGenerator" onClick={() => buyGenerator("space")}>
                <h3>Space Generator</h3>
                <p>You have {props.formatValues(props.getValue("space"))} Space, adding +{props.formatValues(props.getValue("space"))} to every generator amount</p>
                <h3>{props.formatValues(props.getValue("spaceGeneratorAmount"))}</h3>
                <h4>Cost: {props.formatValues(getCost("space"))} {props.getValue("spaceGeneratorAmount") > 0 ? "space" : "energy"}</h4>
            
            </button>

            <button className={`Generator ${props.getChallengeValue("challengeSevenCompletions") ? "" : "notUnlocked"}`} id="aetherGenerator" onClick={() => buyGenerator("aether")}>
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
