import React, { forwardRef } from "react";

import "./ProgressIndicator.scss";

const ProgressIndicator = forwardRef(({ className = "", ...other }, ref) => (
  <div
    {...other}
    className={
      "ProgressIndicator d-flex justify-content-center align-items-center w-100 " +
      className
    }
    ref={ref}
  >
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
));

export { ProgressIndicator };
export default ProgressIndicator;
