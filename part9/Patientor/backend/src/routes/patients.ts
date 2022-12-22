import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
    response.send(patientService.getPublicPatientData());
});

router.get('/:id', (request, response) => {
    const patient = patientService.getPatientById(request.params.id);

    if(patient) {
        response.send(patient);
    }
    else {
        response.send().status(400);
    }
});

router.post('/', (request, response) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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