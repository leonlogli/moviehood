import React from "react";

export default function ProgressIndicator() {
  return (
    <div className="ProgressIndicator">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export { ProgressIndicator };
