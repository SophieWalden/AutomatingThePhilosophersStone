
import './ChallengesTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

function ChallengesTab(props) {

  let [challenge, setChallenge] = React.useState("challenge1");

  function startChallenge(){
    let save = props.exportGame();
    props.setChallengeValue("saveBeforeChallenge", save);

    let energyMult = props.getValue("energyMult");

    // Update this when you update whats in a save
    let blankSave = "eyJlbmVyZ3kiOiIxIiwic3BlbnRFbmVyZ3kiOiIwIiwic2FjcmlmaWNlZFRvdGFsIjoiMCIsImVuZXJneU11bHQiOiIxIiwiZmlyZSI6IjAiLCJ3YXRlciI6IjAiLCJlYXJ0aCI6IjAiLCJhaXIiOiIwIiwic3BhY2UiOiIwIiwiYWV0aGVyIjoiMCIsImZpcmVHZW5lcmF0b3JBbW91bnQiOiIwIiwid2F0ZXJHZW5lcmF0b3JBbW91bnQiOiIwIiwiZWFydGhHZW5lcmF0b3JBbW91bnQiOiIwIiwiYWlyR2VuZXJhdG9yQW1vdW50IjoiMCIsInNwYWNlR2VuZXJhdG9yQW1vdW50IjoiMCIsImFldGhlckdlbmVyYXRvckFtb3VudCI6IjAiLCJmbGFtZWJ1cnN0TXVsdCI6IjEwIiwiZmxhbWVidXJzdENoYW5jZSI6IjAuMSIsImZsYW1lYnVyc3RMZW5ndGgiOiIxIiwid2F0ZXJHZW5lcmF0b3JNdWx0IjoiMSIsInRpbWVTaW5jZVN0YXJ0T2ZHYW1lIjoiMjI0MyIsIm1heFdhdGVyIjoiMCIsIm1heEZpcmUiOiIwIiwibWF4RWFydGgiOiIwIiwibWF4QWlyIjoiMCIsInVwZ3JhZGVFeHBvcnRfZmlyZVJlcGVhdGFibGUiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjFDMiI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIxQzMiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjJDMiI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIyQzMiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJSZXBlYXRhYmxlIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIxQzEiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjFDMiI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMUMzIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIyQzEiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjJDMiI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMkMzIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoUmVwZWF0YWJsZSI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIxQzIiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjFDMyI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIyQzIiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjJDMyI6MH0="
    props.importGame(blankSave);
    props.setValue("energyMult", energyMult);

    // Resetting challenge specific values
    props.setValue("productionMult", new Decimal(1));
    props.setChallengeValue("timeOfStartChallenge", Date.now());

    props.setChallengeValue("activeChallenge", challenge);
  }

  function exitChallenge(){
    if (challengeConditionCompleted()){
      if (challenge == "challenge1") props.setChallengeValue("challengeOneCompletions", 1);
      if (challenge == "challenge2") props.setChallengeValue("challengeTwoCompletions", 1);
      if (challenge == "challenge3") props.setChallengeValue("challengeThreeCompletions", 1);
      if (challenge == "challenge4") props.setChallengeValue("challengeFourCompletions", 1);
      if (challenge == "challenge5") props.setChallengeValue("challengeFiveCompletions", 1);
      if (challenge == "challenge6") props.setChallengeValue("challengeSixCompletions", 1);
      if (challenge == "challenge7") props.setChallengeValue("challengeSevenCompletions", 1);
    }


    props.importGame(props.getChallengeValue("saveBeforeChallenge"));
    props.setChallengeValue("activeChallenge", "");

  }

  function challengeConditionCompleted(){
    if (challenge == "challenge1") return props.getValue("water").greaterThanOrEqualTo(new Decimal(10).pow(25));
    if (challenge == "challenge2") return props.getValue("earth").greaterThanOrEqualTo(new Decimal(10).pow(25));
    if (challenge == "challenge3") return props.getValue("energy").greaterThanOrEqualTo(new Decimal(10).pow(5));
    if (challenge == "challenge4") return props.getValue("energy").greaterThanOrEqualTo(new Decimal(10).pow(5));
    if (challenge == "challenge5") return props.getValue("fire").greaterThanOrEqualTo(new Decimal(10).pow(40));
    if (challenge == "challenge6") return props.getValue("energy").greaterThanOrEqualTo(new Decimal(10).pow(5));
    if (challenge == "challenge7") return props.getValue("energy").greaterThanOrEqualTo(new Decimal(10).pow(5));
  }

  function getChallengeCompletions(){
    if (challenge == "challenge1") return props.getChallengeValue("challengeOneCompletions");
    if (challenge == "challenge2") return props.getChallengeValue("challengeTwoCompletions");
    if (challenge == "challenge3") return props.getChallengeValue("challengeThreeCompletions");
    if (challenge == "challenge4") return props.getChallengeValue("challengeFourCompletions");
    if (challenge == "challenge5") return props.getChallengeValue("challengeFiveCompletions");
    if (challenge == "challenge6") return props.getChallengeValue("challengeSixCompletions");
    if (challenge == "challenge7") return props.getChallengeValue("challengeSevenCompletions");
  }

  

  return (
    
    <div className="ChallengesContainer">
        <h2>Challenges</h2>

        <div id="challengeSelector">
          <button className={props.getChallengeValue("challengeOneCompletions")==1 ? "ChallengeCompleted" : ""} onClick={() => setChallenge("challenge1")}>
            <h2>Challenge 1: ♄</h2>
          </button>

          <button className={props.getChallengeValue("challengeTwoCompletions")==1 ? "ChallengeCompleted" : ""} onClick={() => setChallenge("challenge2")}>
            <h2>Challenge 2: ♃</h2>
          </button>

          <button className={props.getChallengeValue("challengeThreeCompletions")==1 ? "ChallengeCompleted" : ""} onClick={() => setChallenge("challenge3")}>
            <h2>Challenge 3: ♂</h2>
          </button>

          <button className={props.getChallengeValue("challengeFourCompletions")==1 ? "ChallengeCompleted" : ""} onClick={() => setChallenge("challenge4")}>
            <h2>Challenge 4: ☽</h2>
          </button>

          <button className={props.getChallengeValue("challengeFiveCompletions")==1 ? "ChallengeCompleted" : ""} onClick={() => setChallenge("challenge5")}>
            <h2>Challenge 5: ♀</h2>
          </button>

          <button className={props.getChallengeValue("challengeSixCompletions")==1 ? "ChallengeCompleted" : ""} onClick={() => setChallenge("challenge6")}>
            <h2>Challenge 6: ☿</h2>
          </button>

          <button className={props.getChallengeValue("challengeSevenCompletions")==1 ? "ChallengeCompleted" : ""} onClick={() => setChallenge("challenge7")}>
            <h2>Challenge 7: ☼</h2>
          </button>
        </div>

        <div id="ChallengeDesciptor">
          <div className={challenge != "challenge1" ? "challengeDisabled challengeDescription" : "challengeDescription"}>
            <h2>Challenge 1: Lead (Symbol ♄) </h2>

            <p>Lead melts at 621 degrees Farenheit, thats quite hot already! Get to a certain water goal without using fire to cool it down.</p>
          </div>

          <div className={challenge != "challenge2" ? "challengeDisabled challengeDescription" : "challengeDescription"}>
          <h2>Challenge 2: Tin (Symbol ♃) </h2>

            <p> No one likes Tin, maybe we can bury it in dirt and forget about it, reach a certain earth amount with the other elements disabled because we need to focus on burying tin</p>
          </div>

          <div className={challenge != "challenge3" ? "challengeDisabled challengeDescription" : "challengeDescription"}>
          <h2>Challenge 3: Iron (Symbol ♂) </h2>

            <p> You cant make steel without iron and you know what really has been a steal? These shop prices! Shop prices are doubled</p>
          </div>

          <div className={challenge != "challenge4" ? "challengeDisabled challengeDescription" : "challengeDescription"}>
            <h2>Challenge 4: Silver (Symbol ☽) </h2>

            <p>Silver has a halflife of 439 years, but just for you we can accelerate it to 1 minute! Production is halved every minute</p>
          </div>

          <div className={challenge != "challenge5" ? "challengeDisabled challengeDescription" : "challengeDescription"}>
            <h2>Challenge 5: Copper (Symbol ♀) </h2>

            <p>The statue of liberty is made from 179,000 pounds of copper, thats alot of copper! If you did the math it would take approximately 1e40 fire to melt it, so get working and dont think of getting any pesky water or earth (which are disabled)</p>
          </div>

          <div className={challenge != "challenge6" ? "challengeDisabled challengeDescription" : "challengeDescription"}>
            <h2>Challenge 6: Quicksilver (Symbol ☿) </h2>

            <p>Quicksilver is named for its speed, but surely you can do faster, get to an energy goal within 2 minutes or Quick silver rapidly halts production</p>
          </div>

          <div className={challenge != "challenge7" ? "challengeDisabled challengeDescription" : "challengeDescription"}>
            <h2>Challenge 7: Gold (Symbol ☼) </h2>

            <p>Final Challenge: Energy mult is square rooted, all production is square rooted aswell</p>
          </div>

          <div id="challengeStartDiv">
            <div id="challengeRewards">

              <div className={challenge != "challenge1" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e25 Water</h4>
                <h3>Reward: Water Generator Effective count ^ 1.2</h3>

              </div>

              <div className={challenge != "challenge2" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e25 Earth</h4>
                <h3>Reward: Earth Production Multiplier based on Earth Generator Amount</h3>

              </div>

              <div className={challenge != "challenge3" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e5 Energy</h4>
                <h3>Reward: Energy Multiplier formula improved (1.01^(Energy without mult) -&gt; 1.05^(Energy without mult))</h3>

              </div>

              <div className={challenge != "challenge4" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e5 Energy</h4>
                <h3>Reward: Unlock Space Generators, generating all generators of basic types</h3>

              </div>

              <div className={challenge != "challenge5" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e40 Fire</h4>
                <h3>Reward: Fire Generators are much cheaper</h3>

              </div>

              <div className={challenge != "challenge6" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e5 Energy</h4>
                <h3>Reward: Giant production multiplier in first 3 minutes of a reset (^1.5)</h3>

              </div>

              <div className={challenge != "challenge7" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e5 Energy</h4>
                <h3>Reward: Unlock Aether generator, generating pure energy</h3>

              </div>

            </div>
            <button onClick={() => (props.getChallengeValue("activeChallenge") == "" ? startChallenge : exitChallenge)() }><p>{props.getChallengeValue("activeChallenge") == "" ? "Start Challenge" : "End Challenge"}</p></button>

          </div>
          

        </div>
    </div>
  );
}

export default ChallengesTab;
