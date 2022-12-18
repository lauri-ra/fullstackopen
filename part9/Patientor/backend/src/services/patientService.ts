import patients from '../../data/patients.json';
import { Patient, NonSensitivePatientData } from '../types';

const getPatientData = (): Patient[] => {
    return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patients.map( ({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

export default { getPatientData, getNonSensitivePatientData };