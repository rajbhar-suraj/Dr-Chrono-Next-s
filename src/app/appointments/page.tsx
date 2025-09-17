"use client";
import { JSX, useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import { Sidebar } from "@/components/Sidebar";
import ViewAppointment from "./components/ViewAppointment";
import { CreateAppointmentForm } from "./components/CreateAppointment";

export default function Page() {
  const [appointments, setAppointments] = useState<any>([])
  const [availability, setAvailability] = useState<any>([])

  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState("list");

  // fetch all patients
  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await axios.get("api/appointments")
        console.log(res.data.data)
        setAppointments(res.data.data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  // Sidebar buttons list
  const actions = [
    { name: "View Appointments", key: "list" },
    { name: "Create Appointment", key: "create" },

  ];

  // Mapping key → component
  const actionComponents: Record<string, JSX.Element> = {
    list: <ViewAppointment appointments={appointments} setAppointments={setAppointments} />,
    create: <CreateAppointmentForm appointments={appointments} setAppointments={setAppointments} />,
    // records: <PatientRecords patients={patients} setPatients={setPatients} />,
  };

  if (loading) return <Loader />;
  return (
    <div className="flex gap-6 p-6">
      <Sidebar actions={actions} onSelect={setSelectedAction} />
      <div className="flex-1 bg-gray-100 rounded-2xl ">
        {actionComponents[selectedAction]}
      </div>
    </div>
  );
}
