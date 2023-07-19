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


  function copyToClipboard(save, extraOptions){
    navigator.clipboard.writeText(save);

    if (extraOptions == "localSave"){
      download(save, "AutomatingThePhilosophersStoneSave.txt", "txt")
    }
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
    let blankSave = "eyJlbmVyZ3kiOiIxIiwic3BlbnRFbmVyZ3kiOiIwIiwic2FjcmlmaWNlZFRvdGFsIjoiMCIsImVuZXJneU11bHQiOiIxIiwiZmlyZSI6IjAiLCJ3YXRlciI6IjAiLCJlYXJ0aCI6IjAiLCJhaXIiOiIwIiwic3BhY2UiOiIwIiwiYWV0aGVyIjoiMCIsImZpcmVHZW5lcmF0b3JBbW91bnQiOiIwIiwid2F0ZXJHZW5lcmF0b3JBbW91bnQiOiIwIiwiZWFydGhHZW5lcmF0b3JBbW91bnQiOiIwIiwiYWlyR2VuZXJhdG9yQW1vdW50IjoiMCIsInNwYWNlR2VuZXJhdG9yQW1vdW50IjoiMCIsImFldGhlckdlbmVyYXRvckFtb3VudCI6IjAiLCJmbGFtZWJ1cnN0TXVsdCI6IjEwIiwiZmxhbWVidXJzdENoYW5jZSI6IjAuMSIsImZsYW1lYnVyc3RMZW5ndGgiOiIxIiwid2F0ZXJHZW5lcmF0b3JNdWx0IjoiMSIsInRpbWVTaW5jZVN0YXJ0T2ZHYW1lIjoiMjI0MyIsIm1heFdhdGVyIjoiMCIsIm1heEZpcmUiOiIwIiwibWF4RWFydGgiOiIwIiwibWF4QWlyIjoiMCIsInVwZ3JhZGVFeHBvcnRfZmlyZVJlcGVhdGFibGUiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjFDMiI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIxQzMiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjJDMiI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIyQzMiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJSZXBlYXRhYmxlIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIxQzEiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjFDMiI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMUMzIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIyQzEiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjJDMiI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMkMzIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoUmVwZWF0YWJsZSI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIxQzIiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjFDMyI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIyQzIiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjJDMyI6MH0="
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

        <h2>Options</h2>
        <h3>Exports are saved to your clipboard and downloaded as a file!</h3>

        <div id="OptionsButtonContainer">
          <button onClick={() => copyToClipboard(props.exportGame(), "localSave")}>Export Game</button>
          <button onClick={() => setShowImport(true)}>Import Game</button>
          <button onClick={() => resetGame()}>Reset Game</button>

        </div>
    </div>
  );
}

export default OptionsTab;
