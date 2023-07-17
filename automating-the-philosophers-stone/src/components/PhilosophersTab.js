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
    let fireEnergyContribution = new Decimal(props.getValue("maxFire").plus(1).log(10)).floor(); 
    let waterEnergyContribution = new Decimal(props.getValue("maxWater").plus(1).log(4)).floor(); 
    let earthEnergyContribution = new Decimal(props.getValue("maxEarth").plus(1).log(2)).floor()
    let airEnergyContribution = new Decimal(props.getValue("maxAir").plus(1).log(1.5)).floor()
    let spaceEnergyContribution = new Decimal(props.getValue("maxSpace").plus(1).log(1.25)).floor()
    let aetherEnergyContribution = new Decimal(props.getValue("maxAether").floor())

    let elementTotal = fireEnergyContribution.plus(waterEnergyContribution).plus(earthEnergyContribution).plus(airEnergyContribution).plus(spaceEnergyContribution).plus(aetherEnergyContribution);
    props.setValue("sacrificedTotal", new Decimal(elementTotal))

    let newEnergyMult = getNewEnergyMult();

    props.setValue("energyMult", new Decimal(newEnergyMult) > props.getValue("energyMult") ? new Decimal(newEnergyMult) : props.getValue("energyMult"));

    props.setValue("fire", new Decimal(0));
    props.setValue("earth", new Decimal(0));
    props.setValue("water", new Decimal(0));

    if (!(props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(12))){
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

  function getNewEnergyMult(){
    let fireEnergyContribution = new Decimal(props.getValue("maxFire").plus(1).log(10)).floor(); 
    let waterEnergyContribution = new Decimal(props.getValue("maxWater").plus(1).log(4)).floor(); 
    let earthEnergyContribution = new Decimal(props.getValue("maxEarth").plus(1).log(2)).floor()
    let airEnergyContribution = new Decimal(props.getValue("maxAir").plus(1).log(1.5)).floor()
    let spaceEnergyContribution = new Decimal(props.getValue("maxSpace").plus(1).log(1.25)).floor()
    let aetherEnergyContribution = new Decimal(props.getValue("maxAether").floor())

    let elementTotal = fireEnergyContribution.plus(waterEnergyContribution).plus(earthEnergyContribution).plus(airEnergyContribution).plus(spaceEnergyContribution).plus(aetherEnergyContribution);

    let newEnergyMult = new Decimal(1.015).pow(elementTotal.greaterThan(props.getValue("sacrifiedTotal")) ? elementTotal : props.getValue("sacrificedTotal"));
    if (props.getChallengeValue("challengeThreeCompletions")){
      newEnergyMult = new Decimal(1.05).pow(elementTotal.greaterThan(props.getValue("sacrifiedTotal")) ? elementTotal : props.getValue("sacrificedTotal"));
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

        <h3>{props.formatValues(props.getValue("energyMult"))}x -&gt; {props.formatValues(getNewEnergyMult())}x</h3>
      </div>
      <div>

      <div id="philosophyMilestones">
            <h3>Milestones</h3>
            <div className="milestonesRow">

            <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(0.35) ? "unlocked" : ""} >
                  <h3>Upgrade!!</h3>
                  <p>Unlock all row 2 elemental upgrades (9 more)</p>
                  <h4>Unlocks at 0.35% Filled</h4>

              </button>



                <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(2.5) ? "unlocked" : ""} >
                    <h3>Arid Production</h3>
                    <p>Unlocks the air generator!</p>
                    <h4>Unlocks at 2.5% Filled</h4>

              </button>
              
            </div>

            <div className="milestonesRow">
            <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(5) ? "unlocked" : ""} >
                
                <h3>Robot Takeover</h3>
                <p>All basic autobuyer upgrades are permentaly on without costing energy</p>
                <h4>Unlocks at 5% Filled</h4>

            </button>
              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(7) ? "unlocked" : ""} >
                  <h3>Hassle Ender</h3>
                  <p>Unlock an autobuyer that automatically buys 2x upgrades</p>
                  <h4>Unlocks at 7% Filled</h4>

              </button>

              

            </div>

            <div className="milestonesRow">
              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(12) ? "unlocked" : ""} >
                  <h3>Fanning it out</h3>
                  <p>Air amount no longer resets on resets</p>
                  <h4>Unlocks at 12% Filled</h4>

              </button>

              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(15) ? "unlocked" : ""} >
                  <h3>Challengers</h3>
                  <p>Unlock challenges, difficult adventures with great rewards!</p>
                  <h4>Unlocks at 15% Filled</h4>

              </button>

            </div>

        </div>
      </div>
        
    </div>
  );
}

export default PhilosophersTab;
