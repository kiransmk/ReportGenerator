import { DataPointT } from "../types";

const inKWh = 1;
const inMWh = inKWh * 1000;
const inGWh = inMWh * 1000;
const inTWh = inGWh * 1000;

export function getTotalWUnits(data: DataPointT[]) {
  const kWhValue = data.reduce((acc, { val }) => acc + val, 0);
  return withUnits(kWhValue);
}

export function withUnits(kWhValue: number) {
  if (kWhValue >= inTWh) {
    const teraWh = kWhValue / inTWh;
    return [teraWh.toFixed(1), "TWh"];
  } else if (kWhValue >= inGWh) {
    const gigaWh = kWhValue / inGWh;
    return [gigaWh.toFixed(1), "GWh"];
  } else if (kWhValue >= inMWh) {
    const megaWh = kWhValue / inMWh;
    return [megaWh.toFixed(1), "MWh"];
  } else {
    return [kWhValue.toFixed(1), "kWh"];
  }
}
