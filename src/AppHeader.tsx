import React from 'react';
import logo from './logo.png';
import './App.css';
import { Grid } from "@mui/material";

function AppHeader()
{
  return (
    <header>
      <Grid container>
        <Grid item xs={4}>
          <div id="image" style={{ display: "inline" }}>
            <img src={logo} loading="lazy" style={{ width: "130px", height: "50px" }} alt="" />
          </div>
        </Grid>
        <Grid item xs={8}>
          <div id="texts" style={{ display: "inline", padding: "40px", fontSize: "40px", color: "#183081"}}>
            <strong>Market Data</strong>
          </div>
        </Grid>
      </Grid>
    </header>
  )
}
export default AppHeader;