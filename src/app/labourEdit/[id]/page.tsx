import { getSession } from "@/actions";
import LabourEditForm from "@/components/LabourEditForm";

const LabourEdit = async ({ params }: { params: { id: string } }) => {
    const session = await getSession();
    const labourId = params.id; // Get the labour ID from the URL

    if (!session?.isLoggedIn) {
        return <p>Please log in to edit labour entries.</p>;
    }

    return (
        <div className="Page-Title">
            <h2>Edit Labour Record</h2>
            <LabourEditForm labourId={labourId} />
        </div>
    );
};

export default LabourEdit;
