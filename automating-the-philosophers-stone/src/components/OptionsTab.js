import './OptionsTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

function OptionsTab(props) {

  let [save, setSave] = useState('');
  let [showImport, setShowImport] = useState(false);

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
    navigator.clipboard.writeText(exportSave);
  }

  function handleSaveChange(event){
    setSave(event.target.value);
  }

  function importGame(){
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


  return (
    
    <div id="OptionsContainer">
        <div id="importPrompt" className={showImport ? "" : "displayNone"}>
          <button id="cancelImportButton" onClick={() => setShowImport(false)}>X</button>

          
          <h3>Import your save:</h3> 
          <textarea onChange={handleSaveChange} /> 
          <button onClick={() => setShowImport(false) || importGame()} id="importSubmitButton">Submit</button>
          
        </div>

        <h2>Options</h2>
        <h3>Exports are saved to your clipboard!</h3>

        <div id="OptionsButtonContainer">
          <button onClick={exportGame}>Export Game</button>
          <button onClick={() => setShowImport(true)}>Import Game</button>

        </div>
    </div>
  );
}

export default OptionsTab;
