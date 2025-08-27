import { memo } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartPropsT<T> = {
  barData: T[];
  barDataKey: string;
  lineData: T[];
  lineDataKey: string;
  displayLine: boolean;
  onHover: (e: T | undefined) => void;
  xAxisDomain: [number, number];
  xAxisTickCount: number;
  yAxisLabel: string;
  barColor: string;
  lineColor: string;
  xAxisKey: string;
};
const Chart = <T,>({
  barData,
  barDataKey,
  lineData,
  lineDataKey,
  displayLine,
  onHover,
  xAxisDomain,
  xAxisTickCount,
  yAxisLabel,
  xAxisKey,
}: ChartPropsT<T>) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={barData}
        margin={{
          top: 20,
          right: 0,
          bottom: 20,
          left: 0,
        }}
        onMouseLeave={() => {
          onHover(undefined);
        }}
        {...{ overflow: "visible" }}
      >
        <XAxis
          dataKey={xAxisKey}
          type="number"
          domain={xAxisDomain}
          tickCount={xAxisTickCount}
        />
        <Tooltip wrapperStyle={{ display: "none" }} />
        <YAxis
          label={{ value: yAxisLabel, angle: 0, position: "top", offset: 24 }}
        ></YAxis>
        <Bar
          dataKey={barDataKey}
          barSize={10}
          id="bar"
          fill="#2194f3"
          onMouseEnter={(e) => {
            onHover(e.payload);
          }}
        />
        {displayLine && lineData && (
          <Line
            type="monotone"
            data={lineData}
            id="line"
            dataKey={lineDataKey}
            stroke="#105d9c"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default memo(Chart) as <T>(
  props: ChartPropsT<T>
) => React.ReactElement<ChartPropsT<T>>;
