import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient as PatientType } from "../../types";
import patientService from '../../services/patients';
import Patient from "./Patient";
import PatientEntries from "./PatientEntries";

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

  if (!patient) return <div>Loading...</div>;
  console.log(patient);

  return (
    <div>
      <Patient patient={patient} />
      <PatientEntries entries={patient.entries} />
    </div>
  );
};

export default PatientPage;