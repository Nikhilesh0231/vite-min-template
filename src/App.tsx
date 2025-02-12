import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import DataTable from "./components/Table/DataTable";
import BarChart from "./components/Chart/BarChart";
import './App.css';
import Button from "./components/ToggleButton/Button";
import { useState } from 'react';


export default function App() {
    const [toggle,setToggle]=useState(false);
    const changlehandler = () => {
      setToggle(!toggle);
    }
    console.log(toggle);
  return <MantineProvider theme={theme}>

    <div className={(toggle)?"app":"app1"}>
        <div className='heading-main'>
          <h1 className='heading'>Crops Data</h1>
          <Button changehandler={changlehandler} toggle={toggle} setToggle={setToggle}/>
        </div>
    <DataTable/>
    <BarChart/>
    </div>
  </MantineProvider>;
}
