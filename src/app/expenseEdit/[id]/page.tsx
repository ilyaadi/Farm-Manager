import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import ExpenseEditForm from "@/components/ExpenseEditForm";

const ExpenseEdit = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  const expenseId = params.id;  // Get the expense ID from the URL

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="Page-Title">
      <h2>Edit Expense</h2>
      <ExpenseEditForm expenseId={expenseId} />
    </div>
  );
};

export default ExpenseEdit;