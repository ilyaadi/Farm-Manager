import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import LabourEditForm from "@/components/LabourEditForm";

const LabourEdit = async ({ params }: { params: { id: string } }) => {
    const session = await getSession();
    const labourId = params.id; // Get the labour ID from the URL

    if (!session?.isLoggedIn) {
        redirect("/login");
    }

    return (
        <div className="Page-Title">
            <h2>Edit Labour Record</h2>
            <LabourEditForm labourId={labourId} />
        </div>
    );
};

export default LabourEdit;