import { useEffect } from "react";
import { Divider } from "@mui/material";
import { useMonthDataContext } from "../../contexts/MonthDataContext";
import EnergyProducedChart from "./EnergyProducedChart";
import EnergyProducedTitle from "./EnergyProducedTitle";

import CalendarNav from "./CalendarNav";
import CompareTotal from "./CompareTotal";

const initYear = new Date().getFullYear();
const initMonth = new Date().getMonth() + 1;

const MonthEnergyProduced = () => {
  const { onCurrentMonthChange } = useMonthDataContext();

  useEffect(() => {
    onCurrentMonthChange(initMonth, initYear);
  }, []);

  return (
    <>
      <CalendarNav className="sticky top-[68px] z-10" />
      <div className="container flex flex-col mx-auto">
        <EnergyProducedTitle />
        <CompareTotal />
        <Divider />
        <EnergyProducedChart />
      </div>
    </>
  );
};

export default MonthEnergyProduced;
