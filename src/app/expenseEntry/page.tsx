import { getSession } from "@/actions";
import ExpenseEntryForm from "@/components/ExpenseEntryForm";

const ExpenseEntry = async () => {
  const session = await getSession();

  return (
    <div className="Page-Title">
      <h2>Enter Your Expenses </h2>
      <ExpenseEntryForm />
    </div>
  );
};

export default ExpenseEntry;
