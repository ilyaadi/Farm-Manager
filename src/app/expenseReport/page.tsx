import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import ExpenseReportForm from "@/components/ExpenseReportForm";

const ExpenseReport = async () => {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="Page-Title">
      <h2 className="expense-report-title">Expense Report</h2>
      <ExpenseReportForm />
    </div>
  );
};

export default ExpenseReport;