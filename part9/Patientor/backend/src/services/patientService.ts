import patients from '../../data/patients';
import { Patient, newPatient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatientData = (): Patient[] => {
    return patients;
};

const getPublicPatientData = (): PublicPatient[] => {
    return patients.map( ({id, name, occupation, gender, dateOfBirth}) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth,
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    const foundPatient = patients.find(patient => patient.id === id);

    if(foundPatient) {
        return foundPatient;
    }
    else return undefined;
};

const addPatient = (entry: newPatient): Patient => {
    const id = uuid();

    const newPatientEntry = {
        id: id,
        ...entry,
        entries: []
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatientData,
    getPublicPatientData,
    getPatientById,
    addPatient
};