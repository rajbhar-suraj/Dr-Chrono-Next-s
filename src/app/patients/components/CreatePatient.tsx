import axios from "axios";
import { useState } from "react";


const patientDetails = [
  { name: "first_name", placeholder: "John" },
  { name: "last_name", placeholder: "Doe" },
  { name: "dob", placeholder: "1999-07-30" },
  { name: "sex", placeholder: "Male/Female" },

]

interface Props {
  patients: any[];
  setPatients: React.Dispatch<React.SetStateAction<any[]>>;
}

export function CreatePatientForm({ patients, setPatients }: Props) {
  const [form, setForm] = useState<any>({});

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/patients", form);
    setPatients([...patients, res.data]); // add new patient to list
    setForm({});
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New Patient</h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {patientDetails.map((create: any) => (
          <input
            key={create.name}
            name={create.name}
            placeholder={create.placeholder}
            onChange={changeHandler}
            value={form[create.name] || ""}  // ✅ use form, not patients
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition"
          />
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-sm transition"
        >
          Save
        </button>
      </form>
    </div>

  );
}

