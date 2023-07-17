import React from "react";
import { Spring } from "react-spring";

import "./verticalProgressBar.css"

const VerticalProgress = ({ progress }) => {


  return (
    <Spring from={{ percent: 0 }} to={{ percent: progress }}>
      {({ percent }) => (
        <div className="progress vertical">
          <div style={{ height: `${5+(0.95*(progress >= 100 ? 100 : progress))}%` }} className="progress-bar">
            <span className="sr-only">{`${Math.round(100 * progress) / 100}%`}</span>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default VerticalProgress;