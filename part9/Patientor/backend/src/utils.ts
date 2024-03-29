import { newPatient, Gender } from "./types";

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

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown) => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    
    return gender;
};
 
const parseString = (variable: unknown): string => {
    if(!variable || !isString(variable)) {
        throw new Error('Incorrect parameter');
    }
    else return variable;
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
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: []
    };

    return newEntry;
};

export default toNewPatientEntry;