
import './ChallengesTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

function ChallengesTab(props) {

  let [challenge, setChallenge] = React.useState(props.getValue("activeChallenge") != "" ? "challenge1" : props.getValue("activeChallenge"));

  function startChallenge(){
    let save = props.exportGame();
    props.setChallengeValue("saveBeforeChallenge", save);

    let energyMult = props.getValue("energyMult");

    // Update this when you update whats in a save
    let blankSave = "eyJlbmVyZ3kiOiIxIiwic3BlbnRFbmVyZ3kiOiIwIiwic2FjcmlmaWNlZFRvdGFsIjoiMCIsImVuZXJneU11bHQiOiIxIiwiZmlyZSI6IjAiLCJ3YXRlciI6IjAiLCJlYXJ0aCI6IjAiLCJhaXIiOiIwIiwic3BhY2UiOiIwIiwiYWV0aGVyIjoiMCIsImZpcmVHZW5lcmF0b3JBbW91bnQiOiIwIiwid2F0ZXJHZW5lcmF0b3JBbW91bnQiOiIwIiwiZWFydGhHZW5lcmF0b3JBbW91bnQiOiIwIiwiYWlyR2VuZXJhdG9yQW1vdW50IjoiMCIsInNwYWNlR2VuZXJhdG9yQW1vdW50IjoiMCIsImFldGhlckdlbmVyYXRvckFtb3VudCI6IjAiLCJmbGFtZWJ1cnN0TXVsdCI6IjEwIiwiZmxhbWVidXJzdENoYW5jZSI6IjAuMSIsImZsYW1lYnVyc3RMZW5ndGgiOiIxIiwid2F0ZXJHZW5lcmF0b3JNdWx0IjoiMSIsInRpbWVTaW5jZVN0YXJ0T2ZHYW1lIjoiMjI0MyIsIm1heFdhdGVyIjoiMCIsIm1heEZpcmUiOiIwIiwibWF4RWFydGgiOiIwIiwibWF4QWlyIjoiMCIsInVwZ3JhZGVFeHBvcnRfZmlyZVJlcGVhdGFibGUiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjFDMiI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIxQzMiOjAsInVwZ3JhZGVFeHBvcnRfZmlyZVVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X2ZpcmVVcGdyYWRlUjJDMiI6MCwidXBncmFkZUV4cG9ydF9maXJlVXBncmFkZVIyQzMiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJSZXBlYXRhYmxlIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIxQzEiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjFDMiI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMUMzIjowLCJ1cGdyYWRlRXhwb3J0X3dhdGVyVXBncmFkZVIyQzEiOjAsInVwZ3JhZGVFeHBvcnRfd2F0ZXJVcGdyYWRlUjJDMiI6MCwidXBncmFkZUV4cG9ydF93YXRlclVwZ3JhZGVSMkMzIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoUmVwZWF0YWJsZSI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMUMxIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIxQzIiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjFDMyI6MCwidXBncmFkZUV4cG9ydF9lYXJ0aFVwZ3JhZGVSMkMxIjowLCJ1cGdyYWRlRXhwb3J0X2VhcnRoVXBncmFkZVIyQzIiOjAsInVwZ3JhZGVFeHBvcnRfZWFydGhVcGdyYWRlUjJDMyI6MH0="
    props.importGame(blankSave);

    
    props.setValue("energyMult", energyMult.pow(0.2));
    props.setValue("energy", new Decimal(15));

    props.setValue("firstReset", false);

    // Resetting challenge specific values
    props.setValue("productionMult", new Decimal(1));
    props.setChallengeValue("timeOfStartChallenge", Date.now());

    props.setChallengeValue("activeChallenge", challenge);
  }

  function exitChallenge(){
    let currentChallenge = props.getChallengeValue("activeChallenge");
    if (challenge != currentChallenge) setChallenge(currentChallenge);
    let challengeCompleted = challengeConditionCompleted();
    let highest = getScalingFactor(currentChallenge);
    

    props.importGame(props.getChallengeValue("saveBeforeChallenge"));
    props.setChallengeValue("activeChallenge", "");
    props.setValue(getHighestName(currentChallenge), Decimal.max(props.getValue(getHighestName(currentChallenge)), highest))

    if (challengeCompleted){
      if (currentChallenge == "challenge1") props.setChallengeValue("challengeOneCompletions", 1);
      if (currentChallenge == "challenge2") props.setChallengeValue("challengeTwoCompletions", 1);
      if (currentChallenge == "challenge3") props.setChallengeValue("challengeThreeCompletions", 1);
      if (currentChallenge == "challenge4") props.setChallengeValue("challengeFourCompletions", 1);
      if (currentChallenge == "challenge5") props.setChallengeValue("challengeFiveCompletions", 1);
      if (currentChallenge == "challenge6") props.setChallengeValue("challengeSixCompletions", 1);
      if (currentChallenge == "challenge7") props.setChallengeValue("challengeSevenCompletions", 1);
    }

  }

  function getHighestName(challenge){
    return {"challenge1": "challengeOneHighest", "challenge2": "challengeTwoHighest", "challenge3": "challengeThreeHighest",
    "challenge4": "challengeFourHighest", "challenge5": "challengeFiveHighest", "challenge6": "challengeSixHighest", "challenge7": "challengeSevenHighest"}[challenge]
  }

  function getScalingFactor(challenge){
    if (challenge == "challenge1") return props.getValue("maxWater");
    if (challenge == "challenge2") return props.getValue("maxEarth");
    if (challenge == "challenge3") return props.getValue("energy");
    if (challenge == "challenge4") return props.getValue("energy");
    if (challenge == "challenge5") return props.getValue("maxFire");
    if (challenge == "challenge6") return props.getValue("energy");
    if (challenge == "challenge7") return props.getValue("energy");
  }

  function challengeConditionCompleted(){
    if (challenge == "challenge1") return props.getValue("water").greaterThanOrEqualTo(new Decimal(10).pow(150));
    if (challenge == "challenge2") return props.getValue("earth").greaterThanOrEqualTo(new Decimal(10).pow(210));
    if (challenge == "challenge3") return props.getValue("energy").greaterThanOrEqualTo(new Decimal(10).pow(5));
    if (challenge == "challenge4") return props.getValue("energy").greaterThanOrEqualTo(new Decimal(10).pow(5));
    if (challenge == "challenge5") return props.getValue("fire").greaterThanOrEqualTo(new Decimal(10).pow(130));
    if (challenge == "challenge6") return props.getValue("energy").greaterThanOrEqualTo(new Decimal(4).times(new Decimal(10).pow(4)));
    if (challenge == "challenge7") return props.getValue("energy").greaterThanOrEqualTo(new Decimal(10).pow(4));
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
        <h3>Challenges puts you in a modified run with everything reset except a reduced energy multiplier based on your current multiplier</h3>
        <h3>Your reward for a challenge is based on your highest achievable value for a certain element that you are aiming for the in the challenge</h3>
        <h4>You can exit challenges at any time to come back to your current save</h4>

        <div id="challengeSelector">
          <button className={props.getChallengeValue("challengeOneCompletions")==1 ? "ChallengeCompleted" : ""} onClick={() => setChallenge("challenge1")}>
            <h2>Challenge 1: ♄</h2>
          </button>

          <button className={`${props.getChallengeValue("challengeTwoCompletions")==1 ? "ChallengeCompleted" : ""} ${props.getChallengeValue("challengeOneCompletions") == 1 ? "" : "notUnlocked"}`} onClick={() => setChallenge("challenge2")}>
            <h2>Challenge 2: ♃</h2>
          </button>

          <button className={`${props.getChallengeValue("challengeThreeCompletions")==1 ? "ChallengeCompleted" : ""} ${props.getChallengeValue("challengeOneCompletions") == 1 ? "" : "notUnlocked"}`} onClick={() => setChallenge("challenge3")}>
            <h2>Challenge 3: ♂</h2>
          </button>

          <button className={`${props.getChallengeValue("challengeFourCompletions")==1 ? "ChallengeCompleted" : ""} ${props.getChallengeValue("challengeTwoCompletions") == 1  || props.getChallengeValue("challengeThreeCompletions") == 1 ? "" : "notUnlocked"}`} onClick={() => setChallenge("challenge4")}>
            <h2>Challenge 4: ☽</h2>
          </button>

          <button className={`${props.getChallengeValue("challengeFiveCompletions")==1 ? "ChallengeCompleted" : ""} ${props.getChallengeValue("challengeTwoCompletions") == 1  || props.getChallengeValue("challengeThreeCompletions") == 1 ? "" : "notUnlocked"}`} onClick={() => setChallenge("challenge5")}>
            <h2>Challenge 5: ♀</h2>
          </button>

          <button className={`${props.getChallengeValue("challengeSixCompletions")==1 ? "ChallengeCompleted" : ""} ${props.getChallengeValue("challengeFourCompletions") == 1  || props.getChallengeValue("challengeFiveCompletions") == 1  ? "" : "notUnlocked"}`} onClick={() => setChallenge("challenge6")}>
            <h2>Challenge 6: ☿</h2>
          </button>

          <button className={`${props.getChallengeValue("challengeSevenCompletions")==1 ? "ChallengeCompleted" : ""} ${props.getChallengeValue("challengeFiveCompletions") == 1 &&  props.getChallengeValue("challengeSixCompletions") == 1  ? "" : "notUnlocked"}`} onClick={() => setChallenge("challenge7")}>
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

            <p>Silver has a halflife of 439 years, but just for you we can accelerate it to 1 minute! Production is halved every 20 seconds after the first minute</p>
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


                <h4>Goal: 1e150 Water</h4>
                <h4>Current Highest: {props.formatValues(props.getValue("challengeOneHighest"))} Water</h4>
                <h3>Reward: Water Generator Effective count ^ ({props.formatValues(new Decimal(props.getValue("challengeOneHighest").plus(1).log(100)).dividedBy(100).plus(1.2))})</h3>

              </div>

              <div className={challenge != "challenge2" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e210 Earth</h4>
                <h4>Current Highest: {props.formatValues(props.getValue("challengeTwoHighest"))} Earth</h4>
                <h3>Reward: Earth Production Multiplier based on Earth Generator Amount and Highest Earth in this Challenge ({props.formatValues(props.getValue("earthGeneratorAmount").times(new Decimal(props.getValue("challengeTwoHighest").plus(1).log(10)).plus(1)))}x)</h3>

              </div>

              <div className={challenge != "challenge3" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e5 Energy</h4>
                <h4>Current Highest: {props.formatValues(props.getValue("challengeThreeHighest"))} Energy</h4>
                <h3>Reward: Energy Multiplier formula improved (energyMult^{props.formatValues(new Decimal(1.01).plus(new Decimal(props.getValue("challengeThreeHighest").plus(1).log(10)).dividedBy(100)))})</h3>

              </div>

              <div className={challenge != "challenge4" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e5 Energy</h4>
                <h4>Current Highest: {props.formatValues(props.getValue("challengFourHighest"))} Energy (Increasing highest for challenge 4 has no affect)</h4>
                <h3>Reward: Unlock Space Generators, generating all generators of basic types</h3>

              </div>

              <div className={challenge != "challenge5" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e130 Fire</h4>
                <h4>Current Highest: {props.formatValues(props.getValue("challengeFiveHighest"))} Fire</h4>
                <h3>Reward: Fire Generators^{props.formatValues(new Decimal(1.8).plus(new Decimal(props.getValue("challengeFiveHighest").plus(1).log(1000000)).dividedBy(10)))}</h3>

              </div>

              <div className={challenge != "challenge6" ? "challengeDisabled" : ""}>


                <h4>Goal: 4e4 Energy</h4>
                <h4>Current Highest: {props.formatValues(props.getValue("challengeSixHighest"))} Energy</h4>
                <h3>Reward: Giant scaling multiplier based on time played ({props.formatValues(new Decimal(1.1).pow(props.getValue("timeSinceStartOfGame").log(1.01)).times(props.getValue("challengeSixHighest").log(10)))})</h3>

              </div>

              <div className={challenge != "challenge7" ? "challengeDisabled" : ""}>


                <h4>Goal: 1e4 Energy</h4>
                <h4>Current Highest: {props.formatValues(props.getValue("challengSevenrHighest"))} Energy (Increasing highest for challenge 7 has no affect)</h4>
                <h3>Reward: Unlock Aether generator, generating pure energy</h3>

              </div>

            </div>
            <button onClick={() => (props.getChallengeValue("activeChallenge") == "" ? startChallenge : exitChallenge)() }><p>{props.getChallengeValue("activeChallenge") == "" ? "Start Challenge" : (challengeConditionCompleted() ? "End Challenge" : "Exit Challenge")}</p></button>

          </div>
          

        </div>
    </div>
  );
}

export default ChallengesTab;
