import { UserPen, X } from "lucide-react";

interface PatientModalProps {
    isOpen: boolean;
    details: any;
    editing: boolean;

    updateData: any;
    updatingData: { name: string; placeholder: string }[];

    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startEditing: () => void;

    setEditing: (value: boolean) => void;
    setUpdateData: (value: any) => void;

    handleUpdate: (patient_id: string) => void;

    onClose: () => void;
}

export const PatientModal: React.FC<PatientModalProps> = ({ isOpen, onClose, details, editing, setEditing, startEditing, changeHandler, handleUpdate, updatingData, updateData, setUpdateData }) => {
    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-center">
            <div className="relative max-w-4xl w-full mx-4 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-6 overflow-y-auto max-h-[90vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 rounded-full transition"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Patient Details — {details.first_name} {details.last_name}
                </h2>

                {/* Personal Info */}
                <section className="space-y-2">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                        <button
                            className="text-sm text-gray-600"
                            onClick={startEditing}
                        >
                            <UserPen />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                        {editing ? (
                            <div className="flex items-center gap-2">
                                {updatingData.map((det) => (
                                    <input
                                        key={det.name}
                                        className="border px-2 py-1 rounded-md w-40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        name={det.name}
                                        placeholder={det.placeholder}
                                        value={updateData[det.name] ?? details[det.name] ?? ""}
                                        onChange={changeHandler}
                                        type="text"
                                    />
                                ))}
                                <button
                                    onClick={() => handleUpdate(details.id)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setEditing(false);
                                        setUpdateData({});
                                    }}
                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                                <span className="font-medium">First name: {details.first_name}</span>
                                <span className="font-medium">Last name: {details.last_name}</span>
                                <span className="font-medium">DOB: {details.dob}</span>
                                <span className="font-medium">Sex/Gender: {details.sex} / {details.gender}</span>
                            </div>


                        )}
                    </div>
                </section>

                {/* Contact Info */}
                <section className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <p><span className="font-medium">Email:</span> {details.email1 || "N/A"}</p>
                        <p><span className="font-medium">Phone Home:</span> {details.phone_home || "N/A"}</p>
                        <p><span className="font-medium">Phone Mobile:</span> {details.phone_mobile || "N/A"}</p>
                        <p><span className="font-medium">Phone Work:</span> {details.phone_work || "N/A"}</p>
                        <p><span className="font-medium">Phone Other:</span> {details.phone_other || "N/A"}</p>
                    </div>
                </section>

                {/* Address */}
                <section className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700">Address</h3>
                    <div className="text-sm text-gray-700">
                        <p>{details.address1}, {details.address2}</p>
                        <p>{details.city}, {details.state}, {details.zip}</p>
                        <p>{details.country}</p>
                    </div>
                </section>

                {/* Insurance */}
                <section className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700">Insurance</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <p><span className="font-medium">Plan:</span> {details.insurance_plan}</p>
                        <p><span className="font-medium">Group:</span> {details.insurance_group}</p>
                        <p><span className="font-medium">Insurance ID:</span> {details.insurance_id}</p>
                        <p><span className="font-medium">Notes:</span> {details.insurance_notes || "N/A"}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PatientModal;
