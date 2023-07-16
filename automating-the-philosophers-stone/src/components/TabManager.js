
import './TabManager.css';
import React, {useState} from "react";

import GeneratorTab from './GeneratorTab';
import ChallengesTab from './ChallengesTab';
import PhilosophersTab from './PhilosophersTab';
import UpgradesTab from './UpgradesTab';
import OptionsTab from './OptionsTab';
import FormulaTab from './FormulaTab';

import Decimal from "break_infinity.js";

function TabManager(props) {
    let [tab, setTab] = useState("Generators")

    function importGame(save){
      try{
        JSON.parse(atob(save))
      } catch(e){
        return false;
      }
  
      let importSave = JSON.parse(atob(save));
      for (const value in importSave){
        if (!(value.indexOf("upgradeExport") != -1))
          props.setValue(value, new Decimal(importSave[value]));
        else
          props.setUpgrade(value.split("upgradeExport_")[1], importSave[value]);
      }
    }

    // Upgrade Names 
    let upgrades = ["fireRepeatable", "fireUpgradeR1C1", "fireUpgradeR1C2",
    "fireUpgradeR1C3", "fireUpgradeR2C1", "fireUpgradeR2C2",
    "fireUpgradeR2C3",
    "waterRepeatable", "waterUpgradeR1C1", "waterUpgradeR1C2",
    "waterUpgradeR1C3", "waterUpgradeR2C1", "waterUpgradeR2C2",
    "waterUpgradeR2C3", 
    "earthRepeatable", "earthUpgradeR1C1", "earthUpgradeR1C2",
    "earthUpgradeR1C3", "earthUpgradeR2C1", "earthUpgradeR2C2",
    "earthUpgradeR2C3"]

    function exportGame(){
      let exportValues = {}
      exportValues["energy"] = props.getValue("energy");
      exportValues["spentEnergy"] = props.getValue("spentEnergy");

      exportValues["sacrificedTotal"] = props.getValue("sacrificedTotal");
      exportValues["energyMult"] = props.getValue("energyMult");

      exportValues["fire"] = props.getValue("fire");
      exportValues["water"] = props.getValue("water");
      exportValues["earth"] = props.getValue("earth");
      exportValues["air"] = props.getValue("air");
      exportValues["space"] = props.getValue("space");
      exportValues["aether"] = props.getValue("aether");

      exportValues["fireGeneratorAmount"] = props.getValue("fireGeneratorAmount");
      exportValues["waterGeneratorAmount"] = props.getValue("waterGeneratorAmount");
      exportValues["earthGeneratorAmount"] = props.getValue("earthGeneratorAmount");
      exportValues["airGeneratorAmount"] = props.getValue("airGeneratorAmount");
      exportValues["spaceGeneratorAmount"] = props.getValue("spaceGeneratorAmount");
      exportValues["aetherGeneratorAmount"] = props.getValue("aetherGeneratorAmount");

      exportValues["flameburstMult"] = props.getValue("flameburstMult");
      exportValues["flameburstChance"] = props.getValue("flameburstChance");
      exportValues["flameburstLength"] = props.getValue("flameburstLength");

      exportValues["waterProductionMult"] = props.getValue("waterProductionMult");

      exportValues["waterGeneratorMult"] = props.getValue("waterGeneratorMult");

      exportValues["lastResetTime"] = props.getValue("lastResetTime");
      exportValues["timeSinceLastReset"] = props.getValue("timeSinceLastReset");

      exportValues["startOfGame"] = props.getValue("startOfGame")
      exportValues["timeSinceStartOfGame"] = props.getValue("timeSinceStartOfGame")

      exportValues["maxWater"] = props.getValue("maxWater")
      exportValues["maxFire"] = props.getValue("maxFire")
      exportValues["maxEarth"] = props.getValue("maxEarth")
      exportValues["maxAir"] = props.getValue("maxAir")

      for (const upgrade in upgrades){
      exportValues["upgradeExport_" + upgrades[upgrade]] = props.getUpgradeCount(upgrades[upgrade])
      }

      let exportSave = btoa(JSON.stringify(exportValues));
      return exportSave;
    }
  

  return (
    
    <div className="TabContainer">
      <div id="tabList">

        <button onClick={() => setTab('Generators')}>Generators</button>
        <button onClick={() => setTab('Upgrades')}>Upgrades</button>
        <button onClick={() => setTab('Formulas')}>Formula</button>
        <button onClick={() => setTab('Philosophers')}>Philosophers</button>
        <button onClick={() => setTab('Challenges')}>Challenges</button>
        <button onClick={() => setTab('Options')}>Options</button>

      </div>

      <div id="tabs">
        <div className={tab!=="Generators" ? "hiddenTab" : undefined}><GeneratorTab getChallengeValue={props.getChallengeValue}  getChallengeValues={props.getChallengeValue} buyUpgrade={props.buyUpgrade} getUpgradeCost={props.getUpgradeCost}
                getValue={props.getValue} setValue={props.setValue} addValue={props.addValue} formatValues={props.formatValues} getUpgradeCount={props.getUpgradeCount}/></div>
        <div className={tab!=="Upgrades" ? "hiddenTab" : undefined}><UpgradesTab getChallengeValue={props.getChallengeValue} setValue={props.setValue} getValue={props.getValue} addValue={props.addValue} formatValues={props.formatValues} getUpgradeCount={props.getUpgradeCount} buyUpgrade={props.buyUpgrade} getUpgradeCost={props.getUpgradeCost}/></div>
        <div className={tab!=="Philosophers" ? "hiddenTab" : undefined}><PhilosophersTab getChallengeValue={props.getChallengeValue} resetAllUpgrades={props.resetAllUpgrades} addValue={props.addValue} setValue={props.setValue} formatValues={props.formatValues} getValue={props.getValue} getUpgradeCount={props.getUpgradeCount} getUpgradeCost={props.getUpgradeCost}/></div>
        <div className={tab!=="Challenges" ? "hiddenTab" : undefined}> <ChallengesTab getValue={props.getValue} setValue={props.setValue} exportGame={exportGame} importGame={importGame} getChallengeValue={props.getChallengeValue} setChallengeValue={props.setChallengeValue}/></div>
        <div className={tab!=="Options" ? "hiddenTab" : undefined}><OptionsTab exportGame={exportGame} importGame={importGame} setUpgrade={props.setUpgrade} getUpgradeCount={props.getUpgradeCount} getValue={props.getValue} setValue={props.setValue} /></div>
        <div className={tab!=="Formulas" ? "hiddenTab" : undefined}><FormulaTab getValue={props.getValue} formatValues={props.formatValues}/></div>
      </div>
    </div>
  );
}

export default TabManager;
