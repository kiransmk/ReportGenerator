import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { IconButton } from "../../components/ui/IconButtons";
import Container from "../../components/ui/Container";
import { useMonthDataContext } from "../../contexts/MonthDataContext";
import { getNextMonth, getPrevMonth } from "../../utils/timeHelpers";

type CalendarNavPropsT = {
  className: string;
};

export default function CalendarNav({ className }: CalendarNavPropsT) {
  const {
    currentMonth,
    onCurrentMonthChange,
    currentYear,
    prevMonthData,
    hasNextMonthData,
    currentMonthYear,
    overrideCalendar,
    overrideString,
  } = useMonthDataContext();

  const handlePreviousClick = () => {
    const [month, year] = getPrevMonth(currentMonth, currentYear);
    onCurrentMonthChange(month, year);
  };

  const handleNextClick = () => {
    const [month, year] = getNextMonth(currentMonth, currentYear);
    onCurrentMonthChange(month, year);
  };

  return (
    <div className={`w-full bg-gray-200 p-4 ${className}`}>
      <Container>
        {overrideCalendar ? (
          <span>{overrideString}</span>
        ) : (
          <div className="flex justify-between items-center">
            <IconButton onClick={handlePreviousClick} disabled={!prevMonthData}>
              <ArrowBackIosIcon />
            </IconButton>
            <div className="flex align-center gap-2 items-center">
              <CalendarMonthIcon />
              <span>{currentMonthYear}</span>
            </div>
            <IconButton onClick={handleNextClick} disabled={!hasNextMonthData}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        )}
      </Container>
    </div>
  );
}
