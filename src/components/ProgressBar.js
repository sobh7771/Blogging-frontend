import React, { useEffect, useState } from "react";
import reactDom from "react-dom";
import { LinearProgress } from "@mui/material";

function ProgressBar() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  if (!isBrowser) {
    return <></>;
  }

  return reactDom.createPortal(
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "4px",
        left: 0,
        top: 0,
        margin: "auto",
        zIndex: 10,
      }}>
      <LinearProgress color="secondary" />
    </div>,
    document.getElementById("progress-bar")
  );
}

export default ProgressBar;
