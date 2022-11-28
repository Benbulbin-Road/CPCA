import { Box } from "@mui/material";
import { textAlign } from "@mui/system";
import React from "react";

function Home() {
  const longHomeText = "Welcome to CoolPlanet's awesome Homepage. Here you can navigate to the List page where you can view all Users for some reason or enter your desired User ID in the input field and see that User's details"
  return (
    <Box
      sx={{
        width: '80%',
        height: 300,
        alignSelf: 'center',
        textAlign: 'center',
        margin: '0 auto',
      }}
    >
      <h2>{longHomeText}</h2>
    </Box>
  )
}

export default Home;