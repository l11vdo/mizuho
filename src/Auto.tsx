import React, {useState, useEffect, useRef} from "react";
import { debounce } from "lodash";
import "./App.css";
import { TextField } from "@mui/material";

type Stock = {
  symbol: string;
  name: string;
};
interface AutoProps {
  stock: string
  update: (stock: string) => void
  updateName: (name: string) => void
}
export default function Auto(props: AutoProps) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stockCode, setStockCode] = useState<string>(props.stock);

  async function search(criteria: string) {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!criteria || criteria.length === 0) {
      setStockCode('');
      return [];
    }
    setStockCode(criteria);
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${criteria}&apikey=${apiKey}`
    );
    const body = await response.json();
    return body.bestMatches.map((result: any) => {
      return { symbol: result['1. symbol'], name: result['2. name'] }
    });
  }

  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      setStocks(await search(criteria));
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
    props.updateName('');
  }

  function getStockCode(symbol: string, name: string)
  {
    setStockCode(symbol);
    setStocks([]);
    props.update(symbol);
    props.updateName(name);
  }
  return (
    <div>
      <TextField
        type="search"
        value={stockCode}
        label="Stock code"
        placeholder="IBM"
        onChange={handleChange}
      />
      {stocks.length>0 &&
      <div className="symbolList">
        <ul style={{textAlign: "left"}}>
          {stocks.map((stock: Stock, index: number) => (
            <li onClick={()=>getStockCode(stock.symbol, stock.name)} key={stock.symbol+index} style={{cursor: "pointer", color: "#fff"}}>{stock.symbol}</li>
          ))}
        </ul>
      </div>}
    </div>
  );
}
