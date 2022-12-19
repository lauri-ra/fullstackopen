import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
    response.send(patientService.getNonSensitivePatientData());
});

router.post('/', (request, response) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newPatientEntry = toNewPatientEntry(request.body);

        const addedPatient = patientService.addPatient(newPatientEntry);
        response.json(addedPatient);
    }
    catch(error) {
        if(error instanceof Error) {
            response.status(400).send(error.message);
        }
    }
});

export default router;