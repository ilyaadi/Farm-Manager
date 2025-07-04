import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import ExpenseReportForm from "@/components/ExpenseReportForm";

const ExpenseReport = async () => {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="reports-center">
      <div className="reports-container">
        <h2 className="expense-report-title">Expense Report</h2>
        <ExpenseReportForm />
      </div>
    </div>
  );
};

export default ExpenseReport;