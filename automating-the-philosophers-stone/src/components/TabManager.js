
import './TabManager.css';
import React, {useState} from "react";

import GeneratorTab from './GeneratorTab';
import ChallengesTab from './ChallengesTab';
import PhilosophersTab from './PhilosophersTab';
import UpgradesTab from './UpgradesTab';
import OptionsTab from './OptionsTab';
import FormulaTab from './FormulaTab';

function TabManager(props) {
    let [tab, setTab] = useState("Generators")

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
        <div className={tab!="Generators" ? "hiddenTab" : undefined}><GeneratorTab getValue={props.getValue} setValue={props.setValue} addValue={props.addValue} formatValues={props.formatValues}/></div>
        <div className={tab!="Upgrades" ? "hiddenTab" : undefined}><UpgradesTab /></div>
        <div className={tab!="Philosophers" ? "hiddenTab" : undefined}><PhilosophersTab /></div>
        <div className={tab!="Challenges" ? "hiddenTab" : undefined}> <ChallengesTab /></div>
        <div className={tab!="Options" ? "hiddenTab" : undefined}><OptionsTab /></div>
        <div className={tab!="Formulas" ? "hiddenTab" : undefined}><FormulaTab getValue={props.getValue} foramtValues={props.formatValues}/></div>
      </div>
    </div>
  );
}

export default TabManager;
