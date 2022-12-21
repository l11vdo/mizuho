import React, {useState, useEffect} from "react";
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface DateProps {
  initValue: string;
  update: (dateVal: string) => void;
  label: string;
}

export default function DateTimeInput(props: DateProps) {
  dayjs.extend(customParseFormat);
  const [value, setValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    const dt = new Date(props.initValue);
    let s = dt.toISOString();
    setValue(dayjs(s));
  }, [props.initValue]);

  function handleChange(value: React.SetStateAction<dayjs.Dayjs | null>) {
    if (value) {
      setValue(value);
      let d = new Date(value?.toString());
      let datestring = (d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2)) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
      props.update(datestring);  
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={props.label}
        value={value}
        inputFormat='YYYY-MM-DD HH:mm:ss'
        onChange={(newValue)=>handleChange(newValue)}
      />
    </LocalizationProvider>
  );
}