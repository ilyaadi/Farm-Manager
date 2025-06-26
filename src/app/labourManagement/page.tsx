import { getSession } from "@/actions";
import LabourManagementForm from "@/components/LabourManagementForm";

const LabourManagement = async () => {
    const session = await getSession();

    return (
        <div className="Page-Title">
            <h2>Enter your Labour Records</h2>
            <LabourManagementForm />
        </div>
    );
};

export default LabourManagement;
