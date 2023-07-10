import './PhilosophersTab.css';
import React, {useState} from "react";

import VerticalProgress from './verticalProgressBar';

function PhilosophersTab(props) {

  function ResetEnergy(){
    // Resets a bunch of values
    props.setValue("spentEnergy", 0);

    // Add to sacrifice total based on element amounts
    let elementTotal = (Math.log10(props.getValue("fire")+1) + Math.log(props.getValue("earth")+1) / Math.log(2) + Math.log(props.getValue("water")+1) / Math.log(4)) / 100;
    props.addValue("sacrificedTotal", elementTotal)

    let newEnergyMult = 1.01 ** ((props.getValue("sacrificedTotal") + elementTotal) * 100);
    console.log(props.getValue("sacrificedTotal"), newEnergyMult);

    props.setValue("energyMult", newEnergyMult);

    props.setValue("fire", 0);
    props.setValue("earth", 0);
    props.setValue("water", 0);

    props.setValue("fireGeneratorAmount", 0);
    props.setValue("waterGeneratorAmount", 0);
    props.setValue("earthGeneratorAmount", 0);

    props.setValue("flameburstChance", 0.1);
    props.setValue("flameburstMult", 10);
    props.setValue("flameburstLength", 0);

    props.setValue("condensorMult", 1);
    props.setValue("waterGeneratorMult", 1);

    props.setValue("timeSinceLastReset", Date.now());

    props.resetAllUpgrades();
   
  }

  return (
    
    <div className="PhilosophersContainer">
      <div id="progressBarContainer">
        <h3>{props.formatValues(props.getValue("energyMult"))}x Energy</h3>
        <VerticalProgress  progress={props.formatValues(props.getValue("sacrificedTotal"))}/>
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
              <button className='Upgrade' >
                    <h3>Arid Production</h3>
                    <p>Unlocks the air generator!</p>
                    <h4>Unlocks at 0.5% Filled</h4>

              </button>

              <button className='Upgrade' >
                  <h3>Robot Takeover</h3>
                  <p>All basic autobuyer upgrades are permentaly on without costing energy</p>
                  <h4>Unlocks at 2.5% Filled</h4>

              </button>
              
            </div>

            <div className="milestonesRow">
              <button className='Upgrade' >
                  <h3>Hassle Ender</h3>
                  <p>Unlock an autobuyer that automatically buys 2x upgrades</p>
                  <h4>Unlocks at 5% Filled</h4>

              </button>

              <button className='Upgrade' >
                  <h3>Challengers</h3>
                  <p>Unlock challenges, difficult adventures with great rewards included!</p>
                  <h4>Unlocks at 15% Filled</h4>

              </button>

            </div>

            <div className="milestonesRow">
              <button className='Upgrade' >
                  <h3>Spaced out</h3>
                  <p>Unlock the Space Generator</p>
                  <h4>Unlocks at 50% Filled</h4>

              </button>

              <button className='Upgrade' >
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
