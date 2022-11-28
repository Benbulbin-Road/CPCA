import Alert from "@mui/material/Alert";
import React from "react";

function ErrorComponent() {
  return (
    <React.Fragment>
      <Alert severity="error">There appears to have been an error. Please try again later</Alert>
    </React.Fragment>
  )
}

export default ErrorComponent;