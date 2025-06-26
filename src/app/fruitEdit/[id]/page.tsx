import { getSession } from "@/actions";
import FruitEditForm from "@/components/FruitEditForm";

const FruitEdit = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  const fruitId = params.id;  // Get the expense ID from the URL

  if (!session?.isLoggedIn) {
    return <p>Please log in to edit fruit.</p>;
  }

  return (
    <div className="Page-Title">
      <h2>Edit Fruit</h2>
      <FruitEditForm fruitId={fruitId} />
    </div>
  );
};

export default FruitEdit;
