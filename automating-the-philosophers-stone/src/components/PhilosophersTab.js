import './PhilosophersTab.css';
import React, {useState} from "react";

function PhilosophersTab(props) {

  function ResetEnergy(){
    // Resets a bunch of values
    props.setValue("spentEnergy", 0);

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

    props.resetAllUpgrades();
   
  }

  return (
    
    <div className="PhilosophersContainer">
        <h2>Philosophers</h2>
        <button onClick={ResetEnergy}>Reset!</button>
    </div>
  );
}

export default PhilosophersTab;
