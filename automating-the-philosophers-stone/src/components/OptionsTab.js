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
    let blankSave = "eyJlbmVyZ3kiOiIxIiwic3BlbnRFbmVyZ3kiOiIwIiwic2FjcmlmaWNlZFRvdGFsIjoiMCIsImVuZXJneU11bHQiOiIxIiwiZmlyZSI6IjAiLCJ3YXRlciI6IjAiLCJlYXJ0aCI6IjAiLCJhaXIiOiIwIiwic3BhY2UiOiIwIiwiYWV0aGVyIjoiMCIsImZpcmVHZW5lcmF0b3JBbW91bnQiOiIwIiwid2F0ZXJHZW5lcmF0b3JBbW91bnQiOiIwIiwiZWFydGhHZW5lcmF0b3JBbW91bnQiOiIwIiwiYWlyR2VuZXJhdG9yQW1vdW50IjoiMCIsInNwYWNlR2VuZXJhdG9yQW1vdW50IjoiMCIsImFldGhlckdlbmVyYXRvckFtb3VudCI6IjAiLCJmbGFtZWJ1cnN0TXVsdCI6IjEwIiwiZmxhbWVidXJzdENoYW5jZSI6IjAuMSIsImZsYW1lYnVyc3RMZW5ndGgiOiIxIiwid2F0ZXJQcm9kdWN0aW9uTXVsdCI6IjEiLCJ3YXRlckdlbmVyYXRvck11bHQiOiIxIiwibGFzdFJlc2V0VGltZSI6IjE2ODk4NjA5OTg5NDAiLCJzdGFydE9mR2FtZSI6IjE2ODk4NjA5OTg5NDAiLCJ0aW1lU2luY2VTdGFydE9mR2FtZSI6IjMzODYyNTgiLCJtYXhXYXRlciI6IjAiLCJtYXhGaXJlIjoiMCIsIm1heEVhcnRoIjoiMCIsIm1heEFpciI6IjAiLCJtYXhTcGFjZSI6IjAiLCJtYXhBZXRoZXIiOiIwIiwiY2hhbGxlbmdlMSI6MCwiY2hhbGxlbmdlMiI6MCwiY2hhbGxlbmdlMyI6MCwiY2hhbGxlbmdlNCI6MCwiY2hhbGxlbmdlNSI6MCwiY2hhbGxlbmdlNiI6MCwiY2hhbGxlbmdlNyI6MCwiYWN0aXZlQ2hhbGxlbmdlIjoiIiwidXBncmFkZUV4cG9ydF9maXJlUmVwZWF0YWJsZSI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIxQzEiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMUMyIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjFDMyI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIyQzEiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMkMyIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjJDMyI6MCwidXBncmFkZUV4cG9ydF93YXRlclJlcGVhdGFibGUiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjFDMSI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMUMyIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIxQzMiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjJDMSI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMkMyIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIyQzMiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhSZXBlYXRhYmxlIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIxQzEiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjFDMiI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMUMzIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIyQzEiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjJDMiI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMkMzIjowfQ=="
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
