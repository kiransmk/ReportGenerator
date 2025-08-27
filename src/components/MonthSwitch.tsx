import { useState } from "react";
import Switch from "@mui/material/Switch";

type MonthSwitchT = {
  initValue: boolean;
  onChange: (val: boolean) => void;
};

const MonthSwitch = ({ initValue, onChange }: MonthSwitchT) => {
  const [checked, setChecked] = useState(initValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  };
  return <Switch checked={checked} onChange={handleChange} />;
};

export default MonthSwitch;
