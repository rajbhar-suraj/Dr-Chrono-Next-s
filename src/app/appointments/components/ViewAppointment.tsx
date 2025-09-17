import React, { useState } from "react";

interface Props {
  appointments: any[];
  setAppointments: React.Dispatch<React.SetStateAction<any[]>>;
}

export function ViewAppointment({ appointments }: Props) {
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ✅ Filter appointments by date and status
  const filteredAppointments = appointments.filter((appt) => {
    const matchesDate = filterDate
      ? appt.start_date_time.startsWith(filterDate)
      : true;
    const matchesStatus = filterStatus
      ? appt.appointment_status
          .toLowerCase()
          .includes(filterStatus.toLowerCase())
      : true;
    return matchesDate && matchesStatus;
  });

  // ✅ Pagination calculations (based on filtered list)
  const totalAppointments = filteredAppointments.length;
  const totalPages = Math.ceil(totalAppointments / pageSize);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6">
        Appointments ({totalAppointments})
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-3xl">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
            setCurrentPage(1); // reset page
          }}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1); // reset page
          }}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      {/* Appointment List */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedAppointments.length > 0 ? (
          paginatedAppointments.map((appt: any) => (
            <div
              key={appt.id}
              className="p-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{appt.title}</h3>
              <p className="text-sm text-gray-600">
                Status: {appt.appointment_status}
              </p>
              <p className="text-sm text-gray-600">
                Type: {appt.appointment_type}
              </p>
              <p className="text-sm text-gray-600">
                Start: {new Date(appt.start_date_time).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                End: {new Date(appt.end_date_time).toLocaleString()}
              </p>
              {appt.patient_details && (
                <p className="text-sm text-gray-600">
                  Patient: {appt.patient_details.first_name}{" "}
                  {appt.patient_details.last_name}
                </p>
              )}
              {appt.associated_providers?.length > 0 && (
                <p className="text-sm text-gray-600">
                  Provider:{" "}
                  {appt.associated_providers.map((p: any) => p.name).join(", ")}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No appointments found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages >= 1 && (
        <div className="flex gap-3 mt-6 items-center">
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
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewAppointment;
