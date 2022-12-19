import patients from '../../data/patients.json';
import { Patient, newPatient, NonSensitivePatientData } from '../types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (entry: newPatient): Patient => {
    const id = uuid();

    const newPatientEntry = {
        id: id,
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatientData,
    getNonSensitivePatientData,
    addPatient
};