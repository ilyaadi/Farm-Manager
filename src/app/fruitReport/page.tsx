import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import FruitReportForm from "@/components/FruitReportForm";

const FruitReport = async () => {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="reports-center">
      <div className="reports-container">
        <h2 className="fruit-report-title">Produce Report</h2>
        <FruitReportForm />
      </div>
    </div>
  );
};

export default FruitReport;