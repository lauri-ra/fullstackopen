import axios from 'axios';
import React from 'react';

import { useParams } from 'react-router-dom';

import { useStateValue } from "../state";
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';

const PatientPage = () => {
    const [, dispatch] = useStateValue();
    const { id } = useParams() as { id: string };

    const [patient, setPatient] = React.useState<Patient>();

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = 
                    await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

                dispatch({ type: 'SET_PATIENT', payload: patientFromApi});
                setPatient(patientFromApi);
            }   
            catch(error) {
                console.log(error);
            }
        };

        void fetchPatient();
    }, [dispatch]);
    
    return ( 
        <div> {patient &&  
            <div>   
                <h2>{patient.name}</h2>
                <div>ssh: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
            </div>
        }</div>
    );
};

export default PatientPage;