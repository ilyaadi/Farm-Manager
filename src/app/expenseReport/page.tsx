import {getSession} from "@/actions";
import ExpenseReportForm from "@/components/ExpenseReportForm";

const ExpenseReport = async () => {
  const session = await getSession()
  return (
      <div className="Page-Title">
        <h2>Welcome to Expense Report</h2>
        <ExpenseReportForm/>
      </div>
  )
};


export default ExpenseReport;
