import React, {useState, useEffect} from "react";
import AppHeader from './AppHeader';
import Auto from './Auto';
import DateTimeInput from './dateTimeInput';
import { Grid } from "@mui/material";
import StockTable from "./stockTable";
import StockChart from "./stockChart";
import './App.css';

type StockRow = {
  dttm: string;
  price: string;
  volume: string;
};
function App() {
  const [fromDttm, setFromDttm] = useState<string>('');
  const [toDttm, setToDttm] = useState<string>('');
  const [stockData, setStockData] = useState<StockRow[]>([]);
  const [stock, setStock] = useState<string>('IBM');
  const [stockName, setStockName] = useState<string>('International Business Machines Corp');

  useEffect(() => {
    const d = new Date();
    setToDttm((d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2)) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2));
    d.setMonth(d.getMonth() - 1);
    setFromDttm((d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2)) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2));
  }, []);

  useEffect(() => {
    //alert('loading???')
    loadStock(stock, fromDttm, toDttm);
  }, [stock, fromDttm, toDttm]);

  async function loadStock(stock: string, from: string, to: string) {
    const apiKey = process.env.REACT_APP_API_KEY;
    let arr = [];
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&outputsize=full&apikey=${apiKey}`
    );
    const body = await response.json();
    const json = body["Time Series (5min)"];
    console.log(`stock ${stock}`)
    console.log(body)
    for (let key in json) {
      if (json.hasOwnProperty(key)) {
        if (key >= from && key <= to) {
          let obj = json[key];
          arr[arr.length] = { dttm: key, price: obj["4. close"], volume: obj["5. volume"] }  
        }
      }
    }
    setStockData(arr);
  }

  return (
    <div className='App'>
      <AppHeader />
      <br />
      <Grid container>
        <Grid item xs={4}>
          <div className="controlCell">
            <Auto
              stock={stock}
              update={setStock}
              updateName={setStockName}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="controlCell">
            {fromDttm && <DateTimeInput
              initValue={fromDttm}
              update={setFromDttm}
              label={'From Date/Time'}
            />}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="controlCell">
            {toDttm && <DateTimeInput
              initValue={toDttm}
              update={setToDttm}
              label={'To Date/Time'}
            />}
          </div>
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={12}>
          <div className="stockTitle">
              {stockName}
          </div>
        </Grid>
      </Grid>
      <br />
      {stockName &&
      <Grid container>
        <Grid item xs={6}>
          <StockTable data={stockData} />
        </Grid>
        <Grid item xs={6}>
          <StockChart data={stockData} name={stockName} />
        </Grid>
      </Grid>}
    </div>
  );
}

export default App;
