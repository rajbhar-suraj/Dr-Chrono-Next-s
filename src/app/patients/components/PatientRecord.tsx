import axios from "axios";
import { useState } from "react";
import PatientModal from "./PatientModal";
import { X } from "lucide-react";

interface Props {
  patients: any[];
  setPatients: React.Dispatch<React.SetStateAction<any[]>>;
}

export function PatientRecords({ patients, setPatients }: Props) {
  const [search, setSearch] = useState("");
  const [viewDetails, setViewDetails] = useState(false);
  const [details, setDetails] = useState<any>({});

  // Filtering patients based on search term
  const filteredPatients = patients.filter((pat: any) => {
    const term = search.toLowerCase();
    return (
      pat.first_name?.toLowerCase().includes(term) ||
      pat.last_name?.toLowerCase().includes(term) ||
      pat.dob?.toLowerCase().includes(term) ||
      pat.sex?.toLowerCase().includes(term) ||
      pat.id?.toString().includes(term) // in case you search by id
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Patient Records</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, DOB, gender, or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Patient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!viewDetails && filteredPatients.length > 0 ? (
          filteredPatients.map((pat: any) => (
            <div
              onClick={() => { setViewDetails(true); setDetails(pat) }}
              key={pat.id}
              className="p-4 bg-white rounded-xl shadow border border-gray-200"
            >
              <h3 className="font-semibold text-lg">
                {pat.first_name} {pat.last_name}
              </h3>
              <p className="text-sm text-gray-600">DOB: {pat.dob}</p>
              <p className="text-sm text-gray-600">Sex: {pat.sex}</p>
              <p className="text-sm text-gray-600">ID: {pat.id}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No patients found.</p>
        )}

        {viewDetails && details && (
          <div className="flex items-center justify-center mb-4">
            <div className="relative max-w-4xl w-full mx-4 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-6 overflow-y-auto max-h-[90vh]">

              {/* Close Button */}
              <button
                onClick={()=>{setViewDetails(false); setDetails({})}}
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
                <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                  <span className="font-medium">First name: {details.first_name}</span>
                  <span className="font-medium">Last name: {details.last_name}</span>
                  <span className="font-medium">DOB: {details.dob}</span>
                  <span className="font-medium">Sex/Gender: {details.sex} / {details.gender}</span>
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
                  <p>{details.address?.address1}, {details.address?.address2}</p>
                  <p>{details.address?.city}, {details.address?.state}, {details.address?.zip}</p>
                  <p>{details.address?.country}</p>
                </div>
              </section>

              {/* Insurance */}
              <section className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Insurance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                  <p><span className="font-medium">Plan:</span> {details.insurance?.insurance_plan}</p>
                  <p><span className="font-medium">Group:</span> {details.insurance?.insurance_group}</p>
                  <p><span className="font-medium">Insurance ID:</span> {details.insurance?.insurance_id}</p>
                  <p><span className="font-medium">Notes:</span> {details.insurance?.insurance_notes || "N/A"}</p>
                </div>
              </section>

            </div>
          </div>
        )}


      </div>
    </div>
  );
}
