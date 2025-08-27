import { createContext, useContext, useState, useMemo } from "react";
import useGetData from "../hooks/useGetData";
import { DataPointT } from "../types";
import {
  getMonthYearString,
  getNextMonth,
  getPrevMonth,
} from "../utils/timeHelpers";

type MonthDataContextType = {
  dataTimeStamp: number,
  currentMonth: number,
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>,

  onCurrentMonthChange: (month: number, year: number) => void,
  currentYear: number,
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>,

  currentMonthData: DataPointT[],
  setCurrentMonthData: React.Dispatch<React.SetStateAction<DataPointT[]>>;

  prevMonthData: DataPointT[];
  setPrevMonthData: React.Dispatch<React.SetStateAction<DataPointT[]>>;

  hasNextMonthData: boolean;
  setHasNextMonthData: React.Dispatch<React.SetStateAction<boolean>>;

  currentMonthYear: string;
  setCurrentMonthYear: React.Dispatch<React.SetStateAction<string>>;

  prevMonthYear: string;
  setPrevMonthYear: React.Dispatch<React.SetStateAction<string>>;

  overrideCalendar: boolean;
  setOverrideCalendar: React.Dispatch<React.SetStateAction<boolean>>;

  displayDate: number;
  setDisplayDate: React.Dispatch<React.SetStateAction<number>>;

  overrideString: string;
  setOverrideString: React.Dispatch<React.SetStateAction<string>>;
};

export const MonthDataContext = createContext<MonthDataContextType>(
  {} as MonthDataContextType
);

export function useMonthDataContext() {
  const context = useContext(MonthDataContext);
  if (!context) {
    throw new Error("useMonthData must be used within a MonthDataProvider");
  }
  return context;
}

export function MonthDataProvider({ children }: { children: React.ReactNode }) {
  const initYear = new Date().getFullYear();
  const initMonth = new Date().getMonth() + 1;
  const [dataTimeStamp, data] = useMemo(() => useGetData(), []);

  const [currentMonth, setCurrentMonth] = useState<number>(initMonth);
  const [currentYear, setCurrentYear] = useState<number>(initYear);
  const [currentMonthData, setCurrentMonthData] = useState<DataPointT[]>([]);
  const [prevMonthData, setPrevMonthData] = useState<DataPointT[]>([]);
  const [hasNextMonthData, setHasNextMonthData] = useState<boolean>(false);
  const [currentMonthYear, setCurrentMonthYear] = useState<string>("");
  const [prevMonthYear, setPrevMonthYear] = useState<string>("");
  const [overrideCalendar, setOverrideCalendar] = useState<boolean>(false);
  const [displayDate, setDisplayDate] = useState<number>(0);
  const [overrideString, setOverrideString] = useState<string>("");

  const onCurrentMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);

    setCurrentMonthYear(getMonthYearString(month, year));
    setCurrentMonthData(data[year][month]);

    const [prevMonth, prevYear] = getPrevMonth(month, year);
    setPrevMonthYear(getMonthYearString(prevMonth, prevYear));
    const pData = data[prevYear][prevMonth];
    setPrevMonthData(pData);

    const [nexMonth, nextYear] = getNextMonth(month, year);
    setHasNextMonthData(Boolean(data[nextYear][nexMonth]));
  };

  const state: MonthDataContextType = {
    dataTimeStamp,
    currentMonth,
    setCurrentMonth,
    onCurrentMonthChange,
    currentYear,
    setCurrentYear,
    currentMonthData,
    setCurrentMonthData,
    prevMonthData,
    setPrevMonthData,
    hasNextMonthData,
    setHasNextMonthData,
    currentMonthYear,
    setCurrentMonthYear,
    prevMonthYear,
    setPrevMonthYear,
    overrideCalendar,
    setOverrideCalendar,
    displayDate,
    setDisplayDate,
    overrideString,
    setOverrideString,
  };

  return (
    <MonthDataContext.Provider value={state}>
      {children}
    </MonthDataContext.Provider>
  );
}
