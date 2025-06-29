import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import FruitEntryForm from "@/components/FruitEntryForm";

const FruitEntry = async () => {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="Page-Title">
      <h2>Enter Your Fruit </h2>
      <FruitEntryForm />
    </div>
  );
};