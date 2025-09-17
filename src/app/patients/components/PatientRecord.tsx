import axios from "axios";
import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  patients: any[];
  setPatients: React.Dispatch<React.SetStateAction<any[]>>;
}

export function PatientRecords({ patients, setPatients }: Props) {
  const [search, setSearch] = useState("");
  const [viewDetails, setViewDetails] = useState(false);
  const [details, setDetails] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 9; // 3 columns x 3 rows per page

  // Filtering patients
  const filteredPatients = patients.filter((pat: any) => {
    const term = search.toLowerCase();
    return (
      pat.first_name?.toLowerCase().includes(term) ||
      pat.last_name?.toLowerCase().includes(term) ||
      pat.dob?.toLowerCase().includes(term) ||
      pat.sex?.toLowerCase().includes(term) ||
      pat.id?.toString().includes(term)
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPatients.length / pageSize);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1 bg-gray-100 rounded-2xl h-[calc(100vh-64px)] overflow-y-auto">
        {!viewDetails && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Patient Records</h2>
            <input
              type="text"
              placeholder="Search by name, DOB, gender, or ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset page on search
              }}
              className="w-full max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Patient Grid */}
        <div className="max-w-6xl w-full p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!viewDetails && paginatedPatients.length > 0 ? (
              paginatedPatients.map((pat: any) => (
                <div
                  onClick={() => {
                    setViewDetails(true);
                    setDetails(pat);
                  }}
                  key={pat.id}
                  className="cursor-pointer p-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
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
              !viewDetails && (
                <p className="text-gray-500 col-span-full text-center">
                  No patients found.
                </p>
              )
            )}
          </div>

          {/* Pagination Controls */}
          {!viewDetails && totalPages > 1 && (
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {viewDetails && details && (
          <div className="flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full mx-4 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-6 overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => {
                  setViewDetails(false);
                  setDetails({});
                }}
                className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 rounded-full transition"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                Patient Details — {details.first_name} {details.last_name}
              </h2>
              {/* ... rest of modal content remains unchanged ... */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientRecords;
