import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import ExpenseEntryForm from "@/components/ExpenseEntryForm";

const ExpenseEntry = async () => {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="Page-Title">
      <h2>Enter Your Expenses </h2>
      <ExpenseEntryForm />
    </div>
  );
};

export default ExpenseEntry;