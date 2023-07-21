import './PhilosophersTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

import VerticalProgress from './verticalProgressBar';

function PhilosophersTab(props) {

  function ResetEnergy(){

    props.setValue("firstReset", false);

    // Resets a bunch of values
    props.setValue("spentEnergy", new Decimal(0));

    // Add to sacrifice total based on element amounts
    let elementTotal = getElementalTotal()
    if (elementTotal.greaterThan(props.getValue("sacrificedTotal"))) props.setValue("sacrificedTotal", new Decimal(elementTotal));
    elementTotal = Decimal.max(elementTotal, props.getValue("sacrificedTotal"))

    let newEnergyMult = getNewEnergyMult(elementTotal);
    if (newEnergyMult.greaterThan(props.getValue("energyMult")))props.setValue("energyMult", newEnergyMult);

    props.setValue("fire", new Decimal(0));
    props.setValue("earth", new Decimal(0));
    props.setValue("water", new Decimal(0));

    if (!(props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR3C1")) || props.getChallengeValue("activeChallenge") != "")){
        props.setValue("air", new Decimal(0));
        props.setValue("airGeneratorAmount", new Decimal(0));
    } 
  

    props.setValue("fireGeneratorAmount", new Decimal(0));
    props.setValue("waterGeneratorAmount", new Decimal(0));
    props.setValue("earthGeneratorAmount", new Decimal(0));

    props.setValue("flameburstChance", new Decimal(0.1));
    props.setValue("flameburstMult", new Decimal(10));
    props.setValue("flameburstLength", new Decimal(1));

    props.setValue("condensorMult", new Decimal(1));
    props.setValue("waterGeneratorMult", new Decimal(1));

    props.setValue("timeSinceLastReset", new Decimal(Date.now()));

    props.resetAllUpgrades();
   
  }

  function getElementalTotal(){
    let fireEnergyContribution = new Decimal(props.getValue("maxFire").plus(1).log(10)).floor(); 
    let waterEnergyContribution = new Decimal(props.getValue("maxWater").plus(1).log(4)).floor(); 
    let earthEnergyContribution = new Decimal(props.getValue("maxEarth").plus(1).log(2)).floor()
    let airEnergyContribution = new Decimal(props.getValue("maxAir").plus(1).log(1.5)).floor()
    let spaceEnergyContribution = new Decimal(props.getValue("maxSpace").plus(1).log(1.25)).floor()
    let aetherEnergyContribution = new Decimal(props.getValue("maxAether").floor())

    let elementTotal = fireEnergyContribution.plus(waterEnergyContribution).plus(earthEnergyContribution).plus(airEnergyContribution).plus(spaceEnergyContribution).plus(aetherEnergyContribution);

    if (props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C2"))){
      let timeSinceLastReset = (Date.now()-props.getValue("lastResetTime").toNumber()) / 1000
      elementTotal = elementTotal.times(new Decimal(timeSinceLastReset).log(10));
    }

    if (props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR3C2")) && props.getChallengeValue("activeChallenge") == ""){
      elementTotal = new Decimal(elementTotal)
      elementTotal = elementTotal.times(0.01);
    }

    return new Decimal(elementTotal);
  }

  function getNewEnergyMult(elementTotal){
    //let newEnergyMult  = new Decimal(1).plus(Decimal.log(elementTotal.plus(1), 10)).pow(1.2); 6/10, could be adjusted
    //let newEnergyMult = new Decimal(5).times(new Decimal(Decimal.log10(elementTotal))).floor(); 2/1 0, way too steep
    //let newEnergyMult = elementTotal.plus(4/3).times(2).pow(1/3).minus(new Decimal(4/3).pow(1/3)); 7/10 gets stuck at air, but pretty good before that
    let newEnergyMult = elementTotal.plus(4/3).pow(1/2).minus(new Decimal(4/3).pow(1/2));
    
    if (props.getChallengeValue("challengeThreeCompletions") == 1){
     newEnergyMult = newEnergyMult.pow(new Decimal(1.01).plus(new Decimal(props.getValue("challengeThreeHighest").plus(1).log(10)).dividedBy(100)))
    }

    if (props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR3C2")) && props.getChallengeValue("activeChallenge") == ""){
      newEnergyMult = newEnergyMult.times(200);
    }

    
    
    if (props.getChallengeValue("activeChallenge") == "challenge7") newEnergyMult = newEnergyMult.pow(0.5);

    return newEnergyMult;

  }

  return (
    
    <div className="PhilosophersContainer">
      <div id="progressBarContainer">
        <h3>{props.formatValues(props.getValue("energyMult"))}x Energy</h3>
        <VerticalProgress  progress={props.getValue("sacrificedTotal").dividedBy(100)}/>
      </div>

      <div>
        <h2>Philosophers Stone</h2>
        <h3>Combine all your matter to get closer to the stone!</h3>
        <button id="philosophyResetButton" onClick={ResetEnergy}>Reset!</button>
        <h3>Reset everything, but keep your energy and get an energy mult</h3>

        <h3>{props.formatValues(props.getValue("energyMult"))}x -&gt; {props.formatValues(Decimal.max(props.getValue("energyMult"), getNewEnergyMult(getElementalTotal())))}x {props.getValue("energyMult").greaterThan(getNewEnergyMult(getElementalTotal())) ? `(Currently: ${props.formatValues(getNewEnergyMult(getElementalTotal()))})` : ""}</h3>
        <h3>{props.formatValues(props.getValue("sacrificedTotal").dividedBy(100))}% -&gt; {props.formatValues(Decimal.max(props.getValue("sacrificedTotal").dividedBy(100), getElementalTotal().dividedBy(100)))}% </h3>
      </div>
      <div>

      <div id="philosophyMilestones">
            <h3>Milestones</h3>
            <div className="milestonesRow">

            <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR1C1")) || props.getChallengeValue("activeChallenge") != ""  ? "unlocked" : ""} >
                  <h3>Upgrade!!</h3>
                  <p>Unlock all row 2 elemental upgrades (9 more)</p>
                  <h4>Unlocks at {props.getValue("philosopherR1C1").toNumber()}% Filled</h4>

              </button>



                <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR1C2")) || props.getChallengeValue("activeChallenge") != ""  ? "unlocked" : ""} >
                    <h3>Arid Production</h3>
                    <p>Unlocks the air generator!</p>
                    <h4>Unlocks at {props.getValue("philosopherR1C2").toNumber()}% Filled</h4>

              </button>
              
            </div>

            <div className="milestonesRow">
            <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1")) || props.getChallengeValue("activeChallenge") != ""  ? "unlocked" : ""} >
                
                <h3>Robot Takeover</h3>
                <p>All basic autobuyer unlocked and 2x upgrades are autobought</p>
                <h4>Unlocks at {props.getValue("philosopherR2C1").toNumber()}% Filled</h4>

            </button>
              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C2")) || props.getChallengeValue("activeChallenge") != ""  ? "unlocked" : ""} >
                  <h3>Generator</h3>
                  <p>Gain a reset multiplier based on time in current reset</p>
                  <h4>Unlocks at {props.getValue("philosopherR2C2").toNumber()}% Filled</h4>

              </button>

              

            </div>

            <div className="milestonesRow">
              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR3C1")) || props.getChallengeValue("activeChallenge") != ""  ? "unlocked" : ""} >
                  <h3>Fanning it out</h3>
                  <p>Air amount no longer resets on resets</p>
                  <h4>Unlocks at {props.getValue("philosopherR3C1").toNumber()}% Filled</h4>

              </button>

              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR3C2")) || props.getChallengeValue("activeChallenge") != ""  ? "unlocked" : ""} >
                  <h3>Challengers</h3>
                  <p>Unlock challenges, difficult adventures with great rewards!</p>
                  <h4>Unlocks at {props.getValue("philosopherR3C2").toNumber()}% Filled</h4>

              </button>

            </div>

        </div>
      </div>
        
    </div>
  );
}

export default PhilosophersTab;
