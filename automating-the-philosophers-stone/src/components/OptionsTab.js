import './OptionsTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

// Function to download data to a file
function download(data, filename, type) {
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
      var a = document.createElement("a"),
              url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
  }
}

function OptionsTab(props) {

  let [save, setSave] = useState('');
  let [showImport, setShowImport] = useState(false);
  let [showExport, setShowExport] = useState(false);


  function copyToClipboard(save){
    setSave(save);
    navigator.clipboard.writeText(save);
  }

  function copyToFile(save){
    download(save, "AutomatingThePhilosophersStoneSave.txt", "txt")
  }

  function handleSaveChange(event){
    setSave(event.target.value);
  }

  function autosave(){
    let save = props.exportGame();
    localStorage.setItem("automatingThePhilosophersStoneSave", save);

  }

  function loadSave(){
    props.importGame(localStorage.getItem("automatingThePhilosophersStoneSave"))
  }


  React.useEffect(() => {
    loadSave();
  }, [])

  function resetGame(){
    let blankSave = "eyJlbmVyZ3kiOiIxIiwic3BlbnRFbmVyZ3kiOiIwIiwic2FjcmlmaWNlZFRvdGFsIjoiMCIsImVuZXJneU11bHQiOiIxIiwiZmlyZSI6IjAiLCJ3YXRlciI6IjAiLCJlYXJ0aCI6IjAiLCJhaXIiOiIwIiwic3BhY2UiOiIwIiwiYWV0aGVyIjoiMCIsImZpcmVHZW5lcmF0b3JBbW91bnQiOiIwIiwid2F0ZXJHZW5lcmF0b3JBbW91bnQiOiIwIiwiZWFydGhHZW5lcmF0b3JBbW91bnQiOiIwIiwiYWlyR2VuZXJhdG9yQW1vdW50IjoiMCIsInNwYWNlR2VuZXJhdG9yQW1vdW50IjoiMCIsImFldGhlckdlbmVyYXRvckFtb3VudCI6IjAiLCJmbGFtZWJ1cnN0TXVsdCI6IjEwIiwiZmxhbWVidXJzdENoYW5jZSI6IjAuMSIsImZsYW1lYnVyc3RMZW5ndGgiOiIxIiwid2F0ZXJQcm9kdWN0aW9uTXVsdCI6IjEiLCJ3YXRlckdlbmVyYXRvck11bHQiOiIxIiwibGFzdFJlc2V0VGltZSI6IjE2ODk4NjA5OTg5NDAiLCJzdGFydE9mR2FtZSI6IjE2ODk4NjA5OTg5NDAiLCJ0aW1lU2luY2VTdGFydE9mR2FtZSI6IjQ2MTc5MDkxIiwibWF4V2F0ZXIiOiIwIiwibWF4RmlyZSI6IjAiLCJtYXhFYXJ0aCI6IjAiLCJtYXhBaXIiOiIwIiwibWF4U3BhY2UiOiIwIiwibWF4QWV0aGVyIjoiMCIsImNoYWxsZW5nZTEiOjAsImNoYWxsZW5nZTIiOjAsImNoYWxsZW5nZTMiOjAsImNoYWxsZW5nZTQiOjAsImNoYWxsZW5nZTUiOjAsImNoYWxsZW5nZTYiOjAsImNoYWxsZW5nZTciOjAsImFjdGl2ZUNoYWxsZW5nZSI6IiIsInNhdmVCZWZvcmVDaGFsbGVuZ2UiOiIiLCJjaGFsbGVuZ2VPbmVIaWdoZXN0IjoiNC44MzU5MjI0MTYyMzkzNWUrNzc1IiwiY2hhbGxlbmdlVHdvSGlnaGVzdCI6IjAiLCJjaGFsbGVuZ2VUaHJlZUhpZ2hlc3QiOiIxLjkwOTI4Njg1Njk1NjkzMTdlKzQ4NTIiLCJjaGFsbGVuZ2VGb3VySGlnaGVzdCI6IjAiLCJjaGFsbGVuZ2VGaXZlSGlnaGVzdCI6IjAiLCJjaGFsbGVuZ2VTaXhIaWdoZXN0IjoiMi4wNzM0NzYxMzA0NzQyMTFlKzE3NiIsImNoYWxsZW5nZVNldmVuSGlnaGVzdCI6IjAiLCJ1cGdyYWRlRXhwb3J0X2ZpcmVSZXBlYXRhYmxlIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjFDMSI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIxQzIiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMUMzIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjJDMSI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIyQzIiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMkMzIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyUmVwZWF0YWJsZSI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIxQzIiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjFDMyI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIyQzIiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjJDMyI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFJlcGVhdGFibGUiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjFDMSI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMUMyIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIxQzMiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjJDMSI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMkMyIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIyQzMiOjB9"
    props.importGame(blankSave);
  }

  // Call update every second (update time)
  React.useEffect(() => {
    autosave()
}, [props.getValue("fire"), props.getValue("water"), props.getValue("earth")])

  return (
    
    <div id="OptionsContainer">
        <div id="importPrompt" className={showImport ? "" : "displayNone"}>
          <button id="cancelImportButton" onClick={() => setShowImport(false)}>X</button>

          
          <h3>Import your save:</h3> 
          <textarea onChange={handleSaveChange} /> 
          <button onClick={() => setShowImport(false) || props.importGame(save)} id="importSubmitButton">Submit</button>
          
        </div>

        <div id="exportPrompt" className={showExport ? "" : "displayNone"}>
          <button id="cancelExportButton" onClick={() => setShowExport(false)}>X</button>

          
          <h3>Copy your save file!</h3> 
          <textarea value={save} readOnly/> 
          
        </div>


        <h2>Options</h2>
        <h3>Exports are saved to your clipboard and downloaded as a file!</h3>

        <div id="OptionsButtonContainer">
          <button onClick={() => copyToClipboard(props.exportGame()) || setShowExport(true)}>Export Game to Clipboard</button>
          <button onClick={() => copyToFile(props.exportGame())}>Export Game to File</button>
          <button onClick={() => setShowImport(true)}>Import Game</button>
          <button onClick={() => resetGame()}>Reset Game</button>

        </div>
    </div>
  );
}

export default OptionsTab;
