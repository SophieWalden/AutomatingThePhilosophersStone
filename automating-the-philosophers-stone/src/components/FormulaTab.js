import './FormulaTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

function FormulaTab(props) {


  return (
    
    <div className="FormulaContainer">
        <h2>Formula</h2>
        <h3>All values are set to their max across all resets</h3>

        <br />
        <h3>1 (Base energy)</h3>
        <h3>+ {props.formatValues(new Decimal(props.getValue("maxFire").plus(1).log(10)).floor())} (Log10(fire + 1))</h3>
        <h3 className={`${props.getValue("maxWater") == 0 ? "notUnlocked" : ""}`}>+ {props.formatValues(new Decimal(props.getValue("maxWater").plus(1).log(4)).floor())} (Log4(water + 1))</h3>
        <h3 className={`${props.getValue("maxEarth") == 0 ? "notUnlocked" : ""}`}>+ {props.formatValues(new Decimal(props.getValue("maxEarth").plus(1).log(2)).floor())} (Log2(earth + 1))</h3>
        <h3 className={`${props.getValue("maxAir") == 0 ? "notUnlocked" : ""}`}>+ {props.formatValues(new Decimal(props.getValue("maxAir").plus(1).log(1.5)).floor())} (Log1.5(air + 1))</h3>
        <h3 className={`${props.getValue("maxSpace") == 0 ? "notUnlocked" : ""}`}>+ {props.formatValues(new Decimal(props.getValue("maxSpace").plus(1).log(1.25)).floor())} (Log1.25(space + 1))</h3>
        <h3 className={`${props.getValue("maxAether") == 0 ? "notUnlocked" : ""}`}>+ {props.formatValues(new Decimal(props.getValue("maxAether")).floor())} (Aether)</h3>
        <h3>x {props.formatValues(props.getValue("energyMult"))} (Energy Multiplier)</h3>
        
        <h4> = {props.formatValues(props.getValue("energy"))} Energy</h4>
    </div>
  );
}

export default FormulaTab;
