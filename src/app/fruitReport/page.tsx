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
      <h2>Welcome to Fruits Report</h2>
      <FruitReportForm />
    </div>
  );
};