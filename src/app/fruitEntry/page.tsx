import { getSession } from "@/actions";
import FruitEntryForm from "@/components/FruitEntryForm";

const FruitEntry = async () => {
  const session = await getSession();

  return (
    <div className="Page-Title">
      <h2>Enter Your Fruit </h2>
      <FruitEntryForm />
    </div>
  );
};

export default FruitEntry;