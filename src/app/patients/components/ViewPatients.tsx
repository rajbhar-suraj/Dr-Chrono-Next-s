import axios from "axios";
import PatientCard from "./PatientCard";

import { useState } from "react";
import PatientModal from "./PatientModal";

const updatingData = [
  { name: "first_name", placeholder: "Enter the first name" },
  { name: "last_name", placeholder: "Enter the last name" },
  { name: "dob", placeholder: "yyyy-mm-dd" },
  { name: "sex", placeholder: "Gender" },
];

interface Props {
  patients: any[];
  setPatients: React.Dispatch<React.SetStateAction<any[]>>;
}

export function ViewPatients({ patients, setPatients }: Props) {
  const [viewDetails, setViewDetails] = useState(false);
  const [details, setDetails] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const [updateData, setUpdateData] = useState<any>({});

  const startEditing = () => {
    setUpdateData(details);
    setEditing(true);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (patient_id: string) => {
    const res = await axios.patch("/api/patients", {
      patient_id,
      ...updateData,
    });
    setPatients((prev) =>
      prev.map((p) => (p.id === patient_id ? res.data : p))
    );
    setDetails(res.data);
    setEditing(false);
    setUpdateData({});
  };

  const handleDelete = async (patient_id: string) => {
    await axios.delete("/api/patients", { data: { patient_id } });
    setPatients((prev) => prev.filter((p) => p.id !== patient_id));
  };

  return (
   <div className="flex gap-6 p-6">
  
  <div className="flex-1 bg-gray-100 rounded-2xl h-[calc(100vh-64px)] overflow-y-auto">
    <div className="p-7">
      <h2 className="text-gray-700 text-xl pb-1">Patients</h2>
      
      {!viewDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((pat) => (
            <PatientCard
              key={pat.id}
              patient={pat}
              onView={(data) => {
                setViewDetails(true);
                setDetails(data);
              }}
              onDelete={handleDelete}
              setEditing={setEditing}
            />
          ))}
        </div>
      )}

      {viewDetails && (
        <PatientModal
          updatingData={updatingData}
          isOpen={viewDetails}
          details={details}
          editing={editing}
          updateData={updateData}
          changeHandler={changeHandler}
          startEditing={startEditing}
          setEditing={setEditing}
          setUpdateData={setUpdateData}
          handleUpdate={handleUpdate}
          onClose={() => {
            setViewDetails(false);
            setEditing(false);
          }}
        />
      )}
    </div>
  </div>
</div>

  );
}
