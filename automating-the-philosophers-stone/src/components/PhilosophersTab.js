import './PhilosophersTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

import VerticalProgress from './verticalProgressBar';

function PhilosophersTab(props) {

  function ResetEnergy(){
    // Resets a bunch of values
    props.setValue("spentEnergy", new Decimal(0));

    // Add to sacrifice total based on element amounts

    let fireEnergyContribution = new Decimal(props.getValue("maxFire").plus(1).log(10)).floor(); 
    let waterEnergyContribution = new Decimal(props.getValue("maxWater").plus(1).log(4)).floor(); 
    let earthEnergyContribution = new Decimal(props.getValue("maxEarth").plus(1).log(2)).floor()

    let elementTotal = fireEnergyContribution.plus(waterEnergyContribution).plus(earthEnergyContribution);
    props.setValue("sacrificedTotal", new Decimal(elementTotal))

    let newEnergyMult = new Decimal(1.01).pow(elementTotal.greaterThan(props.getValue("sacrifiedTotal")) ? elementTotal : props.getValue("sacrificedTotal"));
    props.setValue("energyMult", new Decimal(newEnergyMult));

    props.setValue("fire", new Decimal(0));
    props.setValue("earth", new Decimal(0));
    props.setValue("water", new Decimal(0));

    props.setValue("fireGeneratorAmount", new Decimal(0));
    props.setValue("waterGeneratorAmount", new Decimal(0));
    props.setValue("earthGeneratorAmount", new Decimal(0));

    props.setValue("flameburstChance", new Decimal(0.1));
    props.setValue("flameburstMult", new Decimal(10));
    props.setValue("flameburstLength", new Decimal(0));

    props.setValue("condensorMult", new Decimal(1));
    props.setValue("waterGeneratorMult", new Decimal(1));

    props.setValue("timeSinceLastReset", new Decimal(Date.now()));

    props.resetAllUpgrades();
   
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
        <h3>Reset keeping your energy and giving an energy mult</h3>
      </div>
      <div>

      <div id="philosophyMilestones">
            <h3>Milestones</h3>
            <div className="milestonesRow">

                
                <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(0.5) ? "unlocked" : ""} >
                    <h3>Arid Production</h3>
                    <p>Unlocks the air generator!</p>
                    <h4>Unlocks at 0.5% Filled</h4>

              </button>

              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(2.5) ? "unlocked" : ""} >
                  <h3>Robot Takeover</h3>
                  <p>All basic autobuyer upgrades are permentaly on without costing energy</p>
                  <h4>Unlocks at 2.5% Filled</h4>

              </button>
              
            </div>

            <div className="milestonesRow">
              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(5) ? "unlocked" : ""} >
                  <h3>Hassle Ender</h3>
                  <p>Unlock an autobuyer that automatically buys 2x upgrades</p>
                  <h4>Unlocks at 5% Filled</h4>

              </button>

              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(15) ? "unlocked" : ""} >
                  <h3>Challengers</h3>
                  <p>Unlock challenges, difficult adventures with great rewards included!</p>
                  <h4>Unlocks at 15% Filled</h4>

              </button>

            </div>

            <div className="milestonesRow">
              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(50) ? "unlocked" : ""} >
                  <h3>Spaced out</h3>
                  <p>Unlock the Space Generator</p>
                  <h4>Unlocks at 50% Filled</h4>

              </button>

              <button disabled={true} className={props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(70) ? "unlocked" : ""} >
                <h3>Help from Beyond</h3>
                  <p>Unlocks the Aether Generator</p>
                  <h4>Unlocks at 70% Filled</h4>


              </button>

            </div>

        </div>
      </div>
        
    </div>
  );
}

export default PhilosophersTab;
