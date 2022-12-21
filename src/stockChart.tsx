import "./App.css";
import { Grid, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type StockRow = {
  dttm: string;
  price: string;
  volume: string;
};

interface StockProps {
  data: StockRow[]
  name: string
}

export default function StockChart(props: StockProps) {
  let ds = props.data.map(row => ({dt: row.dttm.substring(0,10), vol: row.volume}));
  const dataset = Array.from(ds.reduce(
    (m, {dt, vol}) => m.set(dt, (m.get(dt) || 0) + Number(vol)), new Map()), ([dt, vol]) => ({dt, vol})
  );
  let labels:string[] = [];
  dataset.forEach((row)=>labels.push(row.dt));
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: props.name,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Volumes',
        data: dataset.map((row)=>row.vol),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }
  return (
    <div className="tableHeader">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="controlCell">
              <Typography >Volumes by date</Typography>
            </div>
          </Grid>
        </Grid> 
      <div className="scroll">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}