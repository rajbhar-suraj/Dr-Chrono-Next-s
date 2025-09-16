import { Trash, UserPen } from "lucide-react";
import React from "react";


interface PatientCardProps {
  patient: any; // you can type this better later
  onView: (patient: any) => void;
  onDelete: (id: string) => void;
  setEditing: (value: boolean) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, setEditing, onView, onDelete }) => {
  return (
    <div
      onClick={() => onView(patient)}
      className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-200 border border-gray-200 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {patient.first_name} {patient.last_name}
        </h3>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
          ID: {patient.id}
        </span>
      </div>

      {/* Info */}
      <p className="text-sm text-gray-600">
        <span className="font-medium">DOB:</span> {patient.dob || "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Sex:</span> {patient.sex || "-"}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Status:</span>{" "}
        {patient.patient_status_description || "Active"}
      </p>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        {/* Edit Icon */}
        <UserPen
          size={22}
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
            onView(patient)
          }}
          className="cursor-pointer text-gray-600 hover:text-blue-600 transition"
        />

        {/* Delete Icon */}
        <Trash
          size={22}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(patient.id);
          }}
          className="cursor-pointer text-gray-600 hover:text-red-600 transition"
        />
      </div>

    </div>
  );
};

export default PatientCard;
