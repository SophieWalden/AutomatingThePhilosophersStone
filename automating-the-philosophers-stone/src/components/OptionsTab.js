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
    let blankSave = "eyJlbmVyZ3kiOiIxIiwic3BlbnRFbmVyZ3kiOiIwIiwic2FjcmlmaWNlZFRvdGFsIjoiMCIsImVuZXJneU11bHQiOiIxIiwiZmlyZSI6IjAiLCJ3YXRlciI6IjAiLCJlYXJ0aCI6IjAiLCJhaXIiOiIwIiwic3BhY2UiOiIwIiwiYWV0aGVyIjoiMCIsImZpcmVHZW5lcmF0b3JBbW91bnQiOiIwIiwid2F0ZXJHZW5lcmF0b3JBbW91bnQiOiIwIiwiZWFydGhHZW5lcmF0b3JBbW91bnQiOiIwIiwiYWlyR2VuZXJhdG9yQW1vdW50IjoiMCIsInNwYWNlR2VuZXJhdG9yQW1vdW50IjoiMCIsImFldGhlckdlbmVyYXRvckFtb3VudCI6IjAiLCJmbGFtZWJ1cnN0TXVsdCI6IjEwIiwiZmxhbWVidXJzdENoYW5jZSI6IjAuMSIsImZsYW1lYnVyc3RMZW5ndGgiOiIxIiwid2F0ZXJQcm9kdWN0aW9uTXVsdCI6IjEiLCJ3YXRlckdlbmVyYXRvck11bHQiOiIxIiwibGFzdFJlc2V0VGltZSI6IjE2ODk4NjA5OTg5NDAiLCJzdGFydE9mR2FtZSI6IjE2ODk4NjA5OTg5NDAiLCJ0aW1lU2luY2VTdGFydE9mR2FtZSI6IjQ2MTc5MDkxIiwibWF4V2F0ZXIiOiIwIiwibWF4RmlyZSI6IjAiLCJtYXhFYXJ0aCI6IjAiLCJtYXhBaXIiOiIwIiwibWF4U3BhY2UiOiIwIiwibWF4QWV0aGVyIjoiMCIsImNoYWxsZW5nZTEiOjAsImNoYWxsZW5nZTIiOjAsImNoYWxsZW5nZTMiOjAsImNoYWxsZW5nZTQiOjAsImNoYWxsZW5nZTUiOjAsImNoYWxsZW5nZTYiOjAsImNoYWxsZW5nZTciOjAsImFjdGl2ZUNoYWxsZW5nZSI6IiIsInNhdmVCZWZvcmVDaGFsbGVuZ2UiOiIiLCJjaGFsbGVuZ2VPbmVIaWdoZXN0IjoiMCIsImNoYWxsZW5nZVR3b0hpZ2hlc3QiOiIwIiwiY2hhbGxlbmdlVGhyZWVIaWdoZXN0IjoiMCIsImNoYWxsZW5nZUZvdXJIaWdoZXN0IjoiMCIsImNoYWxsZW5nZUZpdmVIaWdoZXN0IjoiMCIsImNoYWxsZW5nZVNpeEhpZ2hlc3QiOiIwIiwiY2hhbGxlbmdlU2V2ZW5IaWdoZXN0IjoiMCIsInVwZ3JhZGVFeHBvcnRfZmlyZVJlcGVhdGFibGUiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjFDMiI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIxQzMiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjJDMiI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIyQzMiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJSZXBlYXRhYmxlIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIxQzEiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjFDMiI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMUMzIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIyQzEiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjJDMiI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMkMzIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoUmVwZWF0YWJsZSI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIxQzIiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjFDMyI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIyQzIiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjJDMyI6MH0="
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
        
        <div id="optionsStoryContainer">
          <h3>Story</h3>

          <h4>You get a random call out of the blue from your doctor and he gives you the bad news</h4>
          <h5>"Listen, you're going to die in a year and I'm not sure there's much you can do about it" The doctor says</h5>
          <br />
          <h4>Now you have nothing to lose, you can do anything you wanted in life, but all you really wanted is to live like 2 more years</h4>
          <h5>(because idk you might miss out on some good Walmart sale or something)</h5>
          <br />
          <h4>You instantly have an idea! You've read books about Alchemy before and think to youself </h4>
          <h5>Damn I should really get the philosophers stone</h5>
          <br />
          <h4>The problem is you know you're really lazy and dont want to go through all the work</h4>
          <h5>So it seems that you're going to have to Automate the Philosophers Stone (In your basement)</h5>
        </div>
    </div>
  );
}

export default OptionsTab;
