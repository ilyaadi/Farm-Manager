import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import FruitReportForm from "@/components/FruitReportForm";

const FruitReport = async () => {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="Page-Title">
      <h2 className="fruit-report-title">Produce Report</h2>
      <FruitReportForm />
    </div>
  );
};

export default FruitReport;