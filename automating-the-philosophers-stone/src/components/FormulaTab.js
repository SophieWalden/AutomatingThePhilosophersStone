import './FormulaTab.css';
import React, {useState} from "react";
import Decimal from "break_infinity.js";

function FormulaTab(props) {


  return (
    
    <div className="FormulaContainer">
        <h2>Formula</h2>
        <h3>Earth, water, and fire are set to their max ever values across resets</h3>

        <br />
        <h3>1 (Base energy)</h3>
        <h3>+ {props.formatValues(new Decimal(props.getValue("maxFire").plus(1).log(10)).floor())} (Log10(fire + 1))</h3>
        <h3>+ {props.formatValues(new Decimal(props.getValue("maxWater").plus(1).log(4)).floor())} (Log4(water + 1))</h3>
        <h3>+ {props.formatValues(new Decimal(props.getValue("maxEarth").plus(1).log(2)).floor())} (Log2(earth + 1))</h3>
        <h3>x {props.formatValues(props.getValue("energyMult"))} (Energy Multiplier)</h3>
        
        <h4> = {props.formatValues(props.getValue("energy"))} Energy</h4>
    </div>
  );
}

export default FormulaTab;
