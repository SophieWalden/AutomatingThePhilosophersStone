import './UpgradesTab.css';
import React, {useState} from "react";

function UpgradesTab(props) {


  return (
    
    <div className="UpgradesContainer">
        <div id="fireUpgrades">
            <h4>You have {props.formatValues(props.getValue("fire"))} Fire</h4>

            <div className="fireUpgradesRow">
              <button disabled={props.getUpgradeCount("fireUpgradeR1C1") == 1} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR1C1")} >
                  <h3>Explosiveness</h3>
                  <p>Divide Cost of Fire Generator by its Count + 1</p>
                  <h5>Current: /{props.fireAmount + 1}</h5>
                  <h4>Cost: {props.getUpgradeCost("fireUpgradeR1C1")[0]} {props.getUpgradeCost("fireUpgradeR1C1")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR1C2") == 1} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR1C2")} >
                  <h3>Ignition Burst</h3>
                  <p>Multiplier that falls based on time in current reset</p>
                  <h5>Current: *{props.formatValues(1 + (100000 / props.getValue("timeSinceLastRebirth")))}</h5>
                  <h4>Cost: {props.getUpgradeCost("fireUpgradeR1C2")[0]} {props.getUpgradeCost("fireUpgradeR1C2")[1]}</h4>
                  
              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR1C3") == 1} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR1C3")} >
                  <h3>Frequent Flamer</h3>
                  <p>Autobuyer buys a generator every tick</p>
                  <h4>Cost: {props.getUpgradeCost("fireUpgradeR1C3")[0]} {props.getUpgradeCost("fireUpgradeR1C3")[1]}</h4>
                  
              </button>
            </div>

            <div className="fireUpgradesRow">
              <button disabled={props.getUpgradeCount("fireUpgradeR2C1") == 1} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR2C1")} >
                    <h3>Flameburst</h3>
                    <p>% Chance to increase production every tick</p>
                    <h4>Cost: {props.getUpgradeCost("fireUpgradeR2C1")[0]} {props.getUpgradeCost("fireUpgradeR2C1")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR2C2") == 1} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR2C2")} >
                    <h3>Flameburst II</h3>
                    <p>Increase Flamebursts Production Multiplier</p>
                    <h4>Cost: {props.getUpgradeCost("fireUpgradeR2C2")[0]} {props.getUpgradeCost("fireUpgradeR2C2")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR2C3") == 1} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR2C3")} >
                    <h3>Flameburst III</h3>
                    <p>Flameburst lasts longer and can stack</p>
                    <h4>Cost: {props.getUpgradeCost("fireUpgradeR2C3")[0]} {props.getUpgradeCost("fireUpgradeR2C3")[1]}</h4>

              </button>

            </div>

            <div className="fireUpgradesRow">
            <button className='Upgrade' onClick={() => props.buyUpgrade("fireRepeatable")} >
                  <h3>Blazing Inferno</h3>
                  <p>Multiply Fire Gain by 2x</p>
                  <h3>{props.getUpgradeCount("fireRepeatable")}</h3>
                  <h4>Cost: {props.getUpgradeCost("fireRepeatable")[0]} {props.getUpgradeCost("fireRepeatable")[1]}</h4>
              
              </button>
            </div>

        </div>

    </div>
  );
}

export default UpgradesTab;
