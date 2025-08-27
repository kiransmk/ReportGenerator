import { memo } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { timeSince } from "../../utils/timeHelpers";
import { useMonthDataContext } from "../../contexts/MonthDataContext";

const EnergyProducedTitle = () => {
  const { dataTimeStamp } = useMonthDataContext();
  return (
    <div className="py-4 pl-6 flex flex-row">
      <div className="h-[44px] w-[44px] flex border-2 border-blue-500 rounded-full justify-center items-center text-blue-500">
        <WbSunnyIcon />
      </div>
      <div className="ml-4">
        <div className="font-bold text-lg">Energy Produced</div>
        <div className="font-light">{`Updated ${timeSince(
          dataTimeStamp
        )} ago`}</div>
      </div>
    </div>
  );
};

export default memo(EnergyProducedTitle);
