import axios from "axios";
import { useState } from "react";

interface Props {
  appointments: any[];
  setAppointments: React.Dispatch<React.SetStateAction<any[]>>;
}

const appointmentDetails = [
  { name: "start_date_time", label: "Start Date & Time", placeholder: "", type: "datetime-local" },
  { name: "end_date_time", label: "End Date & Time", placeholder: "", type: "datetime-local" },
  { name: "pt_id", label: "Patient ID", placeholder: "1", type: "number" },
  { name: "provider_ids", label: "Provider IDs", placeholder: "1,2", type: "text" },
  { name: "appointment_type", label: "Appointment Type", placeholder: "Preventative Care", type: "text" },
  { name: "title", label: "Title", placeholder: "Follow-up Meeting", type: "text" },
  { name: "appointment_note", label: "Notes", placeholder: "Notes about the appointment", type: "text" },
  { name: "status", label: "Status", placeholder: "scheduled / confirmed / cancelled", type: "text" },
  { name: "telemedicine", label: "Telemedicine", placeholder: "true / false", type: "text" },
];

export function CreateAppointmentForm({ appointments, setAppointments }: Props) {
  const [form, setForm] = useState<any>({});
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "provider_ids") {
      setForm((prev: any) => ({
        ...prev,
        [name]: value.split(",").map((id) => parseInt(id.trim(), 10)),
      }));
    } else if (name === "telemedicine") {
      setForm((prev: any) => ({ ...prev, [name]: value === "true" }));
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/appointments", form);
      setAppointments([...appointments, res.data]);
      setForm({});
    } catch (err) {
      console.error("Error creating appointment:", err);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create New Appointment
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 overflow-y-auto max-h-[75vh] pr-2">
        {appointmentDetails.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">{field.label}</label>
            {field.name === "telemedicine" ? (
              <select
                name="telemedicine"
                onChange={changeHandler}
                value={form.telemedicine ? "true" : "false"}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>

            ) : (
              <input
                name={field.name}
                placeholder={field.placeholder}
                onChange={changeHandler}
                value={form[field.name] || ""}
                type={field.type}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition"
              />
            )}

          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-sm transition"
        >
          Save Appointment
        </button>
      </form>
    </div>
  );
}

export default CreateAppointmentForm;
