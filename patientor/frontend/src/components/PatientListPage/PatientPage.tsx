import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Entry, Patient as PatientType } from "../../types";

import patientService from '../../services/patients';
import Patient from "./Patient";
import PatientEntries from "./PatientEntries";
import NewEntryForm from "./NewEntryForm";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<PatientType>();
  
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const data = await patientService.getOne(id);
      setPatient(data);
    };

    fetchData();
  }, [id]);

  const handleAddedEntry = (entry: Entry): void => {
    setPatient(prev => prev && { ...prev, entries: prev.entries.concat(entry) });
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <Patient patient={patient} />
      <NewEntryForm patientId={patient.id} onAdded={handleAddedEntry} />
      <PatientEntries entries={patient.entries} />
    </div>
  );
};

export default PatientPage;