import { newPatient } from "./types";

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown
};

const isString = (text: unknown): text is string  => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (variable: unknown): string => {
    if(!variable || !isString(variable)) {
        throw new Error('Incorrect parameter');
    }
    else return variable;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    else return date;
};

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): newPatient => {
    const newEntry: newPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseString(gender),
        occupation: parseString(occupation)
    };

    return newEntry;
};

export default toNewPatientEntry;