import Typography from "@mui/material/Typography";
import React from "react";

function EmptyComponent() {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
        User(s) Not Found
      </Typography>
    </React.Fragment>
  )
}

export default EmptyComponent;