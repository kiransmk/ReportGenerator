import { MonthDataProvider } from "../../contexts/MonthDataContext";
import Layout from "../../layout";
import MonthEnergyProduced from "./MonthEnergyProduced";

const MonthView = () => (
  <Layout>
    <MonthDataProvider>
      <MonthEnergyProduced />
    </MonthDataProvider>
  </Layout>
);

export default MonthView;
