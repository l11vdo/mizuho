import React, { useEffect } from "react";
import "./App.css";
import { Grid, Typography } from "@mui/material";

type StockRow = {
  dttm: string;
  price: string;
  volume: string;
};

interface StockProps {
  data: StockRow[]
}
export default function StockTable(props: StockProps) {
  useEffect(() => {
  //Time Series (5min)
  }, []);
  return (
    <div className="tableHeader">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className="controlCell">
              <Typography >Date/Time</Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="controlCell">
              <Typography>Closing Price</Typography>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="controlCell">
              <Typography>Volume</Typography>
            </div>
          </Grid>
        </Grid> 
      <div className="scroll">
        {props.data && props.data.map((row: StockRow) => (
        <Grid container spacing={2} key={row.dttm}>
          <Grid item xs={4}>
            <div className="controlCell">
              <Typography>{row.dttm}</Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="controlCell">
              <Typography>{row.price}</Typography>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="controlCell">
              <Typography>{row.volume}</Typography>
            </div>
          </Grid>
        </Grid>
        ))}
      </div>      
    </div>
  )
}