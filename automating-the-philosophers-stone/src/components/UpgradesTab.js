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


  function amountYouCanBuy(money, currentCost){
    return Math.floor(Decimal.log(new Decimal(1).plus(money.times(5 - 1).dividedBy(currentCost)), 5))
  }  
  
  function buyMax(upgrade){
    let [cost, element] = props.getUpgradeCost(upgrade);

    let currency = {"fireRepeatable": props.getValue("fire"), "waterRepeatable": props.getValue("water"), "earthRepeatable": props.getValue("earth")}[upgrade];
    let amount = amountYouCanBuy(currency, cost);
    let costForAmount = cost.times(new Decimal(1).minus(new Decimal(5).pow(amount))).dividedBy(new Decimal(1).minus(5));
    

    props.addValue(element, costForAmount.times(-1));
    props.setUpgrade(upgrade, props.getUpgradeCount(upgrade) + amount);
  }

  function upgradeIsBuyable(upgrade){
    let [cost, element] = props.getUpgradeCost(upgrade);
    element = element == "energy" ? "energyLeft" : element // Look for energy left instead of energy when purchasing

    if (props.getValue(element).greaterThanOrEqualTo(cost)) return true;

    return false;
  }

  return (
    
    <div className="UpgradesContainer">
        <div id="fireUpgrades">
            <h4>You have {props.formatValues(props.getValue("fire"))} Fire</h4>

            <div className="fireUpgradesRow">
              <button disabled={props.getUpgradeCount("fireUpgradeR1C1") == 1} className={`Upgrade ${upgradeIsBuyable("fireUpgradeR1C1") && props.getUpgradeCount("fireUpgradeR1C1") != 1 ? "buyable" : ""}`} onClick={() => props.buyUpgrade("fireUpgradeR1C1")} >
                  <h3>Explosiveness</h3>
                  <p>Increase output of fire generators by 250%</p>
                  <h5> &nbsp;</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR1C1")[0])} {props.getUpgradeCost("fireUpgradeR1C1")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR1C2") == 1} className={`Upgrade ${upgradeIsBuyable("fireUpgradeR1C2") && props.getUpgradeCount("fireUpgradeR1C2") != 1 ? "buyable" : ""}`} onClick={() => props.buyUpgrade("fireUpgradeR1C2")} >
                  <h3>Ignition Burst</h3>
                  <p>Multiplier that falls based on time in current reset</p>
                  <h5>Current: {props.formatValues(new Decimal(1).plus(new Decimal(50000).dividedBy(props.getValue("timeSinceLastRebirth").dividedBy(new Decimal(1000)))))}x</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR1C2")[0])} {props.getUpgradeCost("fireUpgradeR1C2")[1]}</h4>
                  
              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1")) || props.getChallengeValue("activeChallenge") } className={`Upgrade ${upgradeIsBuyable("fireUpgradeR1C3") && !(props.getUpgradeCount("fireUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1")) || props.getChallengeValue("activeChallenge")) ? "buyable" : ""}`} onClick={() => props.buyUpgrade("fireUpgradeR1C3")} >
                  <h3>Frequent Flamer</h3>
                  <p>Autobuyer buys a fire generator every tick</p>
                  <h5> &nbsp;</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR1C3")[0])} {props.getUpgradeCost("fireUpgradeR1C3")[1]}</h4>
                  
              </button>
            </div>

            <div className={`fireUpgradesRow ${props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR1C1")) || props.getChallengeValue("activeChallenge") ? "" : "notUnlocked"}`}>
              <button disabled={props.getUpgradeCount("fireUpgradeR2C1") == 18} className={`Upgrade ${upgradeIsBuyable("fireUpgradeR2C1") && props.getUpgradeCount("fireUpgradeR2C1") != 18 ? "buyable" : ""}`} onClick={() => props.buyUpgrade("fireUpgradeR2C1")} >
                    <h3>Flameburst</h3>
                    <p>% Chance to increase production every tick</p>
                    <h5>Current: {props.getUpgradeCount("fireUpgradeR2C1") * 5 + (props.getUpgradeCount("fireUpgradeR2C1") > 0 ? 10 : 0)} %</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR2C1")[0])} {props.getUpgradeCost("fireUpgradeR2C1")[1]}</h4>

              </button>

              <button  className={`Upgrade ${upgradeIsBuyable("fireUpgradeR2C2")  ? "buyable" : ""}`} onClick={() => props.buyUpgrade("fireUpgradeR2C2")} >
                    <h3>Flameburst II</h3>
                    <p>Increase Flamebursts Production Multiplier</p>
                    <h5>Current: {props.formatValues(new Decimal(1.5).pow(props.getUpgradeCount("fireUpgradeR2C2")).times(10))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR2C2")[0].ceil())} {props.getUpgradeCost("fireUpgradeR2C2")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("fireUpgradeR2C3") == 5} className={`Upgrade ${upgradeIsBuyable("fireUpgradeR2C3") && props.getUpgradeCount("fireUpgradeR2C3") != 5  ? "buyable" : ""}`} onClick={() => props.buyUpgrade("fireUpgradeR2C3")} >
                    <h3>Flameburst III</h3>
                    <p>Flameburst happens multiple time per tick and can stack</p>
                    <h5>Current: {props.getUpgradeCount("fireUpgradeR2C3") + 1} {(props.getUpgradeCount("fireUpgradeR2C3") + 1) > 1 ? "times" : "time"}</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("fireUpgradeR2C3")[0])} {props.getUpgradeCost("fireUpgradeR2C3")[1]}</h4>

              </button>

            </div>

            <div className="fireUpgradesRow">
              <div className="autobuyerHolder">
                <button className={`Upgrade ${upgradeIsBuyable("fireRepeatable")  ? "buyable" : ""}`} onClick={() => props.buyUpgrade("fireRepeatable")} >
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
              <button disabled={props.getUpgradeCount("waterUpgradeR1C1") == 1} className={`Upgrade ${upgradeIsBuyable("waterUpgradeR1C1") && props.getUpgradeCount("waterUpgradeR1C1") != 1 ? "buyable" : ""}`} onClick={() => props.buyUpgrade("waterUpgradeR1C1")} >
                  <h3>Surge</h3>
                  <p>Gain water production multiplier equal to Water Generator Count + 1</p>
                  <h5>Current {props.formatValues((props.getValue("waterGeneratorAmount").times((new Decimal(5).pow(props.getUpgradeCount("waterUpgradeR2C3"))))).pow(props.getChallengeValue("challengeOneCompletions") == 1 ? (new Decimal(props.getValue("challengeOneHighest").plus(1).log(100)).dividedBy(100).plus(1.2)) : 1).plus(1))}x</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR1C1")[0])} {props.getUpgradeCost("waterUpgradeR1C1")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("waterUpgradeR1C2") == 1} className={`Upgrade ${upgradeIsBuyable("waterUpgradeR1C2") && props.getUpgradeCount("waterUpgradeR1C2") != 1 ? "buyable" : ""}`} onClick={() => props.buyUpgrade("waterUpgradeR1C2")} >
                  <h3>Condensor</h3>
                  <p>5% of water production is turned into a scaling multiplier on production</p>
                  <h5>Current: {props.formatValues(new Decimal(1.1).pow(props.getValue("condensorMult").log(10)))}x</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR1C2")[0])} {props.getUpgradeCost("waterUpgradeR1C2")[1]}</h4>
                  
              </button>

              <button disabled={props.getUpgradeCount("waterUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1")) || props.getChallengeValue("activeChallenge")} className={`Upgrade ${upgradeIsBuyable("waterUpgradeR1C3") && !(props.getChallengeValue("activeChallenge") != "" || props.getUpgradeCount("waterUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1"))) ? "buyable" : ""}`} onClick={() => props.buyUpgrade("waterUpgradeR1C3")} >
                  <h3>Fluidic Flow</h3>
                  <p>Autobuyer buys a water generator every tick</p>
                  <h5> &nbsp;</h5>
  
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR1C3")[0])} {props.getUpgradeCost("waterUpgradeR1C3")[1]}</h4>
                  
              </button>
            </div>

            <div className={`waterUpgradesRow ${props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR1C1")) || props.getChallengeValue("activeChallenge") ? "" : "notUnlocked"}`}>
              <button disabled={props.getUpgradeCount("waterUpgradeR2C1") == 1} className={`Upgrade ${upgradeIsBuyable("waterUpgradeR2C1") && props.getUpgradeCount("waterUpgradeR2C1") != 1 ? "buyable" : ""}`} onClick={() => props.buyUpgrade("waterUpgradeR2C1")} >
                    <h3>Vapor Vortex</h3>
                    <p>Gain multiplier based on fire count</p>
                    <h5>Current: {props.formatValues(new Decimal(1.25).pow(props.getValue("fire").plus(1).log(10)))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR2C1")[0])} {props.getUpgradeCost("waterUpgradeR2C1")[1]}</h4>

              </button>

              <button  className={`Upgrade ${upgradeIsBuyable("waterUpgradeR2C2") ? "buyable" : ""}`} onClick={() => props.buyUpgrade("waterUpgradeR2C2")} >
                    <h3>Hosed Down</h3>
                    <p>Multiplier based on amount of water upgrades purchased</p>
                    <h5>Current: {props.formatValues(new Decimal(1.01).pow(props.getUpgradeCount("waterUpgradeR2C2")).pow((props.getUpgradeCount("waterUpgradeR1C1") + props.getUpgradeCount("waterUpgradeR1C2") + props.getUpgradeCount("waterUpgradeR1C3")
                               + props.getUpgradeCount("waterUpgradeR2C1") + props.getUpgradeCount("waterUpgradeR2C2") + props.getUpgradeCount("waterUpgradeR2C3")
                                + props.getUpgradeCount("waterRepeatable"))))}x</h5>
                    
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR2C2")[0])} {props.getUpgradeCost("waterUpgradeR2C2")[1]}</h4>

              </button>

              <button className={`Upgrade ${upgradeIsBuyable("waterUpgradeR2C3")  ? "buyable" : ""}`} onClick={() => props.buyUpgrade("waterUpgradeR2C3")} >
                    <h3>Primoridal Flood</h3>
                    <p>Multiply Effective Water Generator count by 5</p>
                    <h5>Current: {props.formatValues(new Decimal(5).pow( props.getUpgradeCount("waterUpgradeR2C3")))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("waterUpgradeR2C3")[0])} {props.getUpgradeCost("waterUpgradeR2C3")[1]}</h4>

              </button>

            </div>

            <div className="waterUpgradesRow">
              <div className="autobuyerHolder">
                <button className={`Upgrade ${upgradeIsBuyable("waterRepeatable")  ? "buyable" : ""}`} onClick={() => props.buyUpgrade("waterRepeatable")} >
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


        <div id="earthUpgrades" className={`${props.getValue("firstReset") == false || props.getValue("energyMult") != 1  ? "" : "notUnlocked"}`}>
            <h4>You have {props.formatValues(props.getValue("earth"))} Earth</h4>

            <div className="earthUpgradesRow">
            <button disabled={props.getUpgradeCount("earthUpgradeR1C1") == 1} className={`Upgrade ${upgradeIsBuyable("earthUpgradeR1C1") && props.getUpgradeCount("earthUpgradeR1C1") != 1 ? "buyable" : ""}`} onClick={() => props.buyUpgrade("earthUpgradeR1C1")} >
                    <h3>Hearth Home</h3>
                    <p>Increase production based on total generator count</p>
                    <h5>Current: {props.formatValues(new Decimal(1).plus(props.getValue("fireGeneratorAmount")).plus(props.getValue("earthGeneratorAmount")).plus((props.getValue("waterGeneratorAmount").times((new Decimal(5).pow(props.getUpgradeCount("waterUpgradeR2C3"))))).pow(props.getChallengeValue("challengeOneCompletions") == 1 ? (new Decimal(props.getValue("challengeOneHighest").plus(1).log(100)).dividedBy(100).plus(1.2)) : 1)))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR1C1")[0])} {props.getUpgradeCost("earthUpgradeR1C1")[1]}</h4>

              </button>

              <button disabled={props.getUpgradeCount("earthUpgradeR1C2") == 1} className={`Upgrade ${upgradeIsBuyable("earthUpgradeR1C2") && props.getUpgradeCount("earthUpgradeR1C2") != 1 ? "buyable" : ""}`} onClick={() => props.buyUpgrade("earthUpgradeR1C2")} >
                  <h3>Nutrient Rich</h3>
                  <p>Divide Cost of Earth Generator by Water Generator Count + 1</p>
                  <h5>Current: /{props.formatValues(new Decimal((props.getValue("waterGeneratorAmount") * (new Decimal(3).pow(props.getUpgradeCount("waterUpgradeR2C3"))) + 1) ** (1 + 0.2*props.getChallengeValue("challengeOneCompletions"))))}</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR1C2")[0])} {props.getUpgradeCost("earthUpgradeR1C2")[1]}</h4>

              </button>
              


              <button disabled={props.getUpgradeCount("earthUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1")) || props.getChallengeValue("activeChallenge")} className={`Upgrade ${upgradeIsBuyable("earthUpgradeR1C3") && !(props.getUpgradeCount("earthUpgradeR1C3") == 1 || props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR2C1")) || props.getChallengeValue("activeChallenge")) ? "buyable" : ""}`} onClick={() => props.buyUpgrade("earthUpgradeR1C3")} >
                  <h3>Geomagnetic</h3>
                  <p>Autobuyer buys an earth generator every tick</p>
                  <h5> &nbsp;</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR1C3")[0])} {props.getUpgradeCost("earthUpgradeR1C3")[1]}</h4>
                  
              </button>
            </div>

            <div className={`earthUpgradesRow ${props.getValue("sacrificedTotal").dividedBy(100).greaterThanOrEqualTo(props.getValue("philosopherR1C1")) || props.getChallengeValue("activeChallenge") ? "" : "notUnlocked"}`}>
            <button disabled={props.getUpgradeCount("earthUpgradeR2C1") == 1} className={`Upgrade ${upgradeIsBuyable("earthUpgradeR2C1") && props.getUpgradeCount("earthUpgradeR2C1") != 1 ? "buyable" : ""}`} onClick={() => props.buyUpgrade("earthUpgradeR2C1")} >
                  <h3>Stable Growth</h3>
                  <p>Gain a multiplier that grows with gametime</p>
                  <h5>Current: {props.formatValues(new Decimal(1.1).pow(props.getValue("timeSinceStartOfGame").log(10)))}x</h5>
                  <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR2C1")[0])} {props.getUpgradeCost("earthUpgradeR2C1")[1]}</h4>
                  
              </button>

              <button className={`Upgrade ${upgradeIsBuyable("earthUpgradeR2C2") ? "buyable" : ""}`} onClick={() => props.buyUpgrade("earthUpgradeR2C2") } >
                    <h3>Dirt^2</h3>
                    <p>Raise earth production to an exponent</p>
                    <h5>Currnet: ^{props.formatValues(new Decimal(1.05).pow(props.getUpgradeCount("earthUpgradeR2C2")))}</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR2C2")[0])} {props.getUpgradeCost("earthUpgradeR2C2")[1]}</h4>

              </button>

              <button className={`Upgrade ${upgradeIsBuyable("earthUpgradeR2C3") ? "buyable" : ""}`} onClick={() => props.buyUpgrade("earthUpgradeR2C3")} >
                    <h3>Terraform</h3>
                    <p>Multiplier to generator contributing most to energy</p>
                    <h5>Current: {props.formatValues(new Decimal(10000).pow(props.getUpgradeCount("earthUpgradeR2C3")))}x</h5>
                    <h4>Cost: {props.formatValues(props.getUpgradeCost("earthUpgradeR2C3")[0])} {props.getUpgradeCost("earthUpgradeR2C3")[1]}</h4>

              </button>

            </div>

            <div className="earthUpgradesRow">
              <div className="autobuyerHolder">
                <button className={`Upgrade ${upgradeIsBuyable("earthRepeatable") ? "buyable" : ""}`} onClick={() => props.buyUpgrade("earthRepeatable")} >
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
