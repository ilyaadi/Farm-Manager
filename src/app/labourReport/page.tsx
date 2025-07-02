import { getSession } from "@/actions"; // or wherever your session util is
import { redirect } from "next/navigation";
import LabourReportForm from "@/components/LabourReportForm";

export default async function LabourReportPage() {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="Page-Title">
      <h2>Labour Report</h2>
      <LabourReportForm />
    </div>
  );
}   