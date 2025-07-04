import { getSession } from "@/actions"; // or wherever your session util is
import { redirect } from "next/navigation";
import LabourReportForm from "@/components/LabourReportForm";

const LabourReport = async () => {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="reports-center">
      <div className="reports-container">
        <h2 className="labour-report-title">Labour Report</h2>
        <LabourReportForm />
      </div>
    </div>
  );
};

export default LabourReport;