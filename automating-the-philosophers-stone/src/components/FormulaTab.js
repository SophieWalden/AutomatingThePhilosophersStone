import './FormulaTab.css';
import React, {useState} from "react";

function FormulaTab(props) {


  return (
    
    <div className="FormulaContainer">
        <h2>Formula</h2>
        <h3>Energy is set to your all time max value of this equation</h3>

        <br />
        <h3>1 (Base energy)</h3>
        <h3>+ {Math.floor(Math.log10(1 + props.getValue("fire")))} (Log10(fire + 1))</h3>
        <h3>+ {Math.floor(Math.floor(Math.log(props.getValue("water")+1) / Math.log(4)))} (Log4(water + 1))</h3>
        <h3>+ {Math.floor(Math.floor(Math.log(props.getValue("earth")+1) / Math.log(2)))} (Log2(earth + 1))</h3>
        
        <h4> = {props.getValue("energy")} Energy</h4>
    </div>
  );
}

export default FormulaTab;
