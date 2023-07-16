import './OptionsTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

function OptionsTab(props) {

  let [save, setSave] = useState('');
  let [showImport, setShowImport] = useState(false);


  function copyToClipboard(save){
    navigator.clipboard.writeText(save);
  }

  function handleSaveChange(event){
    setSave(event.target.value);
  }

  


  return (
    
    <div id="OptionsContainer">
        <div id="importPrompt" className={showImport ? "" : "displayNone"}>
          <button id="cancelImportButton" onClick={() => setShowImport(false)}>X</button>

          
          <h3>Import your save:</h3> 
          <textarea onChange={handleSaveChange} /> 
          <button onClick={() => setShowImport(false) || props.importGame(save)} id="importSubmitButton">Submit</button>
          
        </div>

        <h2>Options</h2>
        <h3>Exports are saved to your clipboard!</h3>

        <div id="OptionsButtonContainer">
          <button onClick={() => copyToClipboard(props.exportGame())}>Export Game</button>
          <button onClick={() => setShowImport(true)}>Import Game</button>

        </div>
    </div>
  );
}

export default OptionsTab;
