import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import FruitEditForm from "@/components/FruitEditForm";

const FruitEdit = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  const fruitId = params.id;  // Get the fruit ID from the URL

  if (!session?.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div className="Page-Title">
      <h2>Edit Fruit</h2>
      <FruitEditForm fruitId={fruitId} />
    </div>
  );
};

export default FruitEdit;