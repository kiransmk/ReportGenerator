import { getTotalWUnits, withUnits } from "../utils/unitHelpers";
import { DataPointT } from "../types";

type TotalWithUnitPropsT = {
  className?: string;
  monthData: DataPointT[];
  monthYear?: string;
  displayDateValue?: boolean;
  displayDate?: number;
};

export default function TotalWithUnit({
  className,
  monthData,
  monthYear,
  displayDateValue,
  displayDate,
}: TotalWithUnitPropsT) {
  let measuredValue = null;
  let unit;

  if (displayDateValue && displayDate) {
    const dateValue = monthData.find((data) => data.d === displayDate);
    if (dateValue) {
      [measuredValue, unit] = withUnits(dateValue.val);
    }
  } else {
    [measuredValue, unit] = getTotalWUnits(monthData);
  }

  return (
    <div
      className={`flex flex-col w-1/2 justify-center px-10 my-4 ${className}`}
    >
      {!!measuredValue && (
        <>
          <div className="flex text-blue-500 items-center">
            <span className="font-bold">{measuredValue}</span>
            <span className="font-light text-sm">&nbsp;{unit}</span>
          </div>
          <div>{monthYear}</div>
        </>
      )}
    </div>
  );
}
