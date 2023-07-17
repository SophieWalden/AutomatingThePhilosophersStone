import './UpgradesTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

function UpgradesTab(props) {

  function canBuyUpgrade(upgrade){
    let [cost, element] = props.getUpgradeCost(upgrade);

    if (props.getValue(element).greaterThanOrEqualTo(cost)){
      return true;
    }

    return false;
  }

  function buyMax(upgrade){
    props.buyUpgrade(upgrade, 5000000);
  }

  return (
    
    <div className="UpgradesContainer">
        <div id="fireUpgrades">
            <h4>You have {props.formatValues(props.getValue("fire"))} Fire</h4>

            <div className="fireUpgradesRow">
              <button disabled={props.getUpgradeCount("fireUpgradeR1C1") == 1} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR1C1")} >
                  <h3>Explosiveness</h3>
                  <p>Increase output of fire generators by 250%</p>
                  <h5> &nbsp;</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR1C1")[0])} {props.getUpgradeCost("fireUpgradeR1C1")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR1C2") == 1} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR1C2")} >
                  <h3>Ignition Burst</h3>
                  <p>Multiplier that falls based on time in current reset</p>
                  <h5>Current: {props.formatValues(new Decimal(1).plus(new Decimal(50000).dividedBy(props.getValue("timeSinceLastRebirth").dividedBy(new Decimal(1000)))))}x</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR1C2")[0])} {props.getUpgradeCost("fireUpgradeR1C2")[1]}</h4>
                  
              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(2.5) } className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR1C3")} >
                  <h3>Frequent Flamer</h3>
                  <p>Autobuyer buys a fire generator every tick</p>
                  <h5> &nbsp;</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR1C3")[0])} {props.getUpgradeCost("fireUpgradeR1C3")[1]}</h4>
                  
              </button>
            </div>

            <div className={`fireUpgradesRow ${props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(0.35) ? "" : "notUnlocked"}`}>
              <button disabled={props.getUpgradeCount("fireUpgradeR2C1") == 18} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR2C1")} >
                    <h3>Flameburst</h3>
                    <p>% Chance to increase production every tick</p>
                    <h5>Current: {props.getUpgradeCount("fireUpgradeR2C1") * 5 + (props.getUpgradeCount("fireUpgradeR2C1") > 0 ? 10 : 0)} %</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR2C1")[0])} {props.getUpgradeCost("fireUpgradeR2C1")[1]}</h4>

              </button>

              <button  className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR2C2")} >
                    <h3>Flameburst II</h3>
                    <p>Increase Flamebursts Production Multiplier</p>
                    <h5>Current: {props.formatValues(new Decimal(1.5).pow(props.getUpgradeCount("fireUpgradeR2C2")).times(10))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR2C2")[0].ceil())} {props.getUpgradeCost("fireUpgradeR2C2")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR2C3") == 5} className='Upgrade' onClick={() => props.buyUpgrade("fireUpgradeR2C3")} >
                    <h3>Flameburst III</h3>
                    <p>Flameburst happens multiple time per tick and can stack</p>
                    <h5>Current: {props.getUpgradeCount("fireUpgradeR2C3") + 1} {(props.getUpgradeCount("fireUpgradeR2C3") + 1) > 1 ? "times" : "time"}</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR2C3")[0])} {props.getUpgradeCost("fireUpgradeR2C3")[1]}</h4>

              </button>

            </div>

            <div className="fireUpgradesRow">
              <div className="autobuyerHolder">
                <button className='Upgrade' onClick={() => props.buyUpgrade("fireRepeatable")} >
                      <h3>Blazing Inferno</h3>
                      <p>Multiply Fire Gain by 2x</p>
                      <h3>{props.formatValues(new Decimal(2).pow(props.getUpgradeCount("fireRepeatable")))}x</h3>
                      <h4>Cost: {props.formatValues(props.getUpgradeCost("fireRepeatable")[0])} {props.getUpgradeCost("fireRepeatable")[1]}</h4>
                  
                  </button>

                  <button className="autobuyer" onClick={() => buyMax("fireRepeatable")}>
                    <h4>Buy Max</h4>
                  </button>
                </div>
            </div>

        </div>


        <div id="waterUpgrades" className={`${props.getValue("energy") >= 3 || props.getValue("firstReset") == false ? "" : "notUnlocked"}`}> 
            <h4>You have {props.formatValues(props.getValue("water"))} Water</h4>

            <div className="waterUpgradesRow">
              <button disabled={props.getUpgradeCount("waterUpgradeR1C1") == 1} className='Upgrade' onClick={() => props.buyUpgrade("waterUpgradeR1C1")} >
                  <h3>Surge</h3>
                  <p>Gain water production multiplier equal to Water Generator Count + 1</p>
                  <h5>Current {props.formatValues(new Decimal((props.getValue("waterGeneratorAmount") * (new Decimal(3).pow(props.getUpgradeCount("waterUpgradeR2C3"))) + 1) ** (1 + 0.2*props.getChallengeValue("challengeOneCompletions"))))}x</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR1C1")[0])} {props.getUpgradeCost("waterUpgradeR1C1")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("waterUpgradeR1C2") == 1} className='Upgrade' onClick={() => props.buyUpgrade("waterUpgradeR1C2")} >
                  <h3>Condensor</h3>
                  <p>5% of water production is turned into a scaling multiplier on production</p>
                  <h5>Current: {props.formatValues(new Decimal(1.1).pow(Math.log(props.getValue("condensorMult"))))}x</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR1C2")[0])} {props.getUpgradeCost("waterUpgradeR1C2")[1]}</h4>
                  
              </button>

              <button disabled={props.getUpgradeCount("waterUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(2.5)} className='Upgrade' onClick={() => props.buyUpgrade("waterUpgradeR1C3")} >
                  <h3>Fluidic Flow</h3>
                  <p>Autobuyer buys a water generator every tick</p>
                  <h5> &nbsp;</h5>
  
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR1C3")[0])} {props.getUpgradeCost("waterUpgradeR1C3")[1]}</h4>
                  
              </button>
            </div>

            <div className={`waterUpgradesRow ${props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(0.35) ? "" : "notUnlocked"}`}>
              <button disabled={props.getUpgradeCount("waterUpgradeR2C1") == 1} className='Upgrade' onClick={() => props.buyUpgrade("waterUpgradeR2C1")} >
                    <h3>Vapor Vortex</h3>
                    <p>Gain multiplier based on fire count</p>
                    <h5>Current: {props.formatValues(new Decimal(1.25).pow(props.getValue("fire").plus(1).log(10)))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR2C1")[0])} {props.getUpgradeCost("waterUpgradeR2C1")[1]}</h4>

              </button>

              <button  className='Upgrade' disabled={props.getUpgradeCount("waterUpgradeR2C2") == 1} onClick={() => props.buyUpgrade("waterUpgradeR2C2")} >
                    <h3>Ignited Hydration</h3>
                    <p>Gain 1% of your water production as fire</p>
                    <h5> &nbsp;</h5>
                    
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR2C2")[0])} {props.getUpgradeCost("waterUpgradeR2C2")[1]}</h4>

              </button>

              <button className='Upgrade' onClick={() => props.buyUpgrade("waterUpgradeR2C3")} >
                    <h3>Primoridal Flood</h3>
                    <p>Multiply Effective Water Generator count by 3</p>
                    <h5>Current: {props.formatValues(new Decimal(3).pow( props.getUpgradeCount("waterUpgradeR2C3")))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR2C3")[0])} {props.getUpgradeCost("waterUpgradeR2C3")[1]}</h4>

              </button>

            </div>

            <div className="waterUpgradesRow">
              <div className="autobuyerHolder">
                <button className='Upgrade' onClick={() => props.buyUpgrade("waterRepeatable")} >
                      <h3>Hydroburst</h3>
                      <p>Multiply water Gain by 2x</p>
                      <h3>{props.formatValues(new Decimal(2).pow(props.getUpgradeCount("waterRepeatable")))}x</h3>
                      <h4>Cost: {props.formatValues(props.getUpgradeCost("waterRepeatable")[0])} {props.getUpgradeCost("waterRepeatable")[1]}</h4>
                  
                  </button>

                  <button className="autobuyer" onClick={() => buyMax("waterRepeatable")}>
                    <h4>Buy Max</h4>
                  </button>
                </div>
            </div>

        </div>


        <div id="earthUpgrades" className={`${props.getValue("firstReset") == false ? "" : "notUnlocked"}`}>
            <h4>You have {props.formatValues(props.getValue("earth"))} Earth</h4>

            <div className="earthUpgradesRow">
            <button disabled={props.getUpgradeCount("earthUpgradeR1C1") == 1} className='Upgrade' onClick={() => props.buyUpgrade("earthUpgradeR1C1")} >
                    <h3>Hearth Home</h3>
                    <p>Increase production based on total generator count</p>
                    <h5>Current: {props.formatValues(new Decimal(1).plus(props.getValue("fireGeneratorAmount")).plus(props.getValue("earthGeneratorAmount")).plus(props.getValue("waterGeneratorAmount").times(new Decimal(3).pow(props.getUpgradeCount("waterUpgradeR2C3")))))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR1C1")[0])} {props.getUpgradeCost("earthUpgradeR1C1")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("earthUpgradeR1C2") == 1} className='Upgrade' onClick={() => props.buyUpgrade("earthUpgradeR1C2")} >
                  <h3>Nutrient Rich</h3>
                  <p>Divide Cost of Earth Generator by Water Generator Count + 1</p>
                  <h5>Current: /{props.getValue("waterGeneratorAmount") * props.getValue("waterGeneratorMult") + 1}</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR1C2")[0])} {props.getUpgradeCost("earthUpgradeR1C2")[1]}</h4>

              </button>
              


              <button disabled={props.getUpgradeCount("earthUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(2.5)} className='Upgrade' onClick={() => props.buyUpgrade("earthUpgradeR1C3")} >
                  <h3>Geomagnetic</h3>
                  <p>Autobuyer buys an earth generator every tick</p>
                  <h5> &nbsp;</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR1C3")[0])} {props.getUpgradeCost("earthUpgradeR1C3")[1]}</h4>
                  
              </button>
            </div>

            <div className={`earthUpgradesRow ${props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(0.35) ? "" : "notUnlocked"}`}>
            <button disabled={props.getUpgradeCount("earthUpgradeR2C1") == 1} className='Upgrade' onClick={() => props.buyUpgrade("earthUpgradeR2C1")} >
                  <h3>Stable Growth</h3>
                  <p>Gain a multiplier that grows with gametime</p>
                  <h5>Current: {props.formatValues(new Decimal(1.1).pow(props.getValue("timeSinceStartOfGame").log(10)))}x</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR2C1")[0])} {props.getUpgradeCost("earthUpgradeR2C1")[1]}</h4>
                  
              </button>

              <button disabled={props.getUpgradeCount("earthUpgradeR2C2") == 1} className='Upgrade' onClick={() => props.buyUpgrade("earthUpgradeR2C2") } >
                    <h3>Dissolvation</h3>
                    <p>Gain 1% of your earth production as water</p>
                    <h5>&nbsp;</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR2C2")[0])} {props.getUpgradeCost("earthUpgradeR2C2")[1]}</h4>

              </button>

              <button className='Upgrade' onClick={() => props.buyUpgrade("earthUpgradeR2C3")} >
                    <h3>Terraform</h3>
                    <p>Multiplier to generator contributing most to energy</p>
                    <h5>Current: {props.formatValues(new Decimal(10).pow(props.getUpgradeCount("earthUpgradeR2C3")))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR2C3")[0])} {props.getUpgradeCost("earthUpgradeR2C3")[1]}</h4>

              </button>

            </div>

            <div className="earthUpgradesRow">
              <div className="autobuyerHolder">
                <button className='Upgrade' onClick={() => props.buyUpgrade("earthRepeatable")} >
                      <h3>Terraquake</h3>
                      <p>Multiply Earth Gain by 2x</p>
                      <h3>{props.formatValues(new Decimal(2).pow(props.getUpgradeCount("earthRepeatable")))}x</h3>
                      <h4>Cost: {props.formatValues(props.getUpgradeCost("earthRepeatable")[0])} {props.getUpgradeCost("earthRepeatable")[1]}</h4>
                  
                  </button>

                  <button className="autobuyer" onClick={() => buyMax("earthRepeatable")}>
                    <h4>Buy Max</h4>
                  </button>
                </div>
            </div>

        </div>

    </div>
  );
}

export default UpgradesTab;
