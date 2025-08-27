import { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { useMonthDataContext } from "../../contexts/MonthDataContext";
import { CircleIconButton } from "../../components/ui/IconButtons";
import ComposedChart from "../../components/ui/ComposedChart";
import MonthSwitch from "../../components/MonthSwitch";
import { DataPointT } from "../../types";
import { getDateMonthYearString } from "../../utils/timeHelpers";

export default function MonthEnergyChart() {
  const {
    currentMonth,
    currentYear,
    currentMonthData,
    prevMonthData,
    currentMonthYear,
    prevMonthYear,
    setOverrideCalendar,
    setDisplayDate,
    setOverrideString,
  } = useMonthDataContext();

  const [displayCurrentMonth, setDisplayCurrentMonth] = useState(true);
  const [displayPrevMonth, setDisplayPrevMonth] = useState(false);

  const handleCurrentSwitchChange = (checked: boolean) => {
    setDisplayCurrentMonth(checked);
  };

  const handlePrevSwitchChange = (checked: boolean) => {
    setDisplayPrevMonth(checked);
  };

  const handleHoverOverChart = (e: DataPointT | undefined) => {
    // TODO: update compareTotal
    setOverrideCalendar(Boolean(e));
    if (e) {
      setDisplayDate(e.d);
      setOverrideString(getDateMonthYearString(e.d, currentMonth, currentYear));
    }
  };

  return (
    <div className="relative flex flex-col justify-center w-full mt-4 pt-6 pr-6 h-[500px]">
      {/* TODO: Full window Implementation - popup modal that fits full window size*/}
      <CircleIconButton>
        <OpenInFullIcon />
      </CircleIconButton>
      <ComposedChart
        barData={currentMonthData.map(({ val, d }) => ({
          val: displayCurrentMonth ? val : 0,
          d: d,
        }))}
        barDataKey="val"
        lineData={prevMonthData}
        lineDataKey="val"
        displayLine={displayPrevMonth}
        onHover={handleHoverOverChart}
        xAxisDomain={[0, 31]}
        xAxisTickCount={30}
        yAxisLabel="kWh"
        barColor="#2194f3"
        lineColor="#105d9c"
        xAxisKey="d"
      />
      <div className="flex flex-row w-full justify-around items-center">
        <div>
          <MonthSwitch
            initValue={displayCurrentMonth}
            onChange={handleCurrentSwitchChange}
          />
          <div>{currentMonthYear}</div>
        </div>
        <div>
          <MonthSwitch
            initValue={displayPrevMonth}
            onChange={handlePrevSwitchChange}
          />
          <div>{prevMonthYear}</div>
        </div>
      </div>
    </div>
  );
}
