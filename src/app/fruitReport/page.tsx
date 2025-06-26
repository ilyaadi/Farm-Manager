import {getSession} from "@/actions";
import FruitReportForm from "@/components/FruitReportForm";

const FruitReport = async () => {
  const session = await getSession()
  return (
      <div className="Page-Title">
        <h2>Welcome to Fruits Report</h2>
        <FruitReportForm/>
      </div>
  )
};


export default FruitReport;
