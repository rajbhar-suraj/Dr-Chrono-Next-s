"use client";
import { JSX, useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import { ViewPatients } from "./components/ViewPatients";
import { CreatePatientForm } from "./components/CreatePatient";
import { Sidebar } from "@/components/Sidebar";
import { PatientRecords } from "./components/PatientRecord";

export default function Page() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState("list");

  // fetch all patients
  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await axios("/api/patients");
        setPatients(res.data.data);
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
    { name: "View Patients", key: "list" },
    { name: "Create Patient", key: "create" },
    { name: "Patient Records", key: "records" },
  ];

  // Mapping key → component
  const actionComponents: Record<string, JSX.Element> = {
    list: <ViewPatients patients={patients} setPatients={setPatients} />,
    create: <CreatePatientForm patients={patients} setPatients={setPatients} />,
    records: <PatientRecords />,
  };

  if (loading) return <Loader />;

  return (
    <div className="flex gap-6 p-6">
      <Sidebar actions={actions} onSelect={setSelectedAction} />
      <div className="flex-1 bg-gray-100 rounded-2xl h-[calc(100vh-64px)]">
        {actionComponents[selectedAction]}
      </div>
    </div>
  );
}
